import React from 'react'
import { motion } from "framer-motion";
import { Users, Droplet, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


import { use } from "react";
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';
import { AdminStatistics } from './AdminStatistics';




export const AdminProfileDashboard = () => {



    const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);





  return (
    <div>

<div className="space-y-8 mb-10">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.displayName || "Admin"} 👋
        </h1>
        <p className="text-rose-100 mt-1">
          Here’s what’s happening on your platform today
        </p>
      </motion.div>

      {/* Stats */}
      
    </div>

        <AdminStatistics></AdminStatistics>
    </div>
  )
}
