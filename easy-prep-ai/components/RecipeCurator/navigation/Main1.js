import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons';

// Screens 
import Announcements from './Announcements';
import SearchRecipes from './SearchRecipes1'; 



const SEARCH_RECIPES = 'Search'; 
const ANNOUNCEMENTS = 'Announcements'; 

const Tab = createBottomTabNavigator(); 


export default function Main1() {
    return (
            <Tab.Navigator
            initialRouteName={SEARCH_RECIPES}
            screenOptions={({route}) => ({
                TabBarIcon : ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn == SEARCH_RECIPES) {
                        iconName = focused ? 'Search' : 'search-outline' 
                    }else if(rn == ANNOUNCEMENTS) {
                        iconName = focused ? ANNOUNCEMENTS : 'announcemnts-outline' 
                    }

                    return <Ionicon name={iconName} size={size} color={color}/>
                },
            })}
            style={{ padding: 10, height: 70 }}
            tabBarLabelStyle={{ paddingBottom: 10, fontSize: 10 }}
            >

                <Tab.Screen name={SEARCH_RECIPES} component={SearchRecipes}/> 
                <Tab.Screen name={ANNOUNCEMENTS} component={Announcements} options={{ headerShown: false }}/> 
                

            </Tab.Navigator>
    );
}