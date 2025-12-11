import React, { useState } from "react";
import { Droplet, MapPin, Search } from "lucide-react";
import { useLoaderData } from "react-router";
import { useForm, useWatch} from "react-hook-form"
import { option } from "motion/react-client";
import { UseAxiosSecure } from "../../Hooks/UseAxiosSecure";



const SearchDonors = () => {

  const [searchResult, setResults] =useState([])
const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false); 


  const axiosSecure = UseAxiosSecure();

  const {districts, upazilas}=useLoaderData()
const { register,handleSubmit, control, formState:{errors}}=useForm()

const selectedDistrict = useWatch({
  control,
  name:"district"
})

const filteredUpazilas = upazilas.filter(
  u=>u.district_id===selectedDistrict
);

const handleSearch= (data)=>{
    setLoading(true);
  setSearched(true);
 
  const districtName = districts.find(d=>d.id === data.district)?.name 
  const upazilaName =upazilas.find(u=>u.id===data.upazila)?.name


  const searchInfo={
    bloodGroup:data.bloodGroup,
    district:districtName,
    upazila:upazilaName
  }
   axiosSecure.get("/donors/search", { params: searchInfo })
    .then(res => {
      setTimeout(() => {
        setResults(res.data);
        setLoading(false);
      }, 500);
    })
    .catch(error => console.log(error));
  
}


  return (
  <div>
    <form onSubmit={handleSubmit(handleSearch)}>
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
            <select {...register("bloodGroup")} className="select w-full  font-light border border-rose-200 rounded-lg bg-gray-50 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none">
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
            <button type="submit" className="w-full btn bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold">
              <Search className="w-5 h-5" /> Search
            </button>
          </div>

        </div>
      </div>
    </div>
    </form>
    {/* Loading State */}
{loading && (
  <div className="flex flex-col items-center py-20 text-gray-600">
    <span className="loading loading-spinner loading-lg text-rose-600"></span>
    <p className="mt-4 text-lg font-medium">Searching donors...</p>
  </div>
)}
{!loading && searched && searchResult.length === 0 && (
  <div className="flex flex-col items-center py-20 text-gray-600">
    <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-4">
      <span className="text-4xl text-rose-600">👤</span>
    </div>
    <h2 className="text-xl font-bold">No Donors Found</h2>
    <p className="text-gray-500">
      No donors match your search criteria. Try adjusting your filters.
    </p>
  </div>
)}

    {/* Donor Cards */}
    {!loading && searchResult.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
    {searchResult.map((donor) => (
     <div
  key={donor._id}
  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
>
  {/* Top Gradient Bar */}
  <div className="h-2 bg-gradient-to-r from-rose-500 to-red-500"></div>

  <div className="p-5">

    {/* Name + Blood Group Box */}
    <div className="flex justify-between items-start mb-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{donor.fullName}</h2>
        <p className="text-gray-500 text-sm">Volunteer Blood Donor</p>
      </div>

      <div className="px-3 py-1 bg-gradient-to-b from-rose-500 to-red-500 text-white rounded-md font-bold shadow">
        {donor.bloodGroup}
      </div>
    </div>

    {/* Location */}
    <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
      <MapPin className="w-4 h-4 text-rose-600" />
      <span>{donor.district}, {donor.upazila}</span>
    </div>

    {/* Last Donation Date */}
    {/* <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
      <Calendar className="w-4 h-4 text-rose-600" />
      <span>{donor.lastDonationDate ? donor.lastDonationDate : "Not available"}</span>
    </div> */}

    {/* Available Time */}
    {/* <div className="flex items-center gap-2 text-gray-700 text-sm">
      <Clock className="w-4 h-4 text-rose-600" />
      <span>{donor.availableTime ? donor.availableTime : "Anytime"}</span>
    </div> */}

  </div>
</div>

    ))}
  </div>
)}

    </div>
  );
};

export default SearchDonors;
