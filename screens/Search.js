import React, { useContext } from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DatePicker from '../components/DatePicker/DatePicker';
import { AuthContext } from '../navigation/AuthProvider';

function Search({ navigation }) { 
    const { user, logout } = useContext(AuthContext);
    return (
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.searchbar}>
        <Text style={styles.text}>HomePage, Welcome {user.email.slice(0, user.email.indexOf('@'))}</Text>
        <TextInput placeholder='Search for anything..'></TextInput>
        </View>
        <Button style={styles.logoutBtn} onPress={() => logout()} title='Logout'></Button>
        </View>
    );
  }

  export default Search;

  const styles = StyleSheet.create({
     container: {
      flex: 1,
      alignItems: 'center',
     justifyContent: 'center',
     padding: 10
     },
     text:{
       padding: 20,
       margin: 5
     },
     searchbar:{
       flex: 2,
       padding: 10
     },
     logoutBtn:{
       flex: 1
     }
   });