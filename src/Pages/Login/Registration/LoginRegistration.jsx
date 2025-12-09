import { Droplet } from "lucide-react";
import React, { useState } from "react";

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState("login");

  // sample district/upazila (replace later)
  const districts = ["Dhaka", "Chattogram", "Rajshahi"];
  const upazilas = {
    Dhaka: ["Dhanmondi", "Mirpur", "Gulshan"],
    Chattogram: ["Pahartali", "Kotwali"],
    Rajshahi: ["Boalia", "Motihar"],
  };

  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div className="min-h-screen w-full flex">
      {/* ================= LEFT RED HERO SIDE ================= */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-b from-rose-700 to-rose-900 text-white items-center justify-center relative overflow-hidden">

        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-56 h-56 rounded-full border border-white/20 animate-pulse"></div>

        {/* Center content */}
        <div className="text-center px-10">
          <div ><Droplet className="w-16 h-16  rounded-full mx-auto mb-6"></Droplet></div>

          <h2 className="text-4xl font-bold mb-4">Become a Donor</h2>

          <p className="text-lg text-white/90 max-w-md">
            Register today and join thousands of life-savers.  
            Your contribution makes a difference.
          </p>
        </div>
      </div>

      {/* ================= RIGHT FORM SIDE ================= */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-rose-500 to-rose-800 bg-clip-text text-transparent">
            Welcome to BloodLink
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login or create an account to continue
          </p>

          {/* Tabs */}
          <div className="flex mb-6 rounded-xl overflow-hidden ">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 font-light ${
                activeTab === "login"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 font-light ${
                activeTab === "register"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* ================ LOGIN FORM ================ */}
          {activeTab === "login" && (
            <form>
              <div className="mb-4">
                <label className="block mb-1 font-light">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full border border-rose-100 px-3 py-2 rounded-lg bg-gray-50 
                  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-light">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-rose-100 px-3 py-2 rounded-lg bg-gray-50
                  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-1 font-light">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full border border-rose-100 px-3 py-2 rounded-lg bg-gray-50
                  focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-semibold"
              >
                Login
              </button>
            </form>
          )}

          {/* ================ REGISTER FORM ================ */}
          {activeTab === "register" && (
           <form className="space-y-5">

  {/* Full Name */}
  <div>
    <label className="block mb-1 font-light">Full Name</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5z" />
        </svg>
      </span>

      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>

  {/* Email */}
  <div>
    <label className="block mb-1 font-light">Email Address</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </span>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>

  {/* Avatar URL */}
  <div>
    <label className="block mb-1 font-light">Avatar URL (Optional)</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 3h18v18H3z" />
          <circle cx="8" cy="8" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </span>

      <input
        type="url"
        placeholder="https://example.com/avatar.jpg"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>

  {/* Blood Group */}
  <div>
    <label className="block mb-1 font-light">Blood Group</label>
    <select
      className="w-full border font-light border-rose-100 px-3 py-3 rounded-xl bg-white
      focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
    >
      <option>Select blood group</option>
      <option>A+</option><option>A−</option>
      <option>B+</option><option>B−</option>
      <option>AB+</option><option>AB−</option>
      <option>O+</option><option>O−</option>
    </select>
  </div>

  {/* District + Upazila */}
  <div className="grid grid-cols-2 gap-4">
    {/* District */}
    <div>
      <label className="block mb-1 font-light">District</label>
      <select
        className="w-full border font-light border-rose-100 px-3 py-3 rounded-xl bg-white
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option>Select district</option>
        {districts.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    </div>

    {/* Upazila */}
    <div>
      <label className="block mb-1 font-light">Upazila</label>
      <select
        disabled={!selectedDistrict}
        className={`w-full px-3 py-3 rounded-xl outline-none font-light
        ${
          selectedDistrict
            ? "border border-rose-100 bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            : "bg-gray-200 border-gray-300 "
        }`}
      >
        <option >Select upazila</option>
        {selectedDistrict &&
          upazilas[selectedDistrict]?.map((u) => (
            <option key={u}>{u}</option>
          ))}
      </select>
    </div>
  </div>

  {/* Password */}
  <div>
    <label className="block mb-1 font-light">Password</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
          <path d="M19 11V7a7 7 0 10-14 0v4H5v10h14V11z" />
        </svg>
      </span>

      <input
        type="password"
        placeholder="Create a password"
        className="w-full border border-rose-100 pl-10 pr-3 py-3 rounded-xl bg-gray-50
        focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
      />
    </div>
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block mb-1 font-light">Confirm Password</label>
    <input
      type="password"
      placeholder="Confirm your password"
      className="w-full border border-rose-100 px-3 py-3 rounded-xl bg-gray-50
      focus:border-rose-300 focus:ring-2 focus:ring-rose-200 outline-none"
    />
  </div>

  {/* Submit Button */}
  <button
    type="button"
    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl text-lg font-semibold"
  >
    Create Account
  </button>
</form>

          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
