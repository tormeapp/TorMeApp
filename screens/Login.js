import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../navigation/AuthProvider";
import BackgroundImg from "../components/Background/BackgroundImg";

function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <BackgroundImg img={require("../assets/bgV2.jpg")} />
      <KeyboardAvoidingView behavior="padding">
        <StatusBar style="auto" />
        <View style={styles.inputContainer}>
          <View style={styles.emailContainer}>
            <TextInput
              placeholder="Email"
              type="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Text>{emailError}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              type="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Text>{passwordError}</Text>
          </View>
          <TouchableOpacity
            onPress={() => login(email, password)}
            style={styles.loginButton}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.signUpButton}
          >
            <Text>SignUp</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

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
    backgroundColor: "#4ac926",
    padding: 10,
    borderRadius: 7,
    margin: 10,
    marginTop: 30,
  },
  signUpButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#ff595e",
    padding: 10,
    borderRadius: 7,
    margin: 10,
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

export default Login;
