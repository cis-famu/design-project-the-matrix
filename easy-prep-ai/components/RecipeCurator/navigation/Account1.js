import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase'; // Adjust this path to where your Firebase config and initialization are located

const SignOutScreen = () => {
    const navigation = useNavigation();
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigation.navigate('RecipeCuratorLogin'); // Adjust this to your login screen's name
      } catch (error) {
        Alert.alert("Error", "Could not sign out. Please try again.");
      }
    };
  
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default SignOutScreen;
  