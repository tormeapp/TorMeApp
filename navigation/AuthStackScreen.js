import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";

import React from "react";
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <AuthStack.Screen
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
