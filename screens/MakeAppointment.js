import React, { useState, useContext } from "react";
import "react-native-get-random-values";
import { v1 as uuid } from "uuid";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../navigation/AuthProvider";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import fb from "../fb";
import { useEffect } from "react/cjs/react.development";
import * as Notifications from "expo-notifications";

// This function return the offset of the chosen time interval between appointments
const getIntervalOffset = (openning, closing, interval) => {
  // Business hours
  const intOpenning = parseInt(openning.substr(0, openning.indexOf(":")));
  const intClosing = parseInt(closing.substr(0, closing.indexOf(":")));
  // interval hours converted to minutes
  const additional = interval.hours * 60;
  // interval minutes and hours multiplier
  const multi = 60 / (additional + interval.minutes);
  const offsetMultiplied = (intClosing - intOpenning) * multi;

  return Math.floor(offsetMultiplied);
};

const generateAppointmentArray = (
  openingHours,
  hoursOffset,
  interval,
  date
) => {
  // generate array of appointments by hours offset with hour interval
  let appointmentsArr = [];
  let numberMinutes = 0;
  let numberHour = parseInt(openingHours.substr(0, openingHours.indexOf(":")));
  for (let index = 0; index < hoursOffset; index++) {
    let appointmentStart;
    if (numberMinutes === 0) {
      appointmentStart = `${numberHour}:0${numberMinutes}`;
    } else if (numberMinutes === 60) {
      appointmentStart =
        numberMinutes % 60 === 0
          ? `${++numberHour}:0${numberMinutes % 60}`
          : `${++numberHour}:${numberMinutes % 60}`;
    } else {
      appointmentStart = `${numberHour}:${numberMinutes}`;
    }

    numberHour += interval.hours;
    numberMinutes += interval.minutes;

    // if we have an hour update
    if (numberMinutes >= 60) {
      numberHour += 1;
      numberMinutes %= 60;
    }

    const appointmentEnd =
      numberMinutes === 0
        ? `${numberHour}:0${numberMinutes}`
        : `${numberHour}:${numberMinutes}`;

    // add appointment object to array
    appointmentsArr[index] = {
      key: uuid(),
      appointmentStart: `${appointmentStart}`,
      appointmentEnd: `${appointmentEnd}`,
      date: date,
      scheduled: false,
    };
  }
  return appointmentsArr;
};

const MakeAppointment = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

  const interval = {
    hours: 0,
    minutes: 30,
  };
  const { openningHours, closingHours, BUID, date, pushToken } = route.params;
  const [appointment, setAppointment] = useState({
    key: "",
    appointmentStart: "",
    appointmentEnd: "",
    date: "",
    scheduled: false,
  });
  const [businessData, setBusinessData] = useState({});
  const [businessName, setBusinessName] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState("");

  const userInfo = fb.database().ref().child(`users/${user.uid}`);
  const businessInfo = fb.database().ref().child(`businesses/${BUID}`);

  useEffect(() => {
    userInfo.once(
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
    businessInfo.once(
      "value",
      async function (snapshot) {
        const info = await snapshot.val();
        setBusinessName(() => info.name);
        const appointmentsObj = info.appointments || {};
        let appointments = [];
        for (const q in appointmentsObj) {
          appointments.push(appointmentsObj[q]);
        }
        setBusinessData(appointments);
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }, []);

  useEffect(() => {
    if (appointment) {
      setLoading(() => false);
    }
  }, [appointment]);

  useEffect(() => {
    if (track === "done") {
      const appointmentsArr = data || [];
      const businessAppointments = businessData || [];
      //console.log(loading, appointment);
      if (!loading && appointment) {
        userInfo
          .update({
            appointments: [...appointmentsArr, appointment],
          })
          .then(() =>
            Alert.alert(
              "Your appointent has been set!",
              `Your appointment at ${date}\nFrom ${appointment.appointmentStart} to ${appointment.appointmentEnd} has been set!`
            )
          )
          .catch((err) => console.log(err));
        sendPushNotification(pushToken);
        //schedulePushNotification();
        appointment.businessName = null;
        businessInfo
          .update({
            appointments: [...businessAppointments, appointment],
          })
          .then(() => {})
          .catch((err) => console.log(err));
        setTrack("");
      } else {
        Alert.alert("Schedueling Error!\nPlease try again!");
        //console.log("Im here");
      }
    }
  }, [track]);

  // Notify

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: "Here is the notification body",
  //       data: { data: "goes here" },
  //     },
  //     trigger: {
  //       date: appointment.date,
  //       hour: appointment.appointmentStart,
  //       repeats: true,
  //     },
  //   });
  // }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "TorMe New Appointment!",
      body: `${businessName}, on ${appointment.date} from ${appointment.appointmentStart} to ${appointment.appointmentEnd} `,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const handleMakeAppointment = (item) => {
    console.log(item);
    if (!(item && item.appointmentStart && item.appointmentEnd)) {
      Alert.alert(
        `There's a problem with the appointment you chose\nPlease try again.`
      );
      return;
    } else {
      setTrack("done");
      setLoading(() => false);
    }
  };

  const makeApponintment = (item) => {
    Platform.OS === "android"
      ? Alert.alert(
          "Alert Title",
          "Do you want to set an appointment from\n" +
            item.appointmentStart +
            " to " +
            item.appointmentEnd +
            " ?",
          [
            {
              text: "No",
              onPress: () => Alert.alert("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                handleMakeAppointment(item);
              },
            },
          ],
          {
            cancelable: true,
          }
        )
      : Alert.prompt(
          "Do you want to set an appointment from\n" +
            item.appointmentStart +
            " to " +
            item.appointmentEnd +
            " ?",
          "",
          [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                handleMakeAppointment(item);
              },
            },
          ],
          "default"
        );
  };
  // #TODO: fix undefined appointment before saving to db
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <FlatList
          contentContainerStyle={styles.appointmentList}
          keyExtractor={(item) => item.key.toString()}
          data={generateAppointmentArray(
            openningHours,
            getIntervalOffset(openningHours, closingHours, interval, date),
            interval
          )}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.appointment}
                onPress={() =>
                  makeApponintment(item) +
                  setAppointment({
                    id: item.key,
                    businessName,
                    appointmentStart: item.appointmentStart,
                    appointmentEnd: item.appointmentEnd,
                    date: date,
                    scheduled: true,
                  })
                }
              >
                <Text style={{ textAlign: "center" }}>{`appointment ${
                  index + 1
                }`}</Text>
                <Text style={{ textAlign: "center" }}>
                  {item.appointmentStart}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {item.appointmentEnd}
                </Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </LinearGradient>
    </View>
  );
};

export default MakeAppointment;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  appointmentList: {
    alignContent: "center",
    alignItems: "center",
  },
  // container: {
  //   alignItems: "center",
  //   alignContent: "center",
  // },
  appointment: {
    width: 200,
    padding: 10,
    marginVertical: 5,
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 25,
  },
});
