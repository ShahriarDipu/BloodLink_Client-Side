import React, { use } from "react";
import { Link, Outlet, NavLink } from "react-router";
import {
  Droplet,
  House,
  Plus,
  User,
  LogOut,
  DollarSign,
} from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";


export const DonorDashboard = () => {
  const axiosSecure = UseAxiosSecure()  
  const {user}= use(AuthContext)
const firstLetter = user?.displayName?.[0]?.toUpperCase() || "?";

const { data: userData, isLoading } = useQuery({
  queryKey: ["donorRole", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get("/donors/role", {
      params: { email: user.email }
    });

    console.log("Role from DB:", res.data.role);
    return res.data;
  },
  enabled: !!user?.email,
});



  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-rose-700 to-rose-900 text-white flex flex-col px-5 py-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Droplet className="w-6 h-6 text-rose-600" />
          </div>
          <NavLink to="/">
            <h1 className="text-lg font-bold leading-tight">BloodLink</h1>
            <p className="text-xs text-rose-200">Blood Donation</p>
          </NavLink>
        </div>

        {/* User Card */}
        <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center font-bold">
            {firstLetter}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <span className="text-xs bg-rose-300 text-rose-900 px-2 py-0.5 rounded-full">
            { userData?.role}

            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/donorDashboard/donorProfileDashboard"
            end
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <House className="w-5 h-5" />
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/donorDashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }

          >
            <User className="w-5 h-5" />
            Profile
          </NavLink>

          <NavLink
            to="/donorDashboard/myDonationRequest"
         
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }





          >
            <Droplet className="w-5 h-5" />
            My Donation Requests
          </NavLink>

          <NavLink
            to="/donorDashboard/createDonationRequest"
                       className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
            



          >
            <Plus className="w-5 h-5" />
            Create Request
          </NavLink>

          <NavLink
            to="/donorDashboard/donorFunding"
             className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }




          >
            <DollarSign className="w-5 h-5" />
            Funding
          </NavLink>
        </nav>

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 mt-6">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};
