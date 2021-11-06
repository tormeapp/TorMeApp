import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Alert,
  Platform,
} from "react-native";
import fb from "../../fb";
import { AuthContext } from "../../navigation/AuthProvider";
import { Entypo } from "@expo/vector-icons";

const StarRating = ({ buid }) => {
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const businessRef = fb.database().ref().child(`businesses/${buid}`);
  const [count, setCount] = useState(0);
  const [starSum, setStarSum] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    businessRef.once("value", function (snapshot) {
      const data = snapshot.val();
      setCount(data.rating?.count);
      setStarSum(data.rating?.starSum);
    });
  }, [count, starSum]);

  console.log(count, starSum);

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const handleRating = (item) => {
    if (user.uid === buid) {
      Platform.OS === "android"
        ? Alert.alert(
            "No cheating",
            "Owner cannot apply rating on personal business",
            [
              {
                text: "I understand",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]
          )
        : Alert.prompt(
            "No cheating",
            "Owner cannot apply rating on personal business",
            [
              {
                text: "I understand",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            "default"
          );
    } else {
      businessRef.update({
        rating: {
          count: count + 1,
          starSum: starSum + item,
        },
      });
    }
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setDefaultRating(item) + handleRating(item)}
            >
              <Entypo
                name={item <= defaultRating ? "star" : "star-outlined"}
                size={30}
                color="#800080"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Rate us</Text>
      <CustomRatingBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});

export default StarRating;
