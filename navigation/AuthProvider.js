import React from 'react';
import { createContext, useState } from 'react';
import fb from '../fb';

export const AuthContext = createContext({});


export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider
        value={{
            user,
            setUser,
            login: async (email, password) =>{
                try{
                    await fb.auth().signInWithEmailAndPassword(email, password);
                } catch (e){
                    console.log(e);
                }
            },
            register: async (email, password) => {
                try {
                    await fb.auth().createUserWithEmailAndPassword(email, password);
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
                try{
                    await fb.auth().signOut();
                } catch (e){
                    console.log(e);
                }
            }
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};