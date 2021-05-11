import React from 'react';
import { createContext, useState } from 'react';
import fb from '../fb';

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
                        await fb.auth().createUserWithEmailAndPassword(email, password).then((res) => {
                            if (res.user.uid) {
                                setUser(res.user);
                                rootRef.child(`users/${res.user.uid}`).push({
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    isOwner: false,
                                    timestamp: Date.now()
                                })
                            }
                        })
                    } catch (err) {
                        switch (err.code) {
                            case "auth/invalid-email":
                                return alert('Enter a valid email');
                            case "auth/email-already-in-use":
                                return alert('This email is already registered.\nEnter a different email');
                            case "auth/weak-password":
                                return alert('Password length should be at least 8 characters');
                        }
                    }
                },
                logout: async () => {
                    try {
                        await fb.auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
