import React, { useState, useContext, useEffect } from "react";
import Loading from '../components/Loading/Loading';
import BackgroundImg from "../components/Background/BackgroundImg";
import Avatar from "../components/Avatar/Avatar";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import DatePicker from "../components/DatePicker/DatePicker";
import { AuthContext } from "../navigation/AuthProvider";
import fb from "../fb";

function Search({ navigation}) {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState({});
  
  const userInfo = fb.database().ref().child(`users/${user.uid}`);

  useEffect(() => {
    userInfo.once("value", function(snapshot) {
      const info = snapshot.val();
      const list = [];
      for (let id in info) {
        list.push( {id, ...info[id]} );
      }
      setData(list[0]);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },[])

  return (
    <View style={styles.container}>
      <BackgroundImg img={require("../assets/bgV2.jpg")} />
      <KeyboardAvoidingView behavior="padding">
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => navigation.navigate('Profile')}
        >
         <Avatar/>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 30,
              fontFamily: "Verdana",
            }}
          >
            {data.firstName === undefined&& data.lastName === undefined  ? (<Loading/>) : ("Welcome "+data.firstName + " " + data.lastName)}{console.log(data)}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for anything.."/>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => logout()}
            style={styles.logOutButton}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
  },
  header: {},
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 120,
  },
  searchContainer: {
    width: 300,
    height: 70,
    backgroundColor: "white",
    opacity: 0.2,
    borderRadius: 7,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  logOutButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#ff595e",
    padding: 10,
    borderRadius: 7,
    margin: 10,
    marginTop: 30,
  },
});
