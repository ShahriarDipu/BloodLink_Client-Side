import React from "react";
import {
  User,
  Mail,
  Droplet,
  MapPin,
  Pencil,
  ShieldCheck,
} from "lucide-react";
const ProfileField = ({ icon, label, value }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 text-sm">
        {value}
      </div>
    </div>
  );
};
export const DonarProfile = () => {
  return (
    <div>
        
         <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </button>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg shadow-rose-100 overflow-hidden">
        
        {/* Top Gradient Section */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-700 p-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-4 border-white flex items-center justify-center text-white text-3xl font-bold">
              S
            </div>

            {/* User Info */}
            <div className="text-white">
              <h2 className="text-xl font-semibold">
                Shahriar Ahmed Dipu
              </h2>
              <p className="text-sm text-rose-100">
                shahriardipu3300@gmail.com
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <span className="flex items-center gap-2 bg-white text-rose-600 px-4 py-2 rounded-xl text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            User
          </span>
        </div>

        {/* Profile Details */}
        <div className="p-8 space-y-6">
          
          {/* Edit Button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 border border-rose-300 text-rose-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-50">
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Field */}
          <ProfileField
            icon={<User className="w-4 h-4" />}
            label="Full Name"
            value="Shahriar Ahmed Dipu"
          />

          <ProfileField
            icon={<Mail className="w-4 h-4" />}
            label="Email Address"
            value="shahriardipu3300@gmail.com"
          />

          <ProfileField
            icon={<Droplet className="w-4 h-4" />}
            label="Blood Group"
            value={<span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-lg text-sm">Not set</span>}
          />

          <ProfileField
            icon={<MapPin className="w-4 h-4" />}
            label="District"
            value="-"
          />

          <ProfileField
            icon={<MapPin className="w-4 h-4" />}
            label="Upazila"
            value="-"
          />
        </div>
      </div>
    </div>


    </div>
  )
}
