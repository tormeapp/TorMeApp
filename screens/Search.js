import React, { useContext } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import DatePicker from "../components/DatePicker/DatePicker";
import { AuthContext } from "../navigation/AuthProvider";
import { Input } from "react-native-elements";

function Search({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{ margin: 30, color: "white" }}>
          HomePage, Welcome {user.email.slice(0, user.email.indexOf("@"))}
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Search for anything.."
            leftIcon={{ type: "font-awesome", name: "search" }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => logout()}
        style={styles.logOutButton}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#0081a7",
  },
  inputContainer: {
    marginBottom: 20,
    width: 300,
    padding: 10,
    backgroundColor: "#fdfcdc",
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    flex: 1,
  },
  logOutButton: {
    width: 250,
    alignItems: "center",
    backgroundColor: "#ff595e",
    padding: 10,
    borderRadius: 7,
    margin: 30,
  },
});
