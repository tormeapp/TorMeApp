import React, { useState, useContext, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import Avatar from "../components/Avatar/Avatar";
import SearchBar from "../components/Search/SearchBar";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../navigation/AuthProvider";
import fb from "../fb";
import { LinearGradient } from "expo-linear-gradient";
import useResults from "../hooks/useResults";
import ResultsList from "../components/Search/ResultsList";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import fetchUserData from "../hooks/fetchUserData";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function Search({ navigation }) {
  const { user } = useContext(AuthContext);
  const [term, setTerm] = useState("");
  const [getBusinesses, results] = useResults();
  const [category, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState(false);
  const userInfo = fb.database().ref().child(`users/${user.uid}`);
  const isFocused = useIsFocused();
  const { userData, loading, error } = fetchUserData(isFocused);



  useEffect(() => {
    getBusinesses();
    if (category === "") {
      setIsCategory(false);
    } else {
      setIsCategory(true);
    }
  }, [category]);

  useEffect(() => {
    if (isFocused) {
      setTerm("");
    }
  }, [isFocused]);

  const searchByCat = () => {
    return results.filter((result) => {
      return (
        result.category === category &&
        result.name.toLowerCase().startsWith(term.toLowerCase())
      );
    });
  };

  const searchFilter = (keyword) => {
    if (keyword !== "") {
      const found = results.filter((result) =>
        result.name.toLowerCase().startsWith(keyword.toLowerCase())
      );
      return found;
    }
  };

  // Notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigateToBusiness = (result) => {
    navigation.navigate("Business", {
      ...result,
      pushToken: expoPushToken,
    });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Notifications Permissions.
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }

  return (
    <View>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <KeyboardAvoidingView behavior="padding">
          <StatusBar style="auto" />
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Avatar />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {userData.firstName === undefined &&
                userData.lastName === undefined ? (
                  <Loading />
                ) : (
                  "Welcome " + userData.firstName + " " + userData.lastName
                )}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputContainerLeft}>
                <SearchBar
                  term={term}
                  onTermChange={setTerm}
                  //onTermSubmit={getBusinesses}
                  onValueChange={getBusinesses}
                />
              </View>
              <View style={styles.inputContainerRight}>
                <Picker
                  //style={{ height: 50 }}
                  itemStyle={{ height: 50 }}
                  selectedValue={category}
                  onValueChange={(itemValue) => {
                    setCategory(itemValue) + getBusinesses();
                  }}
                >
                  <Picker.Item label="Category" value="" />
                  <Picker.Item label="Food" value="food" />
                  <Picker.Item label="Beauty" value="beauty" />
                  <Picker.Item label="Healthcare" value="healthcare" />
                  <Picker.Item label="Handyman" value="handyman" />
                </Picker>
              </View>
            </View>
            <View style={styles.results}>
              {results && (
                <ResultsList
                  results={isCategory ? searchByCat() : searchFilter(term)}
                  handleClick={navigateToBusiness}
                />
              )}
              {results && (
                <ResultsList
                  results={results}
                  handleClick={navigateToBusiness}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  headerText: {
    textShadowColor: "#FFF",
    textShadowRadius: 10,
    textAlignVertical: "center",
    lineHeight: 40,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
  },
  inputContainerLeft: {
    backgroundColor: "#FFF",
    //borderRadius: 25,
    width: "60%",
    height: 50,
    opacity: 0.5,
    // marginVertical: 40,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    margin: 2,
  },
  inputContainerRight: {
    backgroundColor: "#fff",
    width: "35%",
    height: 50,
    opacity: 0.5,
    //marginVertical: 40,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    margin: 2,
    //overflow: "hidden",
  },
  // input: {
  //   height: 50,
  //   padding: 15,
  // },
  results: {
    width: "100%",
    margin: 5,
  },
});
