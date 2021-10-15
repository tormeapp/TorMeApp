import React, { useContext, useState } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const SignUp = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    if (firstName.length <= 1 || lastName.length <= 2) {
      return alert("Please fill out your first and last name");
    }
    register(email, password, firstName, lastName);
    resetInputs();
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

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
                placeholder="Enter your name"
                placeholderTextColor="black"
                onChangeText={(name) => setFirstName(name)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="black"
                onChangeText={(last) => setLastName(last)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => registerUser()}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>Already have an account? Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

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
  signUpBtn: {
    width: "40%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SignUp;
