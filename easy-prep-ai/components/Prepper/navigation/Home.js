import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Button } from 'react-native';

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [inputText, setInputText] = useState('');

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

  return (
    <View style={styles.container}>
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Post a new recipe..."
        style={styles.input}
      />
      <Button title="Post" onPress={addRecipe} />
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        keyExtractor={(item) => item.id}
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Feed;
