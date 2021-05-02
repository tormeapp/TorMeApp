import React from "react";
import { StyleSheet, Image } from "react-native";
// import FastImage from "react-native-fast-image";

export default function BackgroundImg({ img }) {
  return <Image source={img} style={styles.backgroundImage} />;
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
  },
});
