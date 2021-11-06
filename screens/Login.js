import React, { useState, useContext, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useOrientation } from "../hooks/useOrientation";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../navigation/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

function Login({ navigation }) {
  const { login, googleAuth, facebookAuth } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const orientation = useOrientation();

  console.log(orientation);

  return (
    <View>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <KeyboardAvoidingView behavior="padding">
          <StatusBar style="auto" />
          <View style={styles.container}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>TORME</Text>
              <Text style={{ fontSize: 13, opacity: 0.7 }}>
                Appointment Scheduling app for small independent businesses.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                type="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Text>{emailError}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                type="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <Text>{passwordError}</Text>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => login(email, password)}
            >
              <Text style={{ fontSize: 18, padding: 10 }}>Login</Text>
              <AntDesign name="login" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={{ fontSize: 18, padding: 10 }}>Signup</Text>
            </TouchableOpacity>
            <Text>Or</Text>
            <View style={styles.extraLogin}>
              <TouchableOpacity onPress={() => googleAuth()}>
                <FontAwesome
                  style={{ padding: 10 }}
                  name="google"
                  size={50}
                  color="#DB4437"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => facebookAuth()}>
                <MaterialIcons
                  style={{ padding: 10 }}
                  name="facebook"
                  size={50}
                  color="#4267B2"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "70%",
    height: 50,
    marginBottom: 15,
    opacity: 0.5,
  },
  input: {
    height: 50,
    padding: 15,
  },
  logo: {
    marginBottom: 70,
    marginTop: 20,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#05445E",
    textAlign: "center",
    marginBottom: 10,
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "#5CD85A",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    flexDirection: "row",
  },
  signUpBtn: {
    width: "40%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  extraLogin: {
    flexDirection: "row",
  },
});

export default Login;
