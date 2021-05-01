import React from "react";
import { StyleSheet, Image } from "react-native";
// import FastImage from "react-native-fast-image";

const BackgroundImg = ({ img }) => {
  return <Image source={img} style={styles.backgroundImage} />;
  // return (
  //   <FastImage
  //   style={styles.backgroundImage}
  //     source={{
  //       uri: { img },
  //       priority: FastImage.priority.high,
  //     }}
  //     resizeMode={FastImage.resizeMode.contain}
  //   />
  // );
};

export default BackgroundImg;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
  },
});
