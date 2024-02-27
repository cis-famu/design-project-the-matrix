import React from 'react';
import { StyleSheet, Button,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PrepperLogin from './components/Prepper/PrepperLogin';
import AdminLogin from './components/admin/AdminLogin';
import RecipeCuratorLogin from './components/RecipeCurator/RecipeCuratorLogin';


const RootStack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="PrepperLogin" component={PrepperLogin} />
          <RootStack.Screen name="AdminLogin" component={AdminLogin} />
          <RootStack.Screen name="RecipeCuratorLogin" component={RecipeCuratorLogin} />
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
        onPress={() => navigation.navigate('PrepperLogin')}
      />
      <Button
        title="Go to Admin Login"
        onPress={() => navigation.navigate('AdminLogin')}
      />
      <Button
        title="Go to Recipe Curator Login"
        onPress={() => navigation.navigate('RecipeCuratorLogin')}
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
