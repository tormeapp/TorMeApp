import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import BackgroundImg from "../components/Background/BackgroundImg";
import Avatar from '../components/Avatar/Avatar';

export default function Profile({ route, navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <BackgroundImg img={require("../assets/bgV2.jpg")} />
      <KeyboardAvoidingView behavior="padding">
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.avatarContainer}>
         <Avatar/>
        </TouchableOpacity>{" "}
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontFamily: "Verdana",
          }}
        >
          {user.email.slice(0, user.email.indexOf("@"))}'s Profile.
        </Text>
        <View style={styles.profileMenu}>
          <TouchableOpacity >
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  profileMenu: {
    alignItems: "center",
    padding: 15,
    margin: 15,
  },
});
