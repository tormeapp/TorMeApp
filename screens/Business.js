import React, { useState, useEffect, useContext, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import {
  Platform,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Animated,
  SafeAreaView,
} from "react-native";
import fb from "../fb";
import { AuthContext } from "../navigation/AuthProvider";
import Loading from "../components/Loading/Loading";
import { Calendar } from "react-native-calendars";
import StarRating from "../components/Rating/StarRating";
import { MaterialIcons } from "@expo/vector-icons";

// Date variables
const today = new Date();
const maxMonth = (today.getMonth() + 2) % 12;
const maxYear = today.getFullYear() + (today.getMonth() <= 8 ? 0 : 1);
// Calendar props
const maxDate = new Date(maxYear, maxMonth, 0);

const Business = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [BUID, setBUID] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const { name, category, address, hours, id, pushToken } = route.params;
  // convert JSON to string
  const openningHours = JSON.stringify(hours[0]).replaceAll('"', "");
  const closingHours = JSON.stringify(hours[1]).replaceAll('"', "");

  //animations
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const getBusiness = async () => {
    const businessRef = fb.database().ref().child(`businesses`);
    await businessRef.once("value", function (snapshot) {
      const data = snapshot.val();
      try {
        for (let id in data) {
          if (data[id].name === name) {
            setBUID(() => id);
          }
        }
        if (BUID.length > 0) {
          return BUID;
        } else throw new Error("Business does not exist!\nPlease check your connection");
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    getBusiness();
  }, []);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const getName = () => {
    switch (category) {
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
    <SafeAreaView>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.busCard}>
            <LinearGradient
              colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
              style={{ height: "100%", width: "100%", borderRadius: 7 }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.name}>
                  {JSON.stringify(name).replaceAll('"', "")}
                </Text>
                <MaterialIcons name={getName()} size={24} color="#800080" />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.address}>
                  We are at: {JSON.stringify(address).replaceAll('"', "")}
                </Text>
                <Text style={styles.hours}>
                  Open from {openningHours} to {closingHours}
                </Text>
              </View>
              {BUID && user.uid !== BUID ? <StarRating buid={BUID} /> : <></>}
            </LinearGradient>
          </View>

          <View style={{ padding: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignSelf: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              onPress={() => handleToggle() + fadeIn()}
            >
              <AntDesign name="calendar" size={40} color={"#800080"} />
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Set your appointment!
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              {
                // Bind opacity to animated value
                opacity: fadeAnim,
              },
            ]}
          >
            {toggle ? (
              <Calendar
                style={styles.calendar}
                minDate={today}
                maxDate={maxDate}
                onDayPress={(day) => {
                  setSelectedDay(() => day.timestamp);
                  const date = day.dateString;
                  if (BUID !== user.uid) {
                    navigation.navigate("MakeAppointment", {
                      date,
                      openningHours,
                      closingHours,
                      BUID,
                      pushToken,
                    });
                  } else {
                    Alert.alert(
                      "You can't set appointments in your own business!"
                    );
                  }
                }}
              />
            ) : (
              <></>
            )}
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Business;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    textAlign: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  calendar: {
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 7,
    width: 365,
  },
  busCard: {
    width: 350,

    borderRadius: 7,
    borderWidth: 2,
    height: 200,
    marginTop: "10%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#d7d7d7",
    padding: 15,
    flexDirection: "row",
  },
  cardInfo: {
    alignItems: "center",
    padding: 7,
  },
});
