import React from 'react'
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Droplet, DollarSign } from "lucide-react";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";

const COLORS = {
  pending: "#fb923c",
  inprogress: "#3b82f6",
  done: "#10b981",
  canceled: "#ef4444",
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="text-white w-6 h-6" />
    </div>
  </div>
);
export const AdminStatistics = () => {
     const axiosSecure = UseAxiosSecure();

  // Donors
  const { data: donorsData } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors", {
        params: { page: 1, limit: 1000 },
      });
      return res.data.users;
    },
  });

  // Requests
  const { data: requestData } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationrequests/admin", {
        params: { page: 1, limit: 1000 },
      });
      return res.data.requests;
    },
  });

  // Funding
  const { data: fundingData } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fundings/total");
      return res.data;
    },
  });

  const donors = donorsData || [];
  const requests = requestData || [];
  const totalFunding = fundingData?.total || 0;

  // 🔹 Blood group distribution
  const bloodGroupData = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    .map((group) => ({
      name: group,
      count: donors.filter((d) => d.bloodGroup === group).length,
    }))
    .filter((d) => d.count > 0);

  // 🔹 Status distribution
  const statusData = [
    { name: "Pending", value: requests.filter(r => r.status === "pending").length, key: "pending" },
    { name: "In Progress", value: requests.filter(r => r.status === "inprogress").length, key: "inprogress" },
    { name: "Completed", value: requests.filter(r => r.status === "done").length, key: "done" },
    { name: "Canceled", value: requests.filter(r => r.status === "canceled").length, key: "canceled" },
  ].filter(s => s.value > 0);
  return (
   <div className="space-y-8">

      {/* 🔢 Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Donors" value={donors.length} icon={Users} color="bg-blue-500" />
        <StatCard title="Total Funding" value={`৳ ${totalFunding}`} icon={DollarSign} color="bg-emerald-500" />
        <StatCard title="Total Requests" value={requests.length} icon={Droplet} color="bg-rose-500" />
      </div>

      {/* 📊 Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Blood Group Distribution */}
        <motion.div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Blood Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bloodGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#e11d48" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Request Status Distribution */}
        <motion.div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Request Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry) => (
                  <Cell key={entry.key} fill={COLORS[entry.key]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  )
}
