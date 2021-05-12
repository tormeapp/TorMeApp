import React, { useContext, useState } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import BackgroundImg from "../components/Background/BackgroundImg";


const SignUp = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    if (firstName.length <= 1 || lastName.length <= 2){
      return alert('Please fill out your first and last name');
    }
    register(email, password, firstName, lastName);
    resetInputs();
  }

    const resetInputs = () => {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }


    return  (
      <View style={styles.container}>
        <BackgroundImg img={require("../assets/bgV2.jpg")} />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <StatusBar style="auto" />
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="Enter your name"
                onChangeText={(name) => setFirstName(name)}
              />
            </View>
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="Enter your last name"
                onChangeText={(last) => setLastName(last)}
              />
            </View>
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity
              onPress={() => registerUser()}
              style={styles.signUpButton}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
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
      padding: 20,
      height: 35,
      backgroundColor: "white",
      opacity: 0.2,
      borderRadius: 7,
    },
    passwordContainer: {
      width: 300,
      padding: 20,
      height: 35,
      backgroundColor: "white",
      opacity: 0.2,
      borderRadius: 7,
    },
  });

export default SignUp;
