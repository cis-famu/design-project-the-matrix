import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const Advertisements = () => {
  const [ingredientName, setIngredientName] = useState('');
  const [advertisementDuration, setAdvertisementDuration] = useState('');
  const [advertisements, setAdvertisements] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedAdvertisements, setDisplayedAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const querySnapshot = await getDocs(collection(db, 'Advertisements'));
      const advertisementsData = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setAdvertisements(advertisementsData);
      setDisplayedAdvertisements(advertisementsData);
    };
    fetchAdvertisements();
  }, []);

  const handleAddAdvertisement = async () => {
    try {
      const newAdvertisementRef = await addDoc(collection(db, 'Advertisements'), {
        ingredientName,
        duration: advertisementDuration,
      });

      setAdvertisements([...advertisements, { id: newAdvertisementRef.id, ingredientName, duration: advertisementDuration }]);
      setDisplayedAdvertisements([...displayedAdvertisements, { id: newAdvertisementRef.id, ingredientName, duration: advertisementDuration }]);
      setIngredientName('');
      setAdvertisementDuration('');
    } catch (error) {
      console.error('Error adding advertisement:', error);
    }
  };

  const handleRemoveAdvertisement = async (advertisementId) => {
    try {
      await deleteDoc(doc(db, 'Advertisements', advertisementId));
      setAdvertisements(advertisements.filter(advertisement => advertisement.id !== advertisementId));
      setDisplayedAdvertisements(displayedAdvertisements.filter(advertisement => advertisement.id !== advertisementId));
    } catch (error) {
      console.error('Error removing advertisement:', error);
    }
  };

  const handleSearch = () => {
    const filteredAdvertisements = advertisements.filter(advertisement =>
      advertisement.ingredientName?.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedAdvertisements(filteredAdvertisements);
  };

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingredient Name"
          value={ingredientName}
          onChangeText={setIngredientName}
        />
        <TextInput
          style={styles.input}
          placeholder="Advertisement Duration"
          value={advertisementDuration}
          onChangeText={setAdvertisementDuration}
        />
        <Button title="Add Advertisement" onPress={handleAddAdvertisement} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Ingredients"
          onChangeText={handleInputChange}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedAdvertisements}
        renderItem={({ item }) => (
          <View style={styles.advertisementItem}>
            <Text>{item.ingredientName} - {item.duration} days</Text>
            <TouchableOpacity onPress={() => handleRemoveAdvertisement(item.id)}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
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
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  advertisementItem: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default Advertisements;
