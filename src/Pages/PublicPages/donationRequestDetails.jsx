import React, { use } from 'react'
import { Link, useParams } from 'react-router'
import { UseAxiosSecure } from '../../Hooks/UseAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft, Droplet, MapPin, Calendar, Clock, Mail,
  User, Heart, FileText, CheckCircle,
  Building
} from "lucide-react";
import { AuthContext } from '../../Context/AuthContext';

export const donationRequestDetails = () => {
    const {id}=useParams();
   const { user} = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
const queryClient = useQueryClient();

  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donating, setDonating] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);


  // 🔹 Fetch request by ID
  const { data: request, isLoading, error } = useQuery({
    queryKey: ["donationRequest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${id}`);
      return res.data;
    },
  });

  const handleDonate = async () => {
  setDonating(true);
  setHasDonated(true); 
  try {
    await axiosSecure.put(`/donationRequests/${id}`, {
      status: "inprogress",
      donorName: user.displayName,
      donorEmail: user.email,
    });

  
    await queryClient.invalidateQueries(["donationRequest", id]);

    setDonateModalOpen(false);
  } catch (err) {
    console.error(err);
    setHasDonated(false); 
    alert("Failed to confirm donation");
  } finally {
    setDonating(false);
  }
};


  if (isLoading) {
    return <div className="text-center py-20">Loading request details…</div>;
  }

  if (error || !request) {
    return <div className="text-center py-20">Request not found</div>;
  }
  return (
    <div>
       <div className="min-h-screen bg-gray-50 pt-16 pb-12">

<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

    {/* Back Button */}
    <Link
      to="/donationRequests"
      className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 mb-6"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Donation Requests
    </Link>

    {/* Main Card */}
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-700 p-8 text-white relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span
              className={`inline-block px-3 py-1 border  rounded-full text-sm font-medium mb-3 `}
            >
              {request.status}
            </span>

            <h1 className="text-3xl font-bold mb-2">
              Blood Donation Request
            </h1>
            <p className="text-rose-100">
              For {request.recipientName}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Droplet className="w-10 h-10 mx-auto mb-2" />
            <span className="text-4xl font-bold">
              {request.bloodGroup}
            </span>
            <p className="text-sm text-rose-100 mt-1">
              Blood Group
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Recipient Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-rose-500" />
                Recipient Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{request.recipientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      {request.district}, {request.upazila}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-rose-500" />
                Hospital Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Hospital</p>
                    <p className="font-medium">{request.hospitalName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">  {request.district}, {request.upazila}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                Donation Schedule
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                       {new Date(request.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">
                
                <strong>Time:</strong>{" "}
  {new Date(request.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}


                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requester Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-rose-500" />
                Requester Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Requested By</p>
                    <p className="font-medium">{request.
requesterName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{request.
requesterEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-500" />
            Request Message
          </h3>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-700 whitespace-pre-wrap">
              {request.message}
            </p>
          </div>
        </div>

        {/* Donate Button */}
    {request.status === "pending" && !hasDonated && (
  <div className="mt-8">
    <button
      onClick={() => setDonateModalOpen(true)}
      disabled={donating}
      className="w-full h-14 flex items-center justify-center gap-2
      bg-gradient-to-r from-rose-500 to-rose-700
      disabled:opacity-50 disabled:cursor-not-allowed
      text-white text-lg rounded-xl"
    >
      <Heart className="w-5 h-5" />
      {donating ? "Processing..." : "I Want to Donate"}
    </button>
  </div>
)}

      </div>
    </div>
  </motion.div>
</div>


      {/* Modal */}
      {donateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="text-rose-500" />
              Confirm Donation
            </h2>

            <p className="mb-6 text-gray-600">
              You are about to confirm your intent to donate blood.
            </p>

           <div className="flex justify-end gap-3">
  <button
    onClick={() => setDonateModalOpen(false)}
    className="px-4 py-2 border rounded-lg"
  >
    Cancel
  </button>

  <button
    onClick={handleDonate}
    disabled={donating}
    className="px-4 py-2 bg-rose-600 text-white rounded-lg
    disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {donating ? "Confirming..." : "Confirm Donation"}
  </button>
</div>

          </div>
        </div>
      )}
    </div>


    </div>
  )
}
