import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {db,signInWithEmailAndPassword,auth} from '../../firebase'
import {doc,setDoc,getDoc} from 'firebase/firestore'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

    // Make sure to use signInWithEmailAndPassword for signing in
    const LoginInWithEmailAndPassword = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);


        if (userDoc.exists() && userDoc.data().ActiveStatus) {
          navigation.navigate('Main2');
      } else {
          alert("Your account is not active. Please contact support.");
      }
      } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Handle errors here, including incorrect email and password
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                alert('Incorrect email or password.');
            } else {
                // For other errors, you might want to handle them differently
                alert(errorMessage);
            }
    }
  }

const handleSignIn = () => {
  LoginInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Sign In with', user.email, user.password);
      navigation.navigate('Main2');
    })
    .catch(error => alert(error.message));
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={() => LoginInWithEmailAndPassword(email, password)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default App;