import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { db } from '../../../firebase';
import { doc, getDocs, collection, updateDoc} from 'firebase/firestore';

const UserActivation = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const usersData = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        usersData.push({ id: docSnapshot.id, ...data });
      });
      setUsers(usersData);
      setDisplayedUsers(usersData); // Initially display all users
      console.log(usersData); 
    };
    getUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.Username?.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("Filterd users", filteredUsers); // Update displayed users based on search
    setDisplayedUsers(filteredUsers);
  };

  const handleInputChange = (text) => {
    setSearchText(text);
  };

  const handleActivate = async (userId) => {
    if (userId) {
      try {
        await updateDoc(doc(db, 'Users', userId), { ActiveStatus: true });
        setUsers(users.map((user) => (user.id === userId ? { ...user, ActiveStatus: true } : user)));
      } catch (error) {
        console.error('Error activating user:', error);
      }
    }
  };

  const handleDeactivate = async (userId) => {
    if (userId) {
      try {
        await updateDoc(doc(db, 'Users', userId), { ActiveStatus: false });
        setUsers(users.map((user) => (user.id === userId ? { ...user, ActiveStatus: false } : user)));
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search users"
        onChangeText={handleInputChange}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={displayedUsers}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.Username}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() => handleActivate(item.id)}
              >
                <Text style={styles.buttonText}>Activate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() => handleDeactivate(item.id)}
              >
                <Text style={styles.buttonText}>Deactivate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Add some space between the username and the buttons
  },
  roundedButton: {
    backgroundColor: '#53B175',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // For Android
    },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '80%',
    marginTop: 500,
    marginLeft:40, 
  },
  buttonsContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'center', // Center the buttons horizontally
    alignItems: 'center', // Center the buttons vertically
  },
}); 

export default UserActivation; 