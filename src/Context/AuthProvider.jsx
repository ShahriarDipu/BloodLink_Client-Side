import React, { useEffect, useState } from 'react'
import { auth } from '../FireBase/Firebase.init'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthProvider = ({children}) => {
 const [loading, setLoading]= useState(true);
const [user,setUser]=useState(null)


const createUser =(email,password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
   
}

const signInUser =(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)

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

const authInfo ={
    signInUser,
    createUser,
    logOut,
    user
}



  return (
  <AuthContext value={authInfo}>
{children}
  </AuthContext>
  )
}
