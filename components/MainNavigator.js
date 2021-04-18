import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Search from './Search';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return ( <NavigationContainer >
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" options={{
              title: "התחברות"
          }} component={Login} />
          <Stack.Screen name="Search" options={{
              title: "חיפוש"
          }} component={Search} />
        </Stack.Navigator>
      </NavigationContainer> );
}
 
export default MainNavigator;