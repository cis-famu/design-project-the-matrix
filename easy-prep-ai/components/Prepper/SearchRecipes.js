// RecipeList.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeSnapshot = await firestore().collection('Recipes').get();
      const fetchedRecipes = recipeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, []);

  const handleSearch = async () => {
    const recipeSnapshot = await firestore().collection('Recipes').where('Title', '==', searchQuery).get();
    const filteredRecipes = recipeSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipes(filteredRecipes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by recipe title"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <Text>Title: {item.Title}</Text>
            <Text>Description: {item.Description}</Text>
            <Text>Ingredients: {item.Ingredients}</Text>
            {/* Add more recipe details here */}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default RecipeList;
