import React, { useState } from 'react';
import { StyleSheet, Button,View} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PrepperPage from './components/Prepper/PrepperPage';
import AdminLogin from './components/admin/AdminLogin';
import RecipeCuratorPage from './components/RecipeCurator/RecipeCuratorPage.js';
import PrepperLoginPage from './components/Prepper/PrepperLoginPage';
import PrepperSignIn from  './components/Prepper/PrepperSignIn'; 
import LikedRecipes from './components/Prepper/navigation/LikedRecipes.js'; 
import SearchRecipes from './components/Prepper/navigation/SearchRecipes.js'; 
import Filter from './components/Prepper/navigation/Filter.js'
import GenerateARecipe from './components/Prepper/navigation/GenerateARecipe.js';
import UserChat from './components/Prepper/navigation/UserChat.js';
import Main from './components/Prepper/navigation/Main.js';
import Announcements from './components/RecipeCurator/navigation/Announcements.js';
import SearchRecipes1 from './components/RecipeCurator/navigation/SearchRecipes1.js';
import Main1 from './components/RecipeCurator/navigation/Main1.js';
import RecipeCuratorLogin from './components/RecipeCurator/RecipeCuratorLogin.js';
import RecipeCuratorSignup from './components/RecipeCurator/RecipeCuratorSignup.js';




const RootStack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="PrepperPage" component={PrepperPage} options={{ headerShown: false }} />
          <RootStack.Screen name="PrepperLoginPage" component={PrepperLoginPage} options={{ headerShown: false }}/>
          <RootStack.Screen name="PrepperSignIn" component={PrepperSignIn} options={{ headerShown: false }}/>
          <RootStack.Screen name="AdminLogin" component={AdminLogin} />
          <RootStack.Screen name="RecipeCuratorPage" component={RecipeCuratorPage} />
          <RootStack.Screen name ="SearchRecipes" component={SearchRecipes} /> 
          <RootStack.Screen name ="LikedRecipes" component={LikedRecipes} /> 
          <RootStack.Screen name ="GenerateARecipe" component={GenerateARecipe} /> 
          <RootStack.Screen name ="UserChat" component={UserChat} /> 
          <RootStack.Screen name ="Filter" component={Filter} /> 
          <RootStack.Screen name="SearchRecipes1" component={SearchRecipes1}/> 
          <RootStack.Screen name="Main1" component={Main1}/> 
          <RootStack.Screen name="RecipeCuratorLogin" component={RecipeCuratorLogin} /> 
          <RootStack.Screen name="RecipeCuratorSignup" component={RecipeCuratorSignup}/>
          <RootStack.Screen name ="Main" component={Main} options={{ headerShown: false }}/> 
        </RootStack.Navigator>
    </NavigationContainer>
  );
}


function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Go to Prepper Login"
        onPress={() => navigation.navigate('PrepperPage')}
      />
      <Button
        title="Go to Admin Login"
        onPress={() => navigation.navigate('AdminLogin')}
      />
      <Button
        title="Go to Recipe Curator Login"
        onPress={() => navigation.navigate('RecipeCuratorPage')}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 200,
  }
});
