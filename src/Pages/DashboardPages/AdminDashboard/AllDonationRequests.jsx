import React, { use, useState } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { Droplet, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { DeleteConfirmModal } from "../DonorDashboard/DeleteConfirmModal";

const ITEMS_PER_PAGE = 5;


export const AllDonationRequests = () => {
  const [deleteId, setDeleteId] = useState(null);

  const { user } = use(AuthContext);

const navigate = useNavigate();

const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null);


  const { data, isLoading } = useQuery({
    queryKey: ["allDonationRequests", statusFilter, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationrequests/admin", {
        params: {
          status: statusFilter,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const requests = data?.requests || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

 
const updateStatusMutation = useMutation({
  mutationFn: ({ id, status }) =>
    axiosSecure.patch(`/donationrequests/admin/status/${id}`, {
      status,
    }),
  onSuccess: () => {
    queryClient.invalidateQueries(["allDonationRequests"]);
    setOpenId(null);
  },
});

const handleDelete = async () => {
  try {
    await axiosSecure.delete(`/donationrequests/${deleteId}`, {
      params: { email: user.email },
    });

    setDeleteId(null);

    queryClient.invalidateQueries([
      "allDonationRequests",
      statusFilter,
      currentPage,
    ]);
  } catch (error) {
    console.error("Delete failed", error);
  }
};

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  inprogress: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};


  return (
    <div>
      
 <div>
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-xl font-semibold">All Donation Requests</h1>
        <Link to="/">
          <button className="text-sm text-gray-500">← Back to Home</button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {/* Filter */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Recipient</th>
              <th className="p-3">Blood</th>
              <th className="p-3">Location</th>
              <th className="p-3">Requester</th>
              <th className="p-3">Donor Name</th>
               <th className="p-3">Donor Email</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="border-t">
                  <td className="p-3 font-medium">{req.recipientName}</td>

                  <td className="p-3">
                    <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs">
                      <Droplet className="inline w-3 h-3" /> {req.bloodGroup}
                    </span>
                  </td>

                  <td className="p-3">
                    {req.upazila}, {req.district}
                  </td>

                  <td className="p-3">{req.requesterName}</td>
                  <td className="p-3">{req.donorName || "-"}</td>
               <td className="p-3">{req.donorEmail || "-"}</td>
                  <td className="p-3">
                <span
  className={`px-3 py-1 rounded-full text-xs font-medium capitalize
    ${statusStyles[req.status] || "bg-gray-100 text-gray-600"}
  `}
>
  {req.status}
</span>

                  </td>

                  
                  <td className="p-3 text-right">
  <select
    defaultValue=""
    onChange={(e) => {
      const action = e.target.value;

      if (action === "view") {
        navigate(`/donorDashboard/viewDetails/${req._id}`);
      }

      if (action === "edit") {
        navigate(`/donorDashboard/editDonationRequest/${req._id}`);
      }

      if (action === "delete") {
   setDeleteId(req._id);
      }

      if (action === "done") {
        updateStatusMutation.mutate({
          id: req._id,
          status: "done",
        });
      }

      if (action === "cancel") {
        updateStatusMutation.mutate({
          id: req._id,
          status: "canceled",
        });
      }

      e.target.value = "";
    }}
    className="appearance-none select w-36"
  >
    <option value="" disabled>Actions</option>

    <option value="view"> View Details</option>
    <option value="edit"> Edit</option>
    <option value="delete"> Delete</option>

    {req.status === "inprogress" && (
      <>
        <option value="done"> Mark Done</option>
        <option value="cancel"> Cancel</option>
      </>
    )}
  </select>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-6">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

<DeleteConfirmModal
  isOpen={!!deleteId}
  onClose={() => setDeleteId(null)}
  onConfirm={handleDelete}
/>



    </div>
  )
}
