import React, { useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [inputText, setInputText] = useState('');

  // Get feed

  const addRecipe = () => {
    if (inputText.trim()) {
      const newRecipe = {
        id: Date.now().toString(),
        content: inputText,
        comments: [],
      };
      setRecipes([newRecipe, ...recipes]);
      setInputText('');
    }
  };

  // Placeholder for RecipeItem component
  const RecipeItem = ({ recipe }) => (
    <View style={styles.recipeItem}>
      <Text>{recipe.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#2FBBF0"}/>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.fab} onPress={addRecipe}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  recipeItem: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 1, // Basic shadow for Android
    shadowColor: '#000', // Basic shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#53B175',
    borderRadius: 28,
    elevation: 4, // Shadow for Android
    shadowColor: '#000000', // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default Feed;
