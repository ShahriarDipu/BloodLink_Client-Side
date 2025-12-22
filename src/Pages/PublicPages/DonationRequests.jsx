import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Calendar, Clock, Eye, Heart, MapPin } from 'lucide-react'
import { UseAxiosSecure } from '../../Hooks/UseAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { Footer } from '../HomePage/NavbarFooterSection/Footer'
import { Navbar } from '../Navbar/Navbar'
export const DonationRequests = () => {

const axiosSecure =UseAxiosSecure();
const LIMIT = 9;
const [currentPage, setCurrentPage] = useState(1);


const { data, isLoading } = useQuery({
  queryKey: ["pendingDonationRequests", currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get("/donationrequests/pending", {
      params: {
        page: currentPage,
        limit: LIMIT,
      },
    });
    return res.data;
  },
  keepPreviousData: true, 
});

const pendingRequests = data?.requests || [];
const totalPages = data?.totalPages || 0;


  return (
   
    <div>
       <Navbar></Navbar>
        <section className="bg-gradient-to-br from-rose-600 to-rose-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Help Save Lives</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Blood Donation Requests
            </h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              People in need of blood are waiting for your help. Browse through the requests and become a life saver.
            </p>
          </motion.div>
        </div>
      </section>

<div className="max-w-15/17 mx-auto px-4 py-12">
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-2xl font-bold text-gray-900">
      {pendingRequests.length} Pending Request
      {pendingRequests.length > 1 ? "s" : ""}
    </h2>

    <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium">
      <Clock className="w-4 h-4" />
      Urgent Help Needed
    </span>
  </div>

  {/* Cards */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {pendingRequests.map((request, index) => (
      <motion.div
        key={request._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl group bg-white">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-rose-500 to-rose-700" />

          <div className="p-6">
            {/* Title + Blood Group */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.recipientName}
                </h3>
                <p className="text-sm text-gray-500">
                  Needs blood urgently
                </p>
              </div>

              <span className="bg-gradient-to-br from-rose-500 to-rose-700 text-white text-lg px-4 py-2 rounded-lg font-bold">
                {request.bloodGroup}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>
                  {request.hospitalAddress}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>{request.donationDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>{request.donationTime}</span>
              </div>
            </div>

            {/* Action Button */}
            <Link to={`/donationRequestDetails/${request._id}`}>
              <button className="w-full flex items-center justify-center bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white py-2 rounded-lg font-medium transition-all group-hover:shadow-lg">
                <Eye className="w-4 h-4 mr-2" />
                View Details
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Empty State */}
  {!isLoading && pendingRequests.length === 0 && (
    <p className="text-center text-gray-500 mt-10">
      No pending donation requests found.
    </p>
  )}
</div>



      <div className="flex gap-2 mt-4 justify-center mb-10 ">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="btn"
  >
    Prev
  </button>

  {[...Array(totalPages).keys()].map((i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`btn ${currentPage === i + 1 ? "btn bg-rose-600" : ""}`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="btn"
  >
    Next
  </button>
</div>
<Footer></Footer>
    </div>
   
  )
}
