import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import fb from "../fb";
import { AuthContext } from "../navigation/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const EditBusiness = ({ navigation }) => {
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const rootRef = fb.database().ref();
  const [business, setBusiness] = useState({});
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("food");
  const [openingHours, setOpeningHours] = useState("0");
  const [closingHours, setClosingHours] = useState("0");
  const businessRef = fb.database().ref().child(`businesses/${user.uid}`);

  useEffect(() => {
    businessRef.once(
      "value",
      function (snapshot) {
        const info = snapshot.val();
        console.log(info);
        setName(info.name);
        setAddress(info.address);
        setCategory(info.category);
        const hours = [...info.hours];
        console.log(hours);
        setOpeningHours(
          parseInt(hours[0]) >= 10 ? hours[0].slice(0, 2) : hours[0].slice(0, 1)
        );
        setClosingHours(
          parseInt(hours[1]) >= 10 ? hours[1].slice(0, 2) : hours[1].slice(0, 1)
        );
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }, []);

  const updateBusiness = () => {
    rootRef.child(`businesses/${user.uid}`).update({
      name: name,
      address: address,
      category: category,
      hours: [openingHours + ":00", closingHours + ":00"],
      queues: [],
    });
    Alert.alert("Business updated successfully");
    navigation.goBack();
  };

  const deleteBusiness = () => {
    Platform.OS === "android"
      ? Alert.alert(
          "Alert Title",
          "Are you sure you want to delete your business?', 'Deleting your business will result\nin appointments getting cancelled.",
          [
            {
              text: "Cancel",
              onPress: () => Alert.alert("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => handleDelete() },
          ],
          {
            cancelable: true,
          }
        )
      : Alert.prompt(
          "Are you sure you want to delete your business?",
          "Deleting your business will result\nin appointments getting cancelled.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => handleDelete() },
          ],
          "default"
        );
  };

  const handleDelete = () => {
    rootRef
      .child(`businesses/${user.uid}`)
      .remove()
      .then(() => {
        rootRef.child(`users/${user.uid}`).update({
          isOwner: false,
        });

        navigation.goBack();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Text
            style={{
              marginTop: 30,
              fontSize: 18,
            }}
          >
            Business Name
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              placeholder="Enter business name.."
              require={true}
              onChangeText={(name) => setName(name)}
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 18,
            }}
          >
            Address
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={address}
              placeholder="Enter business address.."
              require={true}
              onChangeText={(address) => setAddress(address)}
            />
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
            }}
          >
            Category
          </Text>
          <View style={styles.card}>
            <Picker
              itemStyle={{ height: 80 }}
              value={category}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => {
                setCategory(itemValue);
              }}
            >
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Beauty" value="beauty" />
              <Picker.Item label="Healthcare" value="healthcare" />
              <Picker.Item label="Handyman" value="handyman" />
            </Picker>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
            }}
          >
            Open from
          </Text>
          <View style={styles.card}>
            <Picker
              itemStyle={{ height: 60 }}
              selectedValue={openingHours}
              onValueChange={(itemValue, itemIndex) => {
                setOpeningHours(itemValue);
              }}
            >
              {hours.map((hour, index) => (
                <Picker.Item
                  key={index}
                  label={`${hour >= 10 ? hour : "0" + hour}`}
                  value={`${hour}`}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
            }}
          >
            To
          </Text>
          <View style={styles.card}>
            <Picker
              itemStyle={{ height: 60 }}
              selectedValue={closingHours}
              onValueChange={(itemValue, itemIndex) => {
                setClosingHours(itemValue);
              }}
            >
              {hours.map((hour, index) => (
                <Picker.Item
                  key={index}
                  label={`${hour >= 10 ? hour : "0" + hour}`}
                  value={`${hour}`}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => updateBusiness()}
          >
            <Text style={{ fontSize: 18, padding: 10 }}>Update Business</Text>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => deleteBusiness()}
          >
            <Text style={{ fontSize: 18, padding: 10 }}>Delete Business</Text>
            <MaterialIcons name="delete-forever" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "70%",
    opacity: 0.5,
  },
  input: {
    height: 50,
    padding: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "50%",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  updateBtn: {
    width: "50%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
});

export default EditBusiness;
