import React from "react";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import fb from "../fb";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { clientID } from "./clientID";

export const AuthContext = createContext({});

const rootRef = fb.database().ref();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await fb.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, firstName, lastName) => {
          try {
            await fb
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                if (res.user.uid) {
                  setUser(res.user);
                  rootRef.child(`users/${res.user.uid}`).set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    isOwner: false,
                    timestamp: Date.now(),
                  });
                }
              });
          } catch (err) {
            switch (err.code) {
              case "auth/invalid-email":
                return alert("Enter a valid email");
              case "auth/email-already-in-use":
                return alert(
                  "This email is already registered.\nEnter a different email"
                );
              case "auth/weak-password":
                return alert("Password length should be at least 8 characters");
            }
          }
        },
        logout: async () => {
          try {
            await fb.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        googleAuth: async () => {
          try {
            const result = await Google.logInAsync({
              iosClientId: clientID,
              // androidClientId:
              //   "83600405448-uv15c2faq0l73ucsbk296iass980sdqv.apps.googleusercontent.com",
              scopes: ["profile", "email"],
            });

            if (result.type === "success") {
              const credential = firebase.auth.GoogleAuthProvider.credential(
                //Set the tokens to Firebase
                result.idToken,
                result.accessToken
              );

              firebase
                .auth()
                .signInWithCredential(credential)
                .then((userInfo) => {
                  setUser(result.user);
                  if (userInfo.additionalUserInfo.isNewUser) {
                    rootRef
                      .child(`users/${firebase.auth().currentUser.uid}`)
                      .set({
                        firstName: result.user.givenName,
                        lastName: result.user.familyName,
                        email: result.user.email,
                        isOwner: false,
                        timestamp: Date.now(),
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }
        },
        facebookAuth: async () => {
          // try {
          //   await Facebook.initializeAsync({
          //     appId: "213436254089293",
          //   });
          //   const {
          //     type,
          //     token,
          //     expirationDate,
          //     permissions,
          //     declinedPermissions,
          //   } = await Facebook.logInWithReadPermissionsAsync({
          //     permissions: ["public_profile"],
          //   });
          //   if (type === "success") {
          //     // Get the user's name using Facebook's Graph API
          //     const response = await fetch(
          //       `https://graph.facebook.com/me?access_token=${token}`
          //     );
          //     Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
          //     const credential =
          //       firebase.auth.FacebookAuthProvider.credential(token);
          //     firebase.auth().signInWithCredential(credential);
          //   } else {
          //   }
          // } catch ({ message }) {
          //   alert(`Facebook Login Error: ${message}`);
          // }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
