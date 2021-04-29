import React, { useState, useContext } from 'react';
import {StyleSheet, Button, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../navigation/AuthProvider';


function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Home Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Text>{emailError}</Text>
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Text>{passwordError}</Text>
      <Button
        title="Login"
        onPress={() => login(email, password)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>New User? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center' 
  }
});

export default Login;