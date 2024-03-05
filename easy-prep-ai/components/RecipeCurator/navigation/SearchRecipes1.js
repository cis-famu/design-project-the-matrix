import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TextInputProps, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      console.log("We got the data") 
      const response = await axios.get('http://localhost:8080/api/search', 
      {
        params: { query: searchQuery },
      });
  
      // Handle the response from the server
      console.log(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          underlineColorAndroid="transparent"
          placeholderTextColor="#9b9b9b"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchIcon}>Search</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 32, // Add padding at the top
    justifyContent: 'space-between', // Move the search bar down
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    width: 60,
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#3f51b5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SearchScreen;