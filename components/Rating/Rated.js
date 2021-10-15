import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { v1 as uuid } from "uuid";

const Rated = ({ rating }) => {
  //const [defaultRating, setDefaultRating] = useState(rating);
  const avgRate = Math.floor(rating?.starSum / rating?.count);
  const rows = [];
  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  for (let i = 0; i < avgRate; i++) {
    rows.push(
      <Image
        key={uuid()}
        style={styles.starImgStyle}
        source={{ uri: starImgFilled }}
      />
    );
  }

  for (let i = 0; i < 5 - avgRate; i++) {
    rows.push(
      <Image
        key={uuid()}
        style={styles.starImgStyle}
        source={{ uri: starImgCorner }}
      />
    );
  }

  return <SafeAreaView style={styles.container}>{rows}</SafeAreaView>;
};

export default Rated;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    margin: 2,
    marginTop: 5,
  },
});
