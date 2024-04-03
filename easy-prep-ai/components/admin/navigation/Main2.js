import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';


// Screens 
import UserActivation from './UserActivation';
import SearchUsers from './SearchUsers';
import ReportPage from './ReportPage'



const USER_ACTIVIATION = 'UserActiviation'; 
const SEARCH_USERS = 'SearchUsers';
const REPORT_PAGE = 'ReportPage'; 


const Tab = createBottomTabNavigator(); 


export default function Main() {
    return (
            <Tab.Navigator 
                screenOptions={{
                }}
            >
                <Tab.Screen name={USER_ACTIVIATION} component={UserActivation} 
                        options={{
                        tabBarLabel:"Activation", 
                        tabBarIcon: ({color}) => <Ionicons name ="pencil" size={24} color={color} />
                }}/> 
                <Tab.Screen name={SEARCH_USERS} component={SearchUsers}
                        options ={{
                        tabBarLabel:"Search", 
                        tabBarIcon: ({color}) => <Icon name ="user" size={24} color={color} /> 
                }} /> 
                <Tab.Screen name={REPORT_PAGE} component={ReportPage}
                        options ={{
                        tabBarLabel:"Pager", 
                        tabBarIcon: ({color}) => <Icon name ="pagelines" size={24} color={color} /> 
                }} 
            />
            </Tab.Navigator>
    );
}