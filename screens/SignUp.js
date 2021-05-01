import React, { useContext, useState } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import fb from "../fb";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackgroundImg from "../components/Background/BackgroundImg";

const SignUp = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <View style={styles.container}>
      <BackgroundImg img={require("../assets/bgV2.jpg")} />
      <KeyboardAvoidingView behavior="padding">
        <StatusBar style="auto" />
        <View style={styles.inputContainer}>
          <View style={styles.emailContainer}>
            <Input
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
            />
          </View>
          <Text>{emailError}</Text>
          <View style={styles.passwordContainer}>
            <Input
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <Text>{passwordError}</Text>
          <TouchableOpacity
            onPress={() => register(email, password)}
            style={styles.signUpButton}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.loginButton}
          >
            <Text>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    // backgroundColor: "#0081a7",
    // flexDirection: "column",
  },

  // Testing diff buttons working on diff levels
  loginButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#ff595e",
    padding: 10,
    borderRadius: 7,
    margin: 10,
  },
  signUpButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#4ac926",
    padding: 10,
    borderRadius: 7,
    margin: 10,
    marginTop: 30,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 120,
  },
  emailContainer: {
    width: 300,
    height: 70,
    backgroundColor: "white",
    opacity: 0.2,
    borderRadius: 7,
  },
  passwordContainer: {
    width: 300,
    height: 70,
    backgroundColor: "white",
    opacity: 0.2,
    borderRadius: 7,
  },
});

export default SignUp;
