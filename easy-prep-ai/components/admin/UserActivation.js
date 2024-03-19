import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@firebase/app';
import { useNavigation } from '@react-navigation/native';

const UserActivation = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await firestore.firestore().collection('users').get();
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({ id: doc.id, isActive: data.isActive, ...data });
      });
      setUsers(usersData);
    };
    getUsers();
  }, []);
  

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleActivate = async (userId) => {
    if(userId != null){
      await firestore.firestore().collection('users').doc(userId).update({
        isActive: true,
      });
      return true;
    }
    return false; 
  };
  
  const handleDeactivate = async (userId) => {
    if(userId != null){
      await firestore.firestore().collection('users').doc(userId).update({
        isActive: false,
      });
      return true;
    }
    return false; 
  };
  

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>{item.name}</Text>
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
  );

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search users"
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const RoundedButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roundedButton: {
    backgroundColor: '#53B175',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '40%',
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
}); 

export default UserActivation; 