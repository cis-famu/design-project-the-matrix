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
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Recipe'));
      const usersData = querySnapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setUsers(usersData);
      setDisplayedUsers(usersData);
    };
    getUsers();
  }, []);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.Title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedUsers(filteredUsers);
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
        data={displayedUsers}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>{item.Username}</Text>
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
    backgroundColor: 'white',
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#53B175',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#FFFFFF'
  },
});

export default SearchUsers;
