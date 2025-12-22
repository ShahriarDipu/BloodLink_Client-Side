import React, { use, useState } from "react";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router";
import {
  Droplet,
  House,
  User,
  Users,
  Menu,
  X,
} from "lucide-react";

export const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  const { data: userData } = useQuery({
    queryKey: ["donorRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/donors/role", {
        params: { email: user.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const firstLetter =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase();

  return (
    <div className="min-h-screen flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white flex items-center px-4 shadow z-50">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-rose-600" />
        </button>
        <h1 className="ml-4 font-semibold text-rose-700">BloodLink</h1>
      </div>

      {/* Overlay (mobile) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full sm:h-auto w-72
        bg-gradient-to-b from-rose-700 to-rose-900 text-white
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Mobile Close */}
        <div className="flex items-center justify-between lg:hidden p-4">
          <span className="font-bold"></span>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-5 mt-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Droplet className="w-6 h-6 text-rose-600" />
          </div>
          <NavLink to="/">
            <h1 className="text-lg font-bold leading-tight">BloodLink</h1>
            <p className="text-xs text-rose-200">Blood Donation</p>
          </NavLink>
        </div>

        {/* User Card */}
        <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3 mb-8 mx-4">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center font-bold">
            {firstLetter}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <span className="text-xs bg-rose-300 text-rose-900 px-2 py-0.5 rounded-full">
              {userData?.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-2">
          <NavLink
            to="/adminDashboard/dashbaord"
            end
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <House className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/adminDashboard/adminprofile"
            onClick={() => setIsSidebarOpen(false)}
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
            to="/adminDashboard/allUsers"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Users className="w-5 h-5" />
            All Users
          </NavLink>

          <NavLink
            to="/adminDashboard/allDonationRequest"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Droplet className="w-5 h-5" />
            All Donation Requests
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 sm:p-6 pt-20 lg:pt-6">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
