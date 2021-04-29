import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../navigation/AuthProvider";
import { KeyboardAvoidingView } from "react-native";
import { Input, Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/Logo.png")}
        style={{ width: 300, height: 100, marginBottom: 90 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          autoFocus
          type="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>{emailError}</Text>
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          type="Password"
          value={password}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <Text>{passwordError}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#0081a7",
  },

  // Testing diff buttons working on diff levels
  loginButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#8ac926",
    padding: 10,
    borderRadius: 7,
    margin: 10,
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
    marginBottom: 20,
    width: 350,
    height: 350,
    padding: 10,
    backgroundColor: "#fdfcdc",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Login;
