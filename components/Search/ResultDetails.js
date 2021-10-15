import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Rated from "../Rating/Rated";

const ResultDetails = ({ result, handleClick }) => {
  return (
    <>
      <TouchableOpacity onPress={() => handleClick(result)}>
        <View style={styles.card}>
          <Text>Name: {result.name}</Text>
          <Text>Category: {result.category}</Text>
          <Text>Address: {result.address}</Text>
          <Text>Business hours: </Text>
          <Text>
            From: {result.hours[0]} To: {result.hours[1]}
          </Text>
          <Rated rating={result?.rating} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
  card: {
    width: 150,
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
