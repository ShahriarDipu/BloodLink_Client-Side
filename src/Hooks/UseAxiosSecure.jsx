import React, { use, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({

    baseURL:'http://localhost:3000'
})

export const UseAxiosSecure = () => {

  const {user,logOut}=use(AuthContext)
  console.log(user)
const navigate =useNavigate()
// useEffect(()=>{
//   axiosSecure.interceptors.request.use(config =>{
//     config.headers.Authorization=`Bearer ${user?.getIdToken()}`
//     return config
//   })
// },[user])

useEffect(() => {
   

    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); 
          console.log("JWT being sent:", token); 
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

const resIntercerptor =axiosSecure.interceptors.response.use((response)=>{
return response;
},
(error)=>{
  console.log(error)

const statusCode = error.response?.status;
if(statusCode === 401 || statusCode === 403 ){
  logOut()
.then(()=>{
  navigate('/loginRegister')
})
}

  return Promise.reject(error)
})

 return () => {
      axiosSecure.interceptors.request.eject(interceptor);
      axiosSecure.interceptors.response.eject(resIntercerptor)
    };
    
  }, [user,logOut,navigate]);



  return axiosSecure
}
