import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import Rated from "../Rating/Rated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const ResultDetails = ({ result, handleClick, scrollX, inputRange }) => {
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1.1, 0.6],
    extrapolate: "clamp",
  });

  const getName = () => {
    switch (result.category) {
      case "handyman":
        return "handyman";
      case "food":
        return "fastfood";
      case "beauty":
        return "spa";
      case "healthcare":
        return "local-hospital";
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleClick(result)}>
        <Animated.View
          style={{ ...styles.card_wrapper, transform: [{ scale: scale }] }}
        >
          <LinearGradient
            colors={["#95f9c3", "#32c4c0", "#60b5f1"]}
            style={styles.background}
          >
            <Animated.View style={styles.card_header_wrapper}>
              <Text style={{ fontSize: 20 }}>{result.name}</Text>
              <Animated.View style={styles.category_img_wrapper}>
                <MaterialIcons name={getName()} size={24} color="#800080" />
              </Animated.View>
            </Animated.View>

            <Animated.View style={styles.card_content}>
              <Text style={{ marginBottom: 10, fontSize: 18 }}>
                {result.address}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                {result.hours[0]} - {result.hours[1]}
              </Text>
              <Rated rating={result?.rating} />
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
  card_wrapper: {
    width: 200,
    borderRadius: 7,
    borderWidth: 2,
    height: 200,
  },
  card_header_wrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#d7d7d7",
    padding: 15,
    flexDirection: "row",
  },
  card_content: {
    padding: 5,
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  category_img_wrapper: {},
  background: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
});
