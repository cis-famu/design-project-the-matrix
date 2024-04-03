import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';


// Screens 
import SearchRecipes1 from './SearchRecipes1';
import Home from './Announcements'; 
import DeleteRecipe from './DeleteRecipe';
import Advertisements from './Advertisements'; 
import Account1 from './Account1'; 



const HOME = 'Home'; 
const SEARCH_RECIPES1 = 'Search1'; 
const  DELETERECIPE = 'DeleteRecipe';
const ADVERTISEMENTS = 'Advertisements';
const ACCOUNT1 = 'Account1'; 

const Tab = createBottomTabNavigator(); 


export default function Main() {
    return (
            <Tab.Navigator 
                screenOptions={{
                }}
            >
                <Tab.Screen name={HOME} component={Home} 
                        options={{
                        tabBarLabel:"Announcments", 
                        tabBarIcon: ({color}) => <Ionicons name ="alert" size={24} color={color} />
                }}/> 
                <Tab.Screen name={SEARCH_RECIPES1} component={SearchRecipes1}
                        options ={{
                        tabBarLabel:"Search", 
                        tabBarIcon: ({color}) => <Icon name ="search" size={24} color={color} /> 
                }}/>
                <Tab.Screen name={DELETERECIPE} component={DeleteRecipe} 
                        options={{
                        tabBarLabel:"Delete", 
                        tabBarIcon: ({color}) => <Ionicons name ="trash" size={24} color={color} />
                }} /> 
                <Tab.Screen name={ADVERTISEMENTS} component={Advertisements} 
                        options={{
                        tabBarLabel:"ADS", 
                        tabBarIcon: ({color}) => <Ionicons name ="albums" size={24} color={color} />
                }} /> 

                <Tab.Screen name={ACCOUNT1} component={Account1} 
                        options={{
                        tabBarLabel:"Account", 
                        tabBarIcon: ({color}) => <Icon name ="user" size={24} color={color} />
                }}
            />
            </Tab.Navigator>
    );
}