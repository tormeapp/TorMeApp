import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import EditUserInfo from "./EditUserInfo";
import { AntDesign } from "@expo/vector-icons";

const EditProfile = ({ status, setStatus, setToggle }) => {
 
  return (
    <>
      {status ? (
        <EditUserInfo setShowEdit={setStatus} setToggle={setToggle} />
      ) : (
        <TouchableOpacity onPress={setStatus} style={styles.editButton}>
          <Text style={{ fontSize: 18, padding: 10 }}>Edit Profile</Text>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: "50%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 15,
    flexDirection: "row",
  },
});
