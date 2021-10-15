import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SearchBar = ({ term, onTermChange, onValueChange }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {/* <TouchableOpacity onPress={onValueChange} style={styles.iconStyle}>
        
      </TouchableOpacity> */}
      <FontAwesome name="search" size={24} style={styles.iconStyle} />

      <TextInput
        style={styles.input}
        placeholder="Search for anything.."
        placeholderTextColor="black"
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={onTermChange}
        onChange={onValueChange}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 5,
    width: "80%",
  },
  iconStyle: {
    fontSize: 20,
    marginTop: 8,
    padding: 5,
    marginLeft: 5,
  },
});
