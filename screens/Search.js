import React, { useContext } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import DatePicker from "../components/DatePicker/DatePicker";
import { AuthContext } from "../navigation/AuthProvider";
import BackgroundImg from "../components/Background/BackgroundImg";

function Search({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <BackgroundImg img={require("../assets/bgV2.jpg")} />
      <KeyboardAvoidingView behavior="padding">
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 30,
              fontFamily: "Verdana",
            }}
          >
            Welcome {user.email.slice(0, user.email.indexOf("@"))}
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
