import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../Context/AuthContext'

export const PrivateRoute = ({children}) => {

    const {user,loading}=use(AuthContext)

    const location =useLocation();




   if(loading ){
    return <span className="loading loading-dots loading-xl"></span>
   }


   if(!user){
    return <Navigate  state={{ from: location }} replace  to="/loginRegistration"></Navigate>
   }

  return children;
}
