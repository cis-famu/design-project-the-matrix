import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons';

// Screens 
import SearchRecipes from './SearchRecipes';
import GenerateARecipe from './GenerateARecipe'; 
import UserChat from './UserChat'; 



const SEARCH_RECIPES = 'Search'; 
const GENERATE_RECIPE = 'Generate'; 
const USER_CHAT = 'Chat';  

const Tab = createBottomTabNavigator(); 


export default function Main() {
    return (
            <Tab.Navigator
            initialRouteName={SEARCH_RECIPES}
            screenOptions={({route}) => ({
                TabBarIcon : ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn == SEARCH_RECIPES) {
                        iconName = focused ? 'Search' : 'search-outline' 
                    }else if(rn == GENERATE_RECIPE) {
                        iconName = focused ? GENERATE_RECIPE : 'generate-outline' 
                    }else if(rn == USER_CHAT) {
                        iconName = focused ? 'chat-outline' : 'search-outline' 
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

            </Tab.Navigator>
    );
}