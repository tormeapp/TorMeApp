import React, { useContext, useState } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import fb from "../fb";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUp = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const handleSignUp = (email, password) => {
    clearErrors();
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //   fb.database.
        navigation.navigate("Login");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            setEmailError("Enter a valid email");
            break;
          case "auth/email-already-in-use":
            setEmailError(
              "This email is already registered.\nEnter a different email"
            );
            break;
          case "auth/weak-password":
            setPasswordError("Password length should be at least 8 characters");
            break;
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          leftIcon={{ type: "font-awesome", name: "envelope" }}
        />
        <Text>{emailError}</Text>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          leftIcon={{ type: "font-awesome", name: "lock" }}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "lock" }}
        />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#0081a7",
  },
  signUpButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#8ac926",
    padding: 10,
    borderRadius: 7,
    margin: 10,
  },
  loginButton: {
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
    height: 400,
    padding: 10,
    backgroundColor: "#fdfcdc",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default SignUp;
