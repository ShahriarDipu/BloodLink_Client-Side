import React from 'react'
import { motion } from "framer-motion";
import { Users, Droplet, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


import { use } from "react";
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between"
  >
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>
  </motion.div>
);

export const AdminProfileDashboard = () => {



    const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  // Total Donors
const { data: donorsData } = useQuery({
  queryKey: ["dashboardDonors"],
  queryFn: async () => {
    const res = await axiosSecure.get("/donors", {
      params: { page: 1, limit: 1 },
    });
    return res.data;
  },
});

// Total Requests
const { data: requestData } = useQuery({
  queryKey: ["dashboardRequests"],
  queryFn: async () => {
    const res = await axiosSecure.get("/donationrequests/admin", {
      params: { page: 1, limit: 1 },
    });
    return res.data;
  },
});

// Total Funding
const { data: fundingData } = useQuery({
  queryKey: ["dashboardFunding"],
  queryFn: async () => {
    const res = await axiosSecure.get("/fundings/total");
    return res.data;
  },
});

const totalDonors = donorsData?.total || 0;
const totalRequests = requestData?.total || 0;
const totalFunding = fundingData?.total || 0;


  return (
    <div>

<div className="space-y-8">
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <StatCard
    title="Total Donors"
    value={totalDonors}
    icon={Users}
    color="bg-blue-500"
  />

  <StatCard
    title="Total Funding"
    value={`৳ ${totalFunding.toLocaleString()}`}
    icon={DollarSign}
    color="bg-emerald-500"
  />

  <StatCard
    title="Total Donation Requests"
    value={totalRequests}
    icon={Droplet}
    color="bg-rose-500"
  />
</div>

    </div>

        
    </div>
  )
}
