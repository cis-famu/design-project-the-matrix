import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe, onLikePress, onSharePress, onCommentPress }) => {
  const { image, title } = recipe;

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.cardActionButton} onPress={onLikePress}>
          <Text style={styles.cardActionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardActionButton} onPress={onSharePress}>
          <Text style={styles.cardActionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardActionButton} onPress={onCommentPress}>
          <Text style={styles.cardActionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardActionButton: {
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 3,
  },
  cardActionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const LikedRecipes = () => {
  const recipes = [
    {
      id: 1,
      image: 'https://your-image-url-1.jpg',
      title: 'Recipe 1',
    },
    {
      id: 2,
      image: 'https://your-image-url-2.jpg',
      title: 'Recipe 2',
    },
    // More recipes
  ];

  const handleLikePress = (recipeId) => {
    console.log(`Liked recipe with id: ${recipeId}`);
  };

  const handleSharePress = (recipeId) => {
    console.log(`Shared recipe with id: ${recipeId}`);
  };

  const handleCommentPress = (recipeId) => {
    console.log(`Navigated to comments for recipe with id: ${recipeId}`);
  };

  return (
    <View style={{ padding: 16 }}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onLikePress={() => handleLikePress(recipe.id)}
          onSharePress={() => handleSharePress(recipe.id)}
          onCommentPress={() => handleCommentPress(recipe.id)}
        />
      ))}
    </View>
  );
};

export default LikedRecipes;