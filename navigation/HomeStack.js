import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const HomeStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
     );
}
 
export default HomeStack;
