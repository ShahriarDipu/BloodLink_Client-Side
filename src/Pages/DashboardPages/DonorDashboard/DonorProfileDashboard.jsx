import { Droplet, MoreVertical, Pencil, Plus, Send, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";

const LIMIT = 4;

export const DonorProfileDashboard = () => {
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();

  const axiosSecure = UseAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/donationrequests/${id}`, {
        params: { email: user.email },
      });

      queryClient.invalidateQueries([
        "myDonationRequests",
        user?.email,
        statusFilter,
        currentPage,
      ]);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

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
      {/* Back */}
      <div className="flex justify-end mb-3">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </Link>
      </div>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-500 to-rose-700 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, {user?.displayName || "User"} 👋
        </h1>
      </motion.div>

      <div className="space-y-6 mt-6">
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

        {requests.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <Droplet className="w-10 h-10 text-rose-500 mb-3" />
            <p className="text-gray-500">
              You haven't created any donation requests yet.
            </p>
          </div>
        ) : (
          <>
            {/* ✅ RESPONSIVE TABLE */}
            <div className="relative -mx-4 sm:mx-0 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-[300px] w-full  rounded-xl table-auto">
                  <thead className="bg-gray-50 text-sm text-gray-600">
                    <tr>
                      <th className="p-3 text-left">Recipient</th>
                      <th className="p-3 text-left hidden md:table-cell">
                        Location
                      </th>
                      <th className="p-3">Blood</th>
                      <th className="p-3 hidden md:table-cell">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 hidden md:table-cell">Type</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((req) => (
                      <tr key={req._id} className="border-t text-sm">
                        <td className="p-3 font-medium">
                          {req.recipientName}
                        </td>

                        <td className="p-3 hidden md:table-cell">
                          {req.district}, {req.upazila}
                        </td>

                        <td className="p-3">{req.bloodGroup}</td>

                        <td className="p-3 hidden md:table-cell">
                          {req.donationDate} {req.donationTime}
                        </td>

                        <td className="p-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {req.status}
                          </span>
                        </td>

                        <td className="p-3 hidden md:table-cell">
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

                        <td className="p-3 text-right">
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              const action = e.target.value;

                              if (action === "edit") {
                                window.location.href = `/donorDashboard/editDonationRequest/${req._id}`;
                              }
                              if (action === "delete") {
                                setDeleteId(req._id);
                              }
                              if (action === "done") {
                                handleStatusChange(req._id, "done");
                              }
                              if (action === "cancel") {
                                handleStatusChange(req._id, "canceled");
                              }
                              if (action === "view") {
                                window.location.href = `/donorDashboard/viewDetails/${req._id}`;
                              }

                              e.target.value = "";
                            }}
                            className="appearance-none select w-36"
                          >
                            <option value="" disabled>
                              Actions
                            </option>
                            <option value="view">View Details</option>
                            <option
                              value="edit"
                              disabled={req.requesterEmail !== user.email}
                            >
                              Edit
                            </option>
                            <option
                              value="delete"
                              disabled={req.requesterEmail !== user.email}
                            >
                              Delete
                            </option>
                            {req.status === "inprogress" &&
                              req.donorEmail === user.email && (
                                <>
                                  <option value="done">Mark as Done</option>
                                  <option value="cancel">
                                    Cancel Donation
                                  </option>
                                </>
                              )}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Link to="/donorDashboard/myDonationRequest">
              <button className="mx-auto h-14 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-xl text-lg flex items-center justify-center gap-2 px-6">
                <Send className="w-5 h-5" />
                View All Donation Requests
              </button>
            </Link>
          </>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h2 className="text-lg font-semibold">
              Delete Donation Request?
            </h2>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
