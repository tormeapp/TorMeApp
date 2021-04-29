import { createStackNavigator } from "@react-navigation/stack";
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';

import React from 'react';
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (  <AuthStack.Navigator>
        <AuthStack.Screen name="Login" options={{
          title: "התחברות"
        }} component={Login} />
        <AuthStack.Screen name="SignUp" options={{
          title: "הרשמה"
        }} component={SignUp} />
      </AuthStack.Navigator> );
}
 
export default AuthStackScreen;