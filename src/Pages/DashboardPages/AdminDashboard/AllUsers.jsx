import { Droplet, User2, UserRoundX, Users } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MoreVertical,
  ShieldOff,
  Shield,
  UserCog,
  UserCheck
} from "lucide-react";

export const AllUsers = () => {
    const dropdownRef = useRef(null);

    const [openId, setOpenId] = useState(null);
    const axiosSecure = UseAxiosSecure();
    
    const ITEMS_PER_PAGE = 5;
    const [statusFilter, setStatusFilter] = React.useState("all");
const [currentPage, setCurrentPage] = React.useState(1);


const { data, isLoading } = useQuery({
  queryKey: ["users", statusFilter, currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get("/donors", {
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
const users = data?.users || [];
const total = data?.total || 0;
const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setOpenId(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

//patch user status

const queryClient = useQueryClient()
const  updateStatusMutation = useMutation({
    mutationFn:async({id , status})=>{
        return axiosSecure.patch(`/donors/status/${id}`,{status})
    },
     onSuccess: () => {
    queryClient.invalidateQueries(["users"]);
    setOpenId(null);
  },
})



const updateRoleMutation = useMutation({
  mutationFn: async ({ id, role }) => {
    return axiosSecure.patch(`/donors/role/${id}`, { role });
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["users"]);
    setOpenId(null);
  },
});



  return (

  
    <div >
<div className="flex mb-10 items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">All Users</h1>
        <Link to='/'>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </button>
        </Link>
      </div>



<div className="space-y-6">

  {/* Header */}
  <div className="bg-white rounded-xl shadow-xl shadow-rose-100 p-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
      <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
        <span className="text-rose-500"><Users></Users></span>
        All Users
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Filter:</span>
        <select
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }}
  className="border rounded-lg px-3 py-2 text-sm w-40"
>
  <option value="all">All Status</option>
  <option value="active">Active</option>
  <option value="blocked">Blocked</option>
</select>

        </div>

        {/* <button className="border rounded-lg px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100">
          🔄 Refresh
        </button> */}
      </div>
    </div>
{/* ================= MOBILE CARDS ================= */}
<div className="space-y-4 md:hidden">
  {isLoading ? (
    <div className="text-center py-10 text-gray-500">
      Loading users...
    </div>
  ) : users.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      No users found
    </div>
  ) : (
    users.map((user) => (
      <div
        key={user._id}
        className="bg-white rounded-xl shadow-md p-4 space-y-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-100 overflow-hidden flex items-center justify-center">
              {user.profileUrl ? (
                <img
                  src={user.profileUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User2 className="text-rose-600" />
              )}
            </div>
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.status === "blocked"
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {user.status}
          </span>
        </div>

        {/* Info */}
        <div className="text-sm space-y-1">
          <p>
            <strong>Blood Group:</strong>{" "}
            {user.bloodGroup || "-"}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {user.upazila && user.district
              ? `${user.upazila}, ${user.district}`
              : "-"}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {user.role}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-3">
          {user.status !== "blocked" ? (
            <button
              onClick={() =>
                updateStatusMutation.mutate({
                  id: user._id,
                  status: "blocked",
                })
              }
              className="bg-red-600 text-white py-2 rounded-lg text-sm"
            >
              Block
            </button>
          ) : (
            <button
              onClick={() =>
                updateStatusMutation.mutate({
                  id: user._id,
                  status: "active",
                })
              }
              className="bg-emerald-600 text-white py-2 rounded-lg text-sm"
            >
              Unblock
            </button>
          )}

          {user.role !== "admin" ? (
            <button
              onClick={() =>
                updateRoleMutation.mutate({
                  id: user._id,
                  role: "admin",
                })
              }
              className="bg-amber-600 text-white py-2 rounded-lg text-sm"
            >
              Make Admin
            </button>
          ) : (
            <button
              onClick={() =>
                updateRoleMutation.mutate({
                  id: user._id,
                  role: "donor",
                })
              }
              className="bg-gray-700 text-white py-2 rounded-lg text-sm"
            >
              Remove Admin
            </button>
          )}

          {user.role !== "volunteer" ? (
            <button
              onClick={() =>
                updateRoleMutation.mutate({
                  id: user._id,
                  role: "volunteer",
                })
              }
              className="bg-blue-600 text-white py-2 rounded-lg text-sm col-span-2"
            >
              Make Volunteer
            </button>
          ) : (
            <button
              onClick={() =>
                updateRoleMutation.mutate({
                  id: user._id,
                  role: "donor",
                })
              }
              className="bg-gray-600 text-white py-2 rounded-lg text-sm col-span-2"
            >
              Remove Volunteer
            </button>
          )}
        </div>
      </div>
    ))
  )}
</div>

    {/* Table */}
    <div className="relative mt-6 hidden md:block">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Blood Group</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
<tbody>
  {isLoading ? (
    <tr>
      <td colSpan="7" className="p-6 text-center text-gray-500">
        Loading users...
      </td>
    </tr>
  ) : users.length === 0 ? (
    <tr>
      <td colSpan="7" className="p-6 text-center text-gray-500">
        No users found
      </td>
    </tr>
  ) : (
    users.map((user) => (
      <tr key={user._id} className="border-t">
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
            <img src=  {user.profileUrl} alt="Profile Photo" />
            </div>
            <span className="font-medium">{user.fullName}</span>
          </div>
        </td>

        <td className="p-4 text-gray-600">{user.email}</td>

        <td className="p-4">
          {user.bloodGroup ? (
            <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">
              <Droplet></Droplet> {user.bloodGroup}
            </span>
          ) : (
            "-"
          )}
        </td>

        <td className="p-4 text-gray-600">
          {user.upazila && user.district
            ? `${user.upazila}, ${user.district}`
            : "-"}
        </td>

        <td className="p-4">
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            {user.role}
          </span>
        </td>
 <td className="p-4">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              user.status === "blocked"
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {user.status}
          </span>
        </td>

       <td className="p-4 text-right ">
<button
  onClick={() => setOpenId(openId === user._id ? null : user._id)}
  className="p-2 rounded-lg hover:bg-gray-100"
>
  <MoreVertical className="w-5 h-5" />
</button>


  {openId === user._id && (
    
    <div  ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white  rounded-sm shadow-lg z-50">
      
    
{user.status !== "blocked" ? (
  <button
    onClick={() =>
      updateStatusMutation.mutate({
        id: user._id,
        status: "blocked",
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <ShieldOff className="w-4 h-4 text-rose-600" />
    Block User
  </button>
) : (
  <button
    onClick={() =>
      updateStatusMutation.mutate({
        id: user._id,
        status: "active",
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <Shield className="w-4 h-4 text-emerald-600" />
    Unblock User
  </button>
)}



{/* ADMIN ROLE TOGGLE */}
{user.role !== "admin" ? (
  <button
    disabled={updateRoleMutation.isLoading}
    onClick={() =>
      updateRoleMutation.mutate({
        id: user._id,
        role: "admin",
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <UserCog className="w-4 h-4 text-amber-600" />
    Make Admin
  </button>
) : (
  <button
    disabled={updateRoleMutation.isLoading}
    onClick={() =>
      updateRoleMutation.mutate({
        id: user._id,
        role: "donor", // or "volunteer" if you prefer
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <User2 className="w-4 h-4 text-gray-600" />
    Remove Admin
  </button>
)}

{user.role !== "volunteer" ? (
  <button
    disabled={updateRoleMutation.isLoading}
    onClick={() =>
      updateRoleMutation.mutate({
        id: user._id,
        role: "volunteer",
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <UserCog className="w-4 h-4 text-amber-600" />
    Make Volunteer
  </button>
) : (
  <button
    disabled={updateRoleMutation.isLoading}
    onClick={() =>
      updateRoleMutation.mutate({
        id: user._id,
        role: "donor", // or "volunteer" if you prefer
      })
    }
    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
  >
    <User2 className="w-4 h-4 text-gray-600" />
    Remove Volunteer
  </button>
)}
    </div>
  )}
</td>

      </tr>
    ))
  )}
</tbody>

      </table>
    </div>

    {/* Pagination */}
 {totalPages > 1 && (
  <div className="flex items-center justify-between mt-6 pt-6 border-t">
    <p className="text-sm text-gray-500">
      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
      {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} users
    </p>

    <div className="flex gap-2">
      <button
        className="border rounded-lg px-3 py-1 text-sm disabled:opacity-50"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 text-sm rounded-lg border ${
            currentPage === i + 1
              ? "bg-rose-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="border rounded-lg px-3 py-1 text-sm disabled:opacity-50"
        onClick={() =>
          setCurrentPage((p) => Math.min(totalPages, p + 1))
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
)}


  </div>
</div>




    </div>
  )
}
