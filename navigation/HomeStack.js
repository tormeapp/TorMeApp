import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import AddBusiness from "../screens/AddBusiness";
import EditBusiness from "../screens/EditBusiness";
import MakeAppointment from "../screens/MakeAppointment";
import Business from "../screens/Business";
import MyAppointments from "../screens/MyAppointments";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="AddBusiness"
        options={{ title: "Register Business" }}
        component={AddBusiness}
      />
      <Stack.Screen name="EditBusiness" component={EditBusiness} />
      <Stack.Screen
        name="MakeAppointment"
        component={MakeAppointment}
        options={({ route }) => ({ title: route.params.date })}
      />
      <Stack.Screen name="Business" component={Business} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
    </Stack.Navigator>
  );
};

export default HomeStack;
