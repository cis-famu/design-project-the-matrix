import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { db } from '../../../firebase';
import { getDocs, collection } from 'firebase/firestore';

const SearchUsers = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

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
            {/* You can add more details here, like item.Description */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Light peach background for warmth
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
    borderColor: '#DADADA', // Soft border color
    borderWidth: 1,
    borderRadius: 25, // Rounded corners for the search bar
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF', // White background for the search bar
    fontSize: 16, // Slightly larger font for readability
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#53B175', // Vibrant button color for contrast
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Slight elevation for the button
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16, // Ensuring the button text is bold and readable
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'column', // Changed to column for better layout of additional info
    alignItems: 'flex-start', // Align items to the start
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // More pronounced shadow for a subtle 3D effect
    marginTop: 10,
  },
  recipeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Darker color for text for better readability
    marginBottom: 5, // Spacing between title and potential description
  },
});


export default SearchUsers;
