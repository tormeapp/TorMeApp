import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import fb from "../fb";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AuthContext } from "../navigation/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/Avatar/Avatar";
import Loading from "../components/Loading/Loading";
import EditProfile from "../components/UserProfile/EditProfile";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import fetchUserData from "../hooks/fetchUserData";

const Profile = ({ route, navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [imgRef, setImgURL] = useState("");
  const { getItem, setItem } = useAsyncStorage(`${user.uid}`);
  const [showMenu, setShowMenu] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);
  const { userData, loading, error } = fetchUserData(didUpdate);

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
  }, []);

  const storeData = async (url) => {
    await setItem(url);
    setImgURL(url);
  };

  const getData = async () => {
    const item = await getItem();
    setImgURL(item);
  };

  useEffect(() => {
    getData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.uri === undefined) {
        console.log("NO URI FOUND");
      }
      setImage(result.uri);
      uploadImage(result.uri, "displayPic")
        .then(() => Alert.alert("Photo uploaded!"))
        .catch((e) => Alert.alert(e));
    }
  };

  const uploadImage = async (uri, filename) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = fb.storage().ref(`${user.uid}`).child(`/Avatar/${filename}`);
    const urlRef = ref.put(blob);
    urlRef.on("state_changed", null, null, function () {
      ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          setImgURL(() => url);
          storeData(url);
          // Insert url into an <img> tag to "download"
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              alert("File does not exist!");
              break;
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
  };

  return (
    <>
      <LinearGradient
        colors={["#95f9c3", "#32c4c0", "#60b6f1"]}
        style={styles.background}
      >
        <SafeAreaView>
          <StatusBar style="auto" />
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.avatarContainer}>
                  <Avatar img={imgRef} />
                  <Feather
                    style={styles.iconStyle}
                    name="upload"
                    size={24}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {userData.firstName && userData.lastName ? (
                  "Welcome " + userData.firstName + " " + userData.lastName
                ) : (
                  <Loading />
                )}
              </Text>
            </View>
            <EditProfile
              status={showMenu}
              setStatus={setShowMenu}
              setToggle={setDidUpdate}
            />
            {showMenu ? null : (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyAppointments")}
                  style={styles.appointmentBtn}
                >
                  <Text style={{ fontSize: 18, padding: 10 }}>
                    My Appointments
                  </Text>
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>

                {userData.isOwner ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditBusiness")}
                    style={styles.addBusBtn}
                  >
                    <Text style={{ fontSize: 18, padding: 10 }}>
                      Edit Business
                    </Text>
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addBusBtn}
                    onPress={() => navigation.navigate("AddBusiness")}
                  >
                    <Text style={{ fontSize: 18, padding: 10 }}>
                      Add Business
                    </Text>
                    <MaterialIcons
                      name="add-business"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
            <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
              <Text style={{ fontSize: 18, padding: 10 }}>Log Out</Text>
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
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
  appointmentBtn: {
    width: "50%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  addBusBtn: {
    width: "50%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  avatarContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    position: "absolute",
    marginTop: 95,
    marginLeft: 100,
  },
  logoutBtn: {
    width: "40%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 70,
  },
});
