import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import fb from "../fb";
import { AuthContext } from "../navigation/AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const AddBusiness = ({ navigation }) => {
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const rootRef = fb.database().ref();
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("food");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [ids, setIds] = useState([]);

  const businessRef = fb.database().ref().child(`businesses`);

  useEffect(() => {
    businessRef.once("value", function (snapshot) {
      const data = snapshot.val();
      const businessList = [];
      for (let id in data) {
        businessList.push(data[id]);
      }
      console.log(businessList);
      businessList.forEach((business) => {
        ids.push(business.id);
      });
    });
    console.log(ids);
  }, []);

  const addBusiness = () => {
    const regex = /^[0-9]{9}$/;
    const isValidID = regex.test(String(id));
    let takenId = false;
    ids.forEach((BusinessId) => {
      if (id === BusinessId) {
        takenId = true;
      }
    });

    if (!isValidID) {
      Alert.alert("Please enter a valid Id");
      return;
    }
    if (takenId) {
      Alert.alert("This Id is already registered.\nPlease enter another Id");
      return;
    }
    if (name.length < 3 || address < 3) {
      Alert.alert("Please fill out all the required fields");
      return;
    }
    if (openingHours === "" || closingHours === "") {
      Alert.alert("Please choose opening and closing hours");
      return;
    }
    if (openingHours === closingHours) {
      Alert.alert("Opening hours and closing hours can't be the same");
      return;
    }

    rootRef.child(`businesses/${user.uid}`).set({
      id: id,
      name: name,
      address: address,
      category: category,
      hours: [openingHours, closingHours],
      queues: [],
      createdAt: Date.now(),
      rating: {
        count: 0,
        starSum: 0,
      },
    });

    rootRef
      .child(`users/${user.uid}`)
      .update({
        isOwner: true,
      })
      .then(() => Alert.alert("Business added successfully!"))
      .catch((e) => console.log(e));
    navigation.goBack();
  };

  return (
    <>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <StatusBar style="auto" />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your id/ Business id"
              require={true}
              onChangeText={(id) => setId(id)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter business name.."
              require={true}
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
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
              itemStyle={{ height: 80 }}
              selectedValue={openingHours}
              onValueChange={(itemValue, itemIndex) => {
                setOpeningHours(itemValue);
                console.log(openingHours.toString());
              }}
            >
              {hours.map((hour, key) => (
                <Picker.Item
                  key={key}
                  label={`${hour >= 10 ? hour : "0" + hour}`}
                  value={`${hour}:00`}
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
              itemStyle={{ height: 80 }}
              selectedValue={closingHours}
              onValueChange={(itemValue, itemIndex) => {
                setClosingHours(itemValue);
                console.log(closingHours);
              }}
            >
              {hours.map((hour, key) => (
                <Picker.Item
                  key={key}
                  label={`${hour >= 10 ? hour : "0" + hour}`}
                  value={`${hour}:00`}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => addBusiness()}>
            <Text style={{ fontSize: 18, padding: 10 }}>Add Business</Text>
            <MaterialIcons name="add-business" size={24} color="black" />
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
    marginTop: 15,
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: "70%",
    height: 50,
    marginBottom: 15,
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
  addBtn: {
    width: "40%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default AddBusiness;
