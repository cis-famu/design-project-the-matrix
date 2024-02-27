import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Route,PrivateRoute } from 'react-native';
import AdminLogin from './components/admin/AdminLogin';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Route path ="/AdminLogin" element ={<AdminLogin />}></Route>
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
});
