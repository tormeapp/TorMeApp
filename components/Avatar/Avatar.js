import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Avatar() {
  return (
    <Image
      style={styles.avatar}
      source={require("../../assets/Profile/blank-profile-pic.png")}
    ></Image>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
  },
});
