import React, { use, useState } from "react";
import {
  User,
  Mail,
  Droplet,
  MapPin,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import { useLoaderData } from "react-router";
import { useForm ,useWatch} from "react-hook-form";


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
    const [open, setOpen] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  bloodGroup: "",
  district: "",
  upazila: "",
});



const { control, register, setValue } = useForm({
  defaultValues: {
    district: "",
    upazila: "",
  },
});

const selectedDistrict = useWatch({
  control,
  name: "district",
});







 const axiosSecure = UseAxiosSecure();
 const {user, loading}=use(AuthContext,)
const {
    data: donor,
    isLoading,
    error,
     refetch,
  } = useQuery({
    queryKey: ["donor", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/donors/by-email", {
        params: { email: user.email },
      });
          console.log(res.data)
      return res.data;
  
    },
  });

  if (loading || isLoading) {
    return <div>Loading donor info...</div>;
  }

  if (error) {
    return <div>Failed to load donor data</div>;
  }




  //location loader
  const { districts, upazilas } = useLoaderData();
  console.log(districts)
  const filteredUpazilas = upazilas.filter(
  (u) => u.district_id === selectedDistrict
);







//update donnar profile to database


const handleSaveChanges = async () => {
  try {
    // convert district id → name
    const districtName =
      districts.find(d => d.id === selectedDistrict)?.name || donor.district;

    // convert upazila id → name
    const upazilaName =
      upazilas.find(u => u.id === formData.upazila)?.name || donor.upazila;

    const updatedDonor = {
      fullName: formData.fullName || donor.fullName,
      bloodGroup: formData.bloodGroup || donor.bloodGroup,
      district: districtName,
      upazila: upazilaName,
    };

    await axiosSecure.patch(
      `/donors/update/${user.email}`,
      updatedDonor
    );

    refetch();
    setOpen(false);

  } catch (error) {
    console.error("Update failed", error);
  }
};


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
           {donor?.fullName}
              </h2>
              <p className="text-sm text-rose-100">
               {donor?.email}
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <span className="flex items-center gap-2 bg-white text-rose-600 px-4 py-2 rounded-xl text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            {donor?.role}
          </span>
        </div>

        {/* Profile Details */}
        <div className="p-8 space-y-6">
          
          {/* Edit Button */}
        <div className="flex justify-end gap-3">
  {!open ? (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 border border-rose-300 text-rose-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-50"
    >
      <Pencil className="w-4 h-4" />
      Edit Profile
    </button>
  ) : (
    <>
      <button
        onClick={() => {
          setOpen(false);
          setFormData({
            fullName: donor.fullName,
            bloodGroup: donor.bloodGroup,
            district: donor.district,
            upazila: donor.upazila,
          });
        }}
        className="px-4 py-2 rounded-xl border"
      >
        Cancel
      </button>

      <button
  onClick={handleSaveChanges}
  className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-xl"
>
  Save Changes
</button>

    </>
  )}
</div>


          {/* Field */}
         <div className="space-y-2">
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <User className="w-4 h-4" />
    <span className="font-medium">Full Name</span>
  </div>

  {open ? (
    <input
    placeholder= {donor?.fullName}
      value={formData.fullName}
      onChange={(e) =>
        setFormData({ ...formData, fullName: e.target.value })
      }
      className="h-12 w-full rounded-xl border p-2 border-rose-400"
    />
  ) : (
    <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 text-sm">
      {donor?.fullName}
    </div>
  )}
</div>


          <ProfileField
            icon={<Mail className="w-4 h-4" />}
            label="Email Address"
            value={donor?.email}
          />

      <div className="space-y-2">
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <Droplet className="w-4 h-4" />
    <span className="font-medium">Blood Group</span>
  </div>

  {open ? (
    <select
      value={formData.bloodGroup}
      onChange={(e) =>
        setFormData({ ...formData, bloodGroup: e.target.value })
      }
      className="w-full h-12 rounded-xl border px-4"
    >
      <option value="">Select blood group</option>
      <option value="A+">A+</option>
      <option value="B+">B+</option>
      <option value="O+">O+</option>
    </select>
  ) : (
    <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-800 text-sm">
      {donor?.bloodGroup}
    </div>
  )}
</div>


       <div className="space-y-2">
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <MapPin className="w-4 h-4" />
    <span className="font-medium">District</span>
  </div>

  {open ? (
    <select
      {...register("district")}
      onChange={(e) => {
        setValue("district", e.target.value);
        setValue("upazila", ""); // reset upazila
      }}
      className="w-full h-12 rounded-xl border px-4"
    >
      <option value="">Select district</option>
      {districts.map((d) => (
        <option key={d.id} value={d.id}>
          {d.name}
        </option>
      ))}
    </select>
  ) : (
    <div className="bg-gray-50 rounded-xl px-4 py-3">
      {donor?.district}
    </div>
  )}
</div>

          <div className="space-y-2">
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <MapPin className="w-4 h-4" />
    <span className="font-medium">Upazila</span>
  </div>

  {open ? (
    <select
{...register("upazila")}
  disabled={!selectedDistrict}
  onChange={(e) => {
    setValue("upazila", e.target.value);
    setFormData({ ...formData, upazila: e.target.value });
  }}
  className="w-full h-12 rounded-xl border px-4"
    >
      <option value="">Select upazila</option>
      {filteredUpazilas.map((u) => (
        <option key={u.name} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  ) : (
    <div className="bg-gray-50 rounded-xl px-4 py-3">
      {donor?.upazila}
    </div>
  )}
</div>

        </div>
      </div>
    </div>


    </div>
  )
}
