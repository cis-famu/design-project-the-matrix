// SearchUsers.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import UserList from './UserList'; // Import the UserList component

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    // For simplicity, let's just log the search query
    console.log('Search query:', searchQuery);
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
      {/* Render the UserList component */}
      <UserList searchQuery={searchQuery} />
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
});

export default SearchUsers;
