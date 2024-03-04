import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation} from '@react-navigation/native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Implement your login logic here (e.g., API call, validation)
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
  
      // Handle the response from the server
      console.log(response.data);
  
      // If the login is successful, navigate to the SearchRecipes screen
      if (response.data.success) {
        navigation.navigate('SearchRecipes');
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }

    console.log('Login attempted with email:', email, 'password:', password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/LogoEasy.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            width={300}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            width={300}
          />
          <RoundedButton title="Login"  onPress={() => navigation.navigate('Main')} />
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 230,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    paddingHorizontal:20, 
    justifyContent:'center', 
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  roundedButton: {
    backgroundColor: '#53B175',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
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
});

export default App;