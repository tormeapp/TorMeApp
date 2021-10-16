import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import fb from "../fb";
import { AuthContext } from "../navigation/AuthProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import useResults from "../hooks/useResults";

const MyAppointments = ({ route, navigation }) => {
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);
  const userRef = fb.database().ref().child(`users/${user.uid}`);
  const businessRef = fb.database().ref().child("businesses");

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

  const handleDelete = (item) => {
    //console.log(item.id);
    const index = data.indexOf(item);
    userRef.child("appointments").child(`${index}`).remove();
    deleteInBusiness(item);
    const newData = data.filter((dataItem) => dataItem.id !== item.id);
    setData(newData);
  };

  const deleteInBusiness = (item) => {
    businessRef
      .orderByChild("name")
      .equalTo(item.businessName)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          //console.log(data.key);
          const currentRef = fb
            .database()
            .ref()
            .child(`businesses/${data.key}`)
            .child("appointments");

          currentRef
            .orderByChild("id")
            .equalTo(item.id)
            .on("value", function (snapshot) {
              snapshot.forEach(function (info) {
                //console.log(info.key);
                fb.database()
                  .ref()
                  .child(`businesses/${data.key}`)
                  .child(`appointments/${info.key}`)
                  .remove();
              });
            });
        });
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={{ width: "100%", height: "100%" }}
      >
        <FlatList
          // contentContainerStyle={styles.appointmentList}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.appointmentView}>
                <Text style={styles.text}>{`${item.date.substr(
                  item.date.length - 2
                )}/${item.date.substr(item.date.length / 2, 2)}   ${
                  item.appointmentStart
                }-${item.appointmentEnd}   ${item.businessName}`}</Text>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <MaterialIcons
                    style={styles.icon}
                    name="delete-forever"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  appointmentView: {
    backgroundColor: "white",
    width: 200,
    padding: 5,
    borderRadius: 7,
    alignSelf: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  icon: {
    textAlign: "right",
  },
});

export default MyAppointments;
