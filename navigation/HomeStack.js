import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
//import { }
const Stack = createStackNavigator();

const HomeStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
     );
}
 
export default HomeStack;