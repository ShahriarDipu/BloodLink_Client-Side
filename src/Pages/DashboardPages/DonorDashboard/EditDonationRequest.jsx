
import { useForm, useWatch } from "react-hook-form";
import {
  User,
  Droplet,
  FileText,
  Send,
} from "lucide-react";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { useParams, useLoaderData, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const EditDonationRequest = () => {
  const [isUpdating, setIsUpdating] = useState(false);
const [isUpdated, setIsUpdated] = useState(false);
 const { id } = useParams();
 console.log(id)
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();


  const {  districts, upazilas } = useLoaderData();

  const { user, loading } = use(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm();

const {
  data: donationRequest,
  isLoading,
} = useQuery({
  queryKey : ["donationRequest", id],
  enabled: !!id,
  queryFn: async () => {
    const res = await axiosSecure.get(`/donationRequests/${id}`);
    console.log(res.data)
    return res.data;
  },
});

useEffect(() => {
  if (donationRequest && districts.length && upazilas.length) {
    const districtId = districts.find(
      (d) => d.name === donationRequest.district
    )?.id;

    const upazilaId = upazilas.find(
      (u) => u.name === donationRequest.upazila
    )?.id;

    reset({
      recipientName: donationRequest.recipientName,
      district: districtId || "",
      upazila: upazilaId || "",
      hospitalName: donationRequest.hospitalName,
      hospitalAddress: donationRequest.hospitalAddress,
      bloodGroup: donationRequest.bloodGroup,
      donationDate: donationRequest.donationDate,
      donationTime: donationRequest.donationTime,
      message: donationRequest.message,
    });
  }
}, [donationRequest, districts, upazilas, reset]);


  const selectedDistrictId = useWatch({
    control,
    name: "district",
  });

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );



  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

const handleUpdate = async (data) => {
  try {
    setIsUpdating(true);

    const districtName = districts.find(d => d.id === data.district)?.name;
    const upazilaName = upazilas.find(u => u.id === data.upazila)?.name;

    const updatedData = {
      ...data,
      district: districtName,
      upazila: upazilaName,
    };

    await axiosSecure.put(`/donationRequests/${id}`, updatedData);

    // ✅ SHOW SUCCESS
    setIsUpdating(false);
    setIsUpdated(true);

    // ✅ WAIT, THEN NAVIGATE
    setTimeout(() => {

    }, 800);

  } catch (error) {
    console.error("Update failed", error);
    setIsUpdating(false);
  }
};



  return (

   
    <div className="max-w-3xl mx-auto">

  <div className="flex items-end justify-end mb-5">
       
        <button   onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Previous
        </button>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="border-0 shadow-xl shadow-rose-100 rounded-2xl overflow-hidden bg-white">
          
          {/* Header */}
          <div className="border-b bg-gradient-to-r from-rose-50 to-white p-6 flex gap-4 items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Create Donation Request
              </h1>
              <p className="text-sm text-gray-500">
                Fill in the details to request blood donation
              </p>
            </div>
            
          </div>

          {/* Body */}
          <div className="p-8">
        <form className="space-y-10" onSubmit={handleSubmit(handleUpdate)}>

              {/* Requester Info */}
              <section className="space-y-4">
                
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-500" />
                  Requester Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 text-sm">Your Name</label>
                    <div className="h-12 bg-gray-100 rounded-xl flex items-center px-4 text-gray-600">
                     {user.displayName}
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm">Your Email</label>
                    <div className="h-12 bg-gray-100 rounded-xl flex items-center px-4 text-gray-600">
                      {user.email}
                    </div>
                  </div>
                </div>
              </section>

              {/* Recipient Info */}
              <section class="space-y-6">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span class="text-rose-500">👤</span>
                  Recipient Information
                </h3>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Recipient Name <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    // placeholder={donationRequest.recipientName}
                    {...register("recipientName")}
                    class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      District <span class="text-rose-500">*</span>
                    </label>
                   <select
  {...register("district")}
  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-600"
>
  <option >Select district</option>
  {districts.map((d) => (
    <option key={d.id} value={d.id}>
      {d.name}
    </option>
  ))}
</select>

                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Upazila <span class="text-rose-500">*</span>
                    </label>
                    <select
  {...register("upazila")}
  disabled={!selectedDistrictId}
  className={`w-full h-12 rounded-xl border px-4 text-sm
    ${
      selectedDistrictId
        ? "border-gray-200 bg-white"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }`}
>
  <option >
    {selectedDistrictId ? "Select upazila" : "Select district first"}
  </option>

  {filteredUpazilas.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ))}
</select>

                  </div>
                </div>
              </section>

              {/* Hospital Info */}
              <section class="space-y-6">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <span class="text-rose-500">🏥</span>
                  Hospital Information
                </h3>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Hospital Name <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("hospitalName")}
                    // placeholder={donationRequest.hospitalName}
                    class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Full Address <span class="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("hospitalAddress")}
                    // placeholder={donationRequest.hospitalAddress}
                    class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                  />
                </div>
              </section>

              {/* Donation Details */}
              <section class="space-y-6">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Droplet className="w-5 h-5 text-rose-500" />
                  Donation Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Blood Group <span class="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("bloodGroup")}
                      class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-600
                             focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    >
                      <option>Select</option>
                      <option value="A+">A+</option>
  <option value="A-">A−</option>
  <option value="B+">B+</option>
  <option value="B-">B−</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB−</option>
  <option value="O+">O+</option>
  <option value="O-">O−</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Donation Date <span class="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("donationDate")}
                      defaultValue="2025-12-12"
                      class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm
                             focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Donation Time <span class="text-rose-500">*</span>
                    </label>
                    <input
                      type="time"
                      {...register("donationTime")}
                       defaultValue="12:30"
                      class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm
                             focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    />
                  </div>
                </div>
              </section>

              {/* Message */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-500" />
                  Request Message
                </h3>

                <textarea
                  rows="4"
                  {...register("message")}
                //   placeholder={donationRequest.message}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </section>

              {/* Submit */}
              <div className="flex gap-4 justify-center">
  {/* Cancel */}
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="py-3 px-20 h-14 rounded-xl text-lg
      border border-gray-300 text-gray-700
      hover:bg-gray-100 transition"
  >
    Cancel
  </button>



            <motion.button
  type="submit"
  disabled={isUpdating}
  className="px-5 h-14 rounded-xl text-lg flex items-center justify-center gap-2
    bg-gradient-to-r from-rose-500 to-rose-700 text-white"
  whileTap={{ scale: 0.95 }}
>
  <AnimatePresence mode="wait">
    {!isUpdated ? (
      <motion.span
        key="update"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2"
      >
        <Send className="w-5 h-5" />
        {isUpdating ? "Updating..." : "Update Donation Request"}
      </motion.span>
    ) : (
      <motion.span
        key="success"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex items-center gap-2 text-green-100"
      >
        <CheckCircle className="w-5 h-5" />
        Updated Successfully
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>

</div>

            </form>
          </div>
        </div>
      </motion.div>
    </div>
  
  )
}
