import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import fb from '../fb';

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
      fb
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() =>{
          //   fb.database.
          navigation.navigate('Login')
          })
          .catch((err) => {
              switch (err.code) {
                  case "auth/invalid-email":
                      setEmailError('Enter a valid email');
                      break;
                  case "auth/email-already-in-use":
                      setEmailError('This email is already registered.\nEnter a different email');
                      break;
                  case "auth/weak-password":
                      setPasswordError('Password length should be at least 8 characters');
                      break;
              }
          });
    };


    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar style="auto" />
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <Text>{emailError}</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Text>{passwordError}</Text>
      <Button
        title="Sign Up"
        onPress={() => register(email, password)}
      />
      <Button
        title="Already have an account? Log In"
        onPress={() => navigation.goBack()}
      />
    </View>);
}

export default SignUp;