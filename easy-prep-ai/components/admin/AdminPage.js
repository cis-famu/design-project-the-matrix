import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation} from '@react-navigation/native';

function Prepper() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.form}>
          <RoundedButton
            title="Login"
            onPress={() => navigation.navigate('AdminLogin')}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </View>
    </View>
  );
}

const RoundedButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <Prepper />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#53B175',
  },
  Image: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 350,
    height: 350,
    borderRadius: 50,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 200,
    marginRight: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    width: '80%',
    marginTop: 700,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  roundedButton: {
    backgroundColor: 'white',
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
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  forgotPasswordText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default App;
