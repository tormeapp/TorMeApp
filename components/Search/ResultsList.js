import React from "react";
import { FlatList, Animated, Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ResultDetails from "./ResultDetails";

const ResultsList = ({ results, handleClick }) => {
  const { width, height } = Dimensions.get("screen");
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.listContainer}>
      <Animated.FlatList
        style={styles.list}
        horizontal
        snapToInterval={1}
        snapToAlignment="center"
        pagingEnabled={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * 150,
            index * 150,
            (index + 1) * 150,
          ];
          return (
            <ResultDetails
              result={item}
              handleClick={handleClick}
              inputRange={inputRange}
              scrollX={scrollX}
            />
          );
        }}
      />
    </View>
  );
};

export default ResultsList;

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
  list: {
    paddingVertical: 10,
    marginVertical: 10,
  },
});
