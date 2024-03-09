// UserList.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@firebase/app';

const UserList = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let userCollection = firestore().collection('Users');
      
      // Apply search query filter if available
      if (searchQuery) {
        userCollection = userCollection.where('Username', '==', searchQuery);
      }

      const userSnapshot = await userCollection.get();
      const fetchedUsers = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [searchQuery]); // Update useEffect dependency to include searchQuery

  return (
    <View style={styles.container}>
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
  userContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default UserList;
