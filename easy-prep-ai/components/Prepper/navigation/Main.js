import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons';

// Screens 
import SearchRecipes from './SearchRecipes';
import GenerateARecipe from './GenerateARecipe'; 
import UserChat from './UserChat'; 
import Home from './Home'; 



const SEARCH_RECIPES = 'Search';  // Home 
const GENERATE_RECIPE = 'Generate'; // Search 
const USER_CHAT = 'Chat';  // Generate 
const HOME = 'Home' // Chat 

const Tab = createBottomTabNavigator(); 


export default function Main() {
    return (
            <Tab.Navigator
            initialRouteName={HOME}
            screenOptions={({route}) => ({
                TabBarIcon : ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn == HOME) {
                        iconName = focused ? 'Home' : 'home-outline' 
                    }else if(rn == GENERATE_RECIPE) {
                        iconName = focused ? GENERATE_RECIPE : 'generate-outline' 
                    }else if(rn == SEARCH_RECIPES) {
                        iconName = focused ? 'search-outline' : 'search-outline' 
                    }else if(rn == USER_CHAT){
                        iconName = focused ? 'Chat' : 'chat-outline' 
                    }

                    return <Ionicon name={iconName} size={size} color={color}/>
                },
            })}
            style={{ padding: 10, height: 70 }}
            tabBarLabelStyle={{ paddingBottom: 10, fontSize: 10 }}
            >

                <Tab.Screen name={SEARCH_RECIPES} component={SearchRecipes}/> 
                <Tab.Screen name={GENERATE_RECIPE} component={GenerateARecipe}/> 
                <Tab.Screen name={USER_CHAT} component={UserChat}/> 
                <Tab.Screen name={HOME} component={Home}/> 

            </Tab.Navigator>
    );
}