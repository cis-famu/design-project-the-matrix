import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { db } from '../../../firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, 'Recipe'));
      const recipesData = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setRecipes(recipesData);
      setDisplayedRecipes(recipesData);
    };
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    const filteredRecipes = recipes.filter(recipe =>
      recipe.Title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedRecipes(filteredRecipes);
  };

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  const handleDeleteRecipe = async () => {
    try {
      await deleteDoc(doc(db, 'Recipe', selectedRecipeId));
      setDisplayedRecipes(displayedRecipes.filter(recipe => recipe.id !== selectedRecipeId));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const confirmDelete = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Recipes"
          onChangeText={handleInputChange}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedRecipes}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.recipeText}>{item.Title}</Text>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this recipe?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={handleDeleteRecipe}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'grey' }]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#53B175',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  recipeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center'
  }
});

export default DeleteRecipe;
