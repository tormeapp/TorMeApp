import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fb from "../fb";
import { AuthContext } from "../navigation/AuthProvider";

const MyAppointments = ({ route, navigation }) => {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);
  const userRef = fb.database().ref().child(`users/${user.uid}`);
  useEffect(() => {
    try {
      userRef.once(
        "value",
        async function (snapshot) {
          const info = await snapshot.val();
          const appointmentsObj = info.appointments || {};
          let appointments = [];
          for (const q in appointmentsObj) {
            appointments.push(appointmentsObj[q]);
          }
          setData(appointments);
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={{ width: "100%", height: "100%" }}
      >
        <FlatList
          // contentContainerStyle={styles.appointmentList}
          keyExtractor={(item) => item.id.toString()}
          data={data}
          renderItem={({ item }) => {
            return (
              <Text style={{ textAlign: "center" }}>{`${item.date.substr(
                item.date.length - 2
              )}/${item.date.substr(item.date.length / 2, 2)}   ${
                item.appointmentStart
              }-${item.appointmentEnd}   ${item.businessName}`}</Text>
            );
          }}
        ></FlatList>
      </LinearGradient>
    </View>
  );
};

export default MyAppointments;
