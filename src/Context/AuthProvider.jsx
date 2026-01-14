import React, { useEffect, useState } from 'react'
import { auth } from '../FireBase/Firebase.init'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';


export const AuthProvider = ({children}) => {
 const [loading, setLoading]= useState(true);
const [user,setUser]=useState(null)
const googleProvider = new GoogleAuthProvider ();

const createUser =(email,password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
   
}

const signInUser =(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)

}

const signInWithGoogle =()=>{
 setLoading(true)
  return signInWithPopup(auth,googleProvider)
}

const logOut=()=>{
   setLoading(true)
return signOut(auth)
}

useEffect(()=>{
  const unSubcribe =onAuthStateChanged(auth, (currentUser) => {
     

    setUser(currentUser)
    console.log(currentUser)
    setLoading(false)
  })

  return()=>{
    unSubcribe();
  }
},[])




const updateUserProfile =(profile)=>{
  return updateProfile(auth.currentUser, profile)
}


const authInfo ={
    signInUser,
    createUser,
    logOut,
    user,
    updateUserProfile,
    loading,
        signInWithGoogle,
    
}



  return (
  <AuthContext value={authInfo}>
{children}
  </AuthContext>
  )
}
