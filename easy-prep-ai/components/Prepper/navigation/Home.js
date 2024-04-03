import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDoc, getDocs, collection, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { db,auth } from '../../../firebase';
import FloatingButton from './FloatingButton';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [postId, setPostId] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);

  const fetchPosts = async () => {
    try {
      const posts = [];
      const snapshot = await getDocs(collection(db, 'Recipe'));
      snapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data(), likes: doc.data().likes || 0, comments: doc.data().comments || [] });
      });
      return posts;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setData(posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const advertisements = [];
        const querySnapshot = await getDocs(collection(db, 'Advertisements'));
        querySnapshot.forEach(doc => {
          advertisements.push(doc.data());
        });
        setAdvertisements(advertisements);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };
    fetchAdvertisements();
  }, []);

  const handleLike = async (id) => {
    try {
      const postRef = doc(db, 'Recipe', id);
      await updateDoc(postRef, { likes: data.find(post => post.id === id).likes + 1 });
      const updatedPosts = data.map(post => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        } else {
          return post;
        }
      });
      setData(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    try {
      const postRef = doc(db, 'Recipe', postId);
      await updateDoc(postRef, { comments: arrayUnion(commentInput) });
      const updatedPosts = data.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, commentInput] };
        } else {
          return post;
        }
      });
      setData(updatedPosts);
      setCommentInput('');
      setShowCommentInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openCommentInput = (id) => {
    setPostId(id);
    setShowCommentInput(true);
  };

const addRecipeToFavorites = async (recipeId) => {
  setIsModalVisible(false); // Assuming this is part of a larger component

  try {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add favorites.');
      return;
    }

    const recipeToAdd = data.find(recipe => recipe.id === recipeId);
    if (recipeToAdd) {
      await addDoc(collection(db, 'UserFavorite'), {
        recipeId: recipeToAdd.id,
        Title: recipeToAdd.Title,
        // Additional recipe details here...
        userId: user.uid, // Use the current user's UID
      });

      Alert.alert('Success', 'Recipe added to favorites!');
    } else {
      console.error('Recipe not found');
      Alert.alert('Error', 'Failed to add recipe to favorites.');
    }
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    Alert.alert('Error', 'Failed to add recipe to favorites.');
  }
};
  

  return (
    <View style={styles.container}>
      <View style={styles.advertisementContainer}>
        <Text style={styles.advertisementText}>Advertisements: </Text>
        <FlatList
          horizontal
          data={advertisements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.advertisementItem}>
              <Text>{item.ingredientName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.Title}</Text>
              <Text>{item.Description}</Text>
              <Text>{item.Ingredients}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleLike(item.id)}>
                  <Icon name="heart" size={20} color="red" />
                  <Text>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openCommentInput(item.id)}>
                  <Icon name="comment" size={20} color="blue" />
                  <Text>{item.comments ? item.comments.length : 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => addRecipeToFavorites(item.id)}>
                  <Icon name="star" size={20} color="orange" />
                  <Text>Add to Favorites</Text>
                </TouchableOpacity>
              </View>
              {showCommentInput && postId === item.id && (
                <View style={styles.commentContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Add a comment"
                    value={commentInput}
                    onChangeText={text => setCommentInput(text)}
                  />
                  <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
                    <Text>Comment</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to add this recipe to favorites?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'green' }]} onPress={() => { handleFavorite(selectedRecipeId); setIsModalVisible(false); }}>
                <Text style={styles.buttonText}>Add to Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'grey' }]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating button component */}
      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#f0f0f0', // Lighter background
  },
  advertisementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff', // White background for contrast
    borderBottomWidth: 2,
    borderBottomColor: '#dedede', // Softer border color
  },
  advertisementText: {
    fontWeight: 'bold',
    color: '#333', // Darker text for better readability
  },
  advertisementItem: {
    backgroundColor: '#e9e9e9', // Soft grey for items
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 10, // Rounded corners
    elevation: 2, // Slight shadow for depth
  },
  item: {
    backgroundColor: '#ffffff', // White background for items
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10, // Rounded corners
    elevation: 3, // Shadow for depth
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Space between title and content
    color: '#333', // Darker text for titles
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7e7e7', // Soft background for buttons
    padding: 8,
    borderRadius: 20, // Fully rounded corners for buttons
    elevation: 2, // Slight shadow for buttons
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 45, // Larger touch area
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20, // Rounded corners for input fields
    paddingHorizontal: 15, // Inner spacing
    backgroundColor: '#fff', // White background for input
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#4e9af1', // Use a more vibrant color for actions
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20, // Rounded corners for a modern look
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for overlay
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 20, // Rounded corners for modal buttons
    padding: 10,
    elevation: 2,
    minWidth: '40%',
    alignItems: 'center',
    backgroundColor: '#4e9af1', // Consistent color for actionable modal buttons
  },
  buttonText: {
    color: 'white',
  },
});


export default App;