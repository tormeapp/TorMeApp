import React from "react";
import { FlatList } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ResultDetails from "./ResultDetails";

const ResultsList = ({ results, handleClick }) => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return <ResultDetails result={item} handleClick={handleClick} />;
        }}
      />
    </View>
  );
};

export default ResultsList;

const styles = StyleSheet.create({});
