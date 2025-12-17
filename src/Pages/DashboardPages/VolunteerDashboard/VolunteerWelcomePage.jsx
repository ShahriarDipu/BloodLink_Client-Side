import React from 'react'
import { Droplet, MoreVertical, Pencil, Plus, Send, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { motion } from 'framer-motion';

const LIMIT = 4;
export const VolunteerWelcomePage = () => {
    const queryClient = useQueryClient();

  const axiosSecure = UseAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [openMenuId, setOpenMenuId] = useState(null);


  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 React Query (ALWAYS RUNS)
  const { data, isLoading } = useQuery({
    queryKey: ["myDonationRequests", user?.email, statusFilter, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/donationrequests", {
        params: {
          email: user.email,
          status: statusFilter,
          page: currentPage,
          limit: LIMIT,
        },
      });
      return res.data;
    },
  });

  const requests = data?.requests ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this donation request?"
  );

  if (!confirmDelete) return;

  try {
    await axiosSecure.delete(`/donationrequests/${id}`);

    queryClient.invalidateQueries([
      "myDonationRequests",
      user?.email,
      statusFilter,
      currentPage,
    ]);
  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete request");
  }
};

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // 🔹 Safe loading return (after hooks)
  if (loading || isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleStatusChange = async (id, newStatus) => {
  try {
    await axiosSecure.patch(`/donationrequests/status/${id}`, {
      status: newStatus,
      email: user.email,
    });

    queryClient.invalidateQueries([
      "myDonationRequests",
      user?.email,
      statusFilter,
      currentPage,
    ]);
  } catch (error) {
    console.error("Status update failed", error);
    alert("Failed to update status");
  }
};

  return (
    <div>

 {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-500 to-rose-700 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?. displayName || 'User'}! 👋
          </h1>
          <p className="text-rose-100 text-lg">
            {/* {isAdmin ? "Manage your blood donation platform from here." :
             isVolunteer ? "Help coordinate blood donation requests." :
             "Thank you for being a life saver. Your contributions matter."} */}
          </p>
        </div>
      </motion.div>


      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
        
        </h1>

  
      </div>

      {/* Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-xl px-4 py-2 w-44 text-sm"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      {/* Content */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
            <Droplet className="w-8 h-8 text-rose-500" />
          </div>
          <p className="text-gray-500">
            You haven't created any donation requests yet.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="p-3 text-left">Recipient</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3">Blood</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Type</th>
                  {/* <th className="p-3 text-right">Actions</th> */}

                </tr>
              </thead>

    <tbody>
  {requests.map((req) => (
    <tr key={req._id} className="border-t text-sm">
      <td className="p-3 font-medium">{req.recipientName}</td>

      <td className="p-3">
        {req.district}, {req.upazila}
      </td>

      <td className="p-3">{req.bloodGroup}</td>

      <td className="p-3">
        {req.donationDate} {req.donationTime}
      </td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              req.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : req.status === "inprogress"
                ? "bg-blue-100 text-blue-700"
                : req.status === "done"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {req.status}
        </span>
      </td>

      {/* Type */}
      <td className="p-3">
        {req.requesterEmail === user.email ? (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            Created by me
          </span>
        ) : (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Donated by me
          </span>
        )}
      </td>

      {/* Actions */}
   
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Pagination */}
         <Link to="/donorDashboard/myDonationRequest">
         <button
            
                className="w-90 mx-auto h-14 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-xl text-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                View All Donation Requests
              </button>
      </Link>
        </>
      )}
    </div>
  
    </div>
  )
}
