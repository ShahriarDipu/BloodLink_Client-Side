import { Droplet, Plus } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

const LIMIT = 7;

export const MyDonationRequest = () => {
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();
  const { id } = useParams();

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
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/donationrequests/${deleteId}`, {
        params: { email: user.email },
      });
      setDeleteId(null);
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
          {/* Responsive Table Wrapper */}
          <div className="relative -mx-4 sm:mx-0 overflow-x-auto">
  <div className="inline-block min-w-full align-middle">

          <table className=" rounded-xl min-w-[300px] w-full  table-auto">

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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                              <option value="done">✅ Mark as Done</option>
                              <option value="cancel">
                                ❌ Cancel Donation
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
                  className={`px-4 py-2 rounded-xl border ${
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

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default MyDonationRequest;
