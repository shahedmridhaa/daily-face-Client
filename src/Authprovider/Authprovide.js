import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


export const Authcontext = createContext();
const auth = getAuth(app);

const Authprovide = ({children}) => {

       const [loading, setLoading] = useState(true)
       const [user, setuser] = useState(null)


       const signupUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
       }


       const loginUser = (email, password) =>{
        return signInWithEmailAndPassword (auth ,email, password) 
       }

       const userlogout = () =>{
        return signOut(auth)
    }

       const userUpdet = (name , photo) =>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
       }

       
       useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setuser(currentUser)
            setLoading(false)
            console.log(currentUser);
        })
        return () =>{
            unsubscribe()
        }

       },[])

       const authInfo ={signupUser, loginUser, userUpdet, userlogout, loading, user }

    return (
        <div>
            <Authcontext.Provider value={authInfo}>
                {children}
            </Authcontext.Provider>
        </div>
    );
};

export default Authprovide;