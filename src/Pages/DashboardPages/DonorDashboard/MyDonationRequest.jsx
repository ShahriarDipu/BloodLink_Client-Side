import { Droplet, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";

const LIMIT = 5;

export const MyDonationRequest = () => {
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

  const handleDelete =(data)=>{
    console.log(data)
  }
  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // 🔹 Safe loading return (after hooks)
  if (loading || isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          My Donation Requests
        </h1>

        <Link to="/donorDashboard/createDonationRequest">
          <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </Link>
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
                  <th className="p-3 text-right">Actions</th>

                </tr>
              </thead>

            <tbody>
  {requests.map((req) => (
    <tr key={req._id} className="border-t text-sm relative">
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

      {/* 🔹 Actions */}
      <td className="p-3 text-right relative">
        <button
          onClick={() =>
            setOpenMenuId(openMenuId === req._id ? null : req._id)
          }
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Dropdown */}
        {openMenuId === req._id && (
          <div className="absolute right-3 top-10 w-36 bg-white  rounded-xl shadow-lg z-10">
            <Link
              to={`/donorDashboard/editDonationRequest/${req._id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm hover:bg-gray-100"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>

            <button
              onClick={() => handleDelete(req._id)
        
                
              }

              className="flex items-center gap-2 w-full px-4 rounded-sm py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 rounded-xl border disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages).keys()].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-xl border
                    ${
                      currentPage === i + 1
                        ? "bg-rose-500 text-white"
                        : "bg-white"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 rounded-xl border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyDonationRequest;
