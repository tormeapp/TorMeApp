import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import Rated from "../Rating/Rated";

const ResultDetails = ({ result, handleClick, scrollX, inputRange }) => {
  
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1.1, 0.6],
    extrapolate: 'clamp',
  });
  
  return (
    <>
      <TouchableOpacity onPress={() => handleClick(result)}>
        <Animated.View style={{...styles.card, transform:[{scale: scale}]}}>
          <Text>Name: {result.name}</Text>
          <Text>Category: {result.category}</Text>
          <Text>Address: {result.address}</Text>
          <Text>Business hours: </Text>
          <Text>
            From: {result.hours[0]} To: {result.hours[1]}
          </Text>
          <Rated rating={result?.rating} />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});
