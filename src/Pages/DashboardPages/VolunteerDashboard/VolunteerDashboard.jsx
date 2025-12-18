import React, { use } from 'react'
import { useQuery } from '@tanstack/react-query';
import { NavLink, Outlet } from 'react-router';
import { ChartBar, DollarSign, Droplet, House, LogOut, Plus, User, User2, Users } from 'lucide-react';
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';

export const VolunteerDashboard = () => {
    const axiosSecure = UseAxiosSecure()  
      const {user}= use(AuthContext)
    
    
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
        const firstLetter =
      user?.displayName?.charAt(0)?.toUpperCase() ||
      user?.email?.charAt(0)?.toUpperCase();
  return (
    <div>
 <div>

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
            to="/volunteerDashboard/volunteerWelcomePage"
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
            to="/volunteerDashboard/volunteerProfile"
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
            to="/volunteerDashboard/allBloodDonationRequest"
         
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-rose-700 font-semibold"
                  : "hover:bg-white/10"
              }`
            }





          >
            <Droplet className="w-5 h-5" />
            All Blood Donation Requests
          </NavLink>

       
          <NavLink
            to="/volunteerDashboard/volunteerFunding"
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



    </div>



    </div>
  )
}
