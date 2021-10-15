import React from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../navigation/AuthProvider";

export default function Avatar({ img }) {
  // Implement AsyncStorage for profile URL
  const [imgURL, setImgURL] = useState(img);
  const { user } = useContext(AuthContext);
  const { getItem } = useAsyncStorage(`${user.uid}`);

  const getData = async () => {
    const item = await getItem();
    setImgURL(item);
  };

  useEffect(() => {
    getData();
  }, [imgURL]);

  return (
    <Image
      style={styles.avatar}
      source={{ uri: imgURL || user.photoURL }}
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
