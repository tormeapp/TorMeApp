import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../navigation/AuthProvider";
import fb from "../../fb";

const EditUserInfo = ({ setShowEdit, setToggle }) => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const userRef = fb.database().ref().child(`users/${user.uid}`);

  useEffect(() => {
    userRef.once(
      "value",
      function (snapshot) {
        const info = snapshot.val();
        setFirstName(info.firstName);
        setLastName(info.lastName);
        setEmail(info.email);
      },
      function (errorObject) {
        console.log(errorObject.code);
      }
    );
  }, []);

  const updateUserProfile = () => {
    if (!validateEmail(email)) {
      alert("Email input incorrect");

      return;
    }
    try {
      fb.auth()
        .currentUser.updateEmail(email)
        .then(() => {
          console.log("Email Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }

    userRef.update({
      firstName,
      lastName,
      email,
    });

    resetInputs();
    setShowEdit(false);
  };

  const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  const resetInputs = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(name) => setFirstName(name)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(name) => setLastName(name)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => updateUserProfile() + setToggle(true)}
      >
        <Text style={{ fontSize: 18, padding: 10 }}>Submit</Text>
        <Ionicons name="checkmark" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default EditUserInfo;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "70%",
    height: 50,
    opacity: 0.5,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 50,
    padding: 15,
  },
  submitButton: {
    width: "40%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 120,
  },
  iconStyle: {
    fontSize: 20,
    marginLeft: 20,
  },
});
