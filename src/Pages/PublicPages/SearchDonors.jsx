import React from "react";
import { Droplet, MapPin, Search } from "lucide-react";
import { useLoaderData } from "react-router";
import { useForm, useWatch} from "react-hook-form"
import { option } from "motion/react-client";



const SearchDonors = () => {

  const {districts, upazilas}=useLoaderData()
const { register, control, formState:{errors}}=useForm()

const selectedDistrict = useWatch({
  control,
  name:"district"
})

const filteredUpazilas = upazilas.filter(
  u=>u.district_id===selectedDistrict
);


  return (
    <div className="min-h-11/12 w-full bg-gradient-to-b from-rose-600 to-rose-800 flex flex-col items-center text-white py-20 px-4">

      {/* Top Button */}
      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition px-6 py-2 rounded-full backdrop-blur-lg text-white mb-6">
        <Search className="w-4 h-4" />
        Find Blood Donors
      </button>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-2">Search for Donors</h1>
      <p className="text-center text-white/90 mb-12">
        Find blood donors in your area based on blood group and location
      </p>

      {/* Search Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Blood Group */}
          <div>
            <label className="flex items-center gap-1 text-sm font-semibold mb-1">
              <Droplet className="w-4 h-4 text-rose-600" /> Blood Group
            </label>
            <select className="select w-full  font-light border border-rose-200 rounded-lg bg-gray-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none">
              <option>Select blood group</option>
              <option>A+</option>
              <option>A−</option>
              <option>B+</option>
              <option>B−</option>
              <option>AB+</option>
              <option>AB−</option>
              <option>O+</option>
              <option>O−</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="flex items-center gap-1 text-sm font-semibold mb-1">
              <MapPin className="w-4 h-4 text-rose-600" /> District
            </label>
            <select 
              {...register("district")}
            className="select w-full border border-rose-200 font-light  px-3 py-2 rounded-lg bg-gray-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none">
             <option value="">Select first</option>
              {
                districts.map((d)=>(
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>))
                  }
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="flex items-center gap-1 text-sm font-semibold mb-1">
              <MapPin className="w-4 h-4 text-rose-600" /> Upazila
            </label>
            <select 
             {...register("upazila")}
            
            className="select w-full border border-rose-200  rounded-lg bg-gray-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none font-light">
              <option value="">{
                selectedDistrict ? "Select Upazila" : "Select district first"
                }</option>
              {
                filteredUpazilas.map((u)=>(
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold">
              <Search className="w-5 h-5" /> Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
