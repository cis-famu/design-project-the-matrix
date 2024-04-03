import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { db } from '../../../firebase';
import { getDocs, collection,query,where } from 'firebase/firestore';
import { auth } from '../../../firebase'; 

const FavoritesAndSignOut = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Ensure the user is signed in
        const user = auth.currentUser;
        if (!user) {
          console.log("No user signed in");
          return;
        }

        // Query for documents where `userId` matches the signed-in user's ID
        const q = query(collection(db, 'UserFavorite'), where("userId", "==", user.uid));
        
        const querySnapshot = await getDocs(q);
        const recipesData = querySnapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setFavorites(recipesData);
      } catch (error) {
        console.error("Failed to fetch favorite recipes:", error);
        Alert.alert("Error", "Failed to load favorites. Please try again.");
      }
    };

    fetchFavorites();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('PrepperLoginPage'); // Adjust this to your login screen's name
    } catch (error) {
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.recipeText}>{item.Title}</Text>
          </View>
        )}
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'flex-start',
  },
  recipeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default FavoritesAndSignOut;
