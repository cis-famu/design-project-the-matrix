import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

// Screens 
import SearchRecipes from './SearchRecipes';
import GenerateARecipe from './GenerateARecipe'; 
import UserChat from './UserChat'; 
import Home from './Home'; 
import Filter from './Filter'; 



const HOME = 'Home'; 
const GENERATE_RECIPE = 'Generate'; 
const USER_CHAT = 'Chat'; 
const SEARCH_RECIPES = 'Search'; 
const FILTER = 'Filter'; 

const Tab = createBottomTabNavigator(); 


export default function Main() {
    return (
            <Tab.Navigator 
                screenOptions={{
                }}
            >
                <Tab.Screen name={HOME} component={Home} 
                        options={{
                        tabBarLabel:"Home", 
                        tabBarIcon: ({color}) => <Icon name ="home" size={24} color={color} />
                }}/> 
                <Tab.Screen name={SEARCH_RECIPES} component={SearchRecipes}
                        options ={{
                        tabBarLabel:"Search", 
                        tabBarIcon: ({color}) => <Icon name ="search" size={24} color={color} /> 
                }}
                /> 
                <Tab.Screen name={GENERATE_RECIPE} component={GenerateARecipe} 
                        options ={{
                        tabBarLabel:"Generate", 
                        tabBarIcon: ({color}) => <Icon name ="square" size={24} color={color} /> 
                 }}/> 
                <Tab.Screen name={USER_CHAT} component={UserChat} 
                        options ={{
                        tabBarLabel:"Chat", 
                        tabBarIcon: ({color}) => <Ionicons name ="chatbubble" size={24} color={color} /> 
                }}/> 
                <Tab.Screen name={FILTER} component={Filter} 
                        options ={{
                        tabBarLabel:"Account", 
                        tabBarIcon: ({color}) => <Icon name ="user" size={24} color={color} /> 
                 }}/> 

            </Tab.Navigator>
    );
}