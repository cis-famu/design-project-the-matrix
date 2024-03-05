// UserList.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const userSnapshot = await firestore().collection('Users').get();
      const fetchedUsers = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    const userSnapshot = await firestore().collection('Users').where('Username', '==', searchQuery).get();
    const filteredUsers = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(filteredUsers);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by username"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>Email: {item.Email}</Text>
            <Text>Role: {item.Role}</Text>
            <Text>Username: {item.Username}</Text>
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
  userContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default UserList;
