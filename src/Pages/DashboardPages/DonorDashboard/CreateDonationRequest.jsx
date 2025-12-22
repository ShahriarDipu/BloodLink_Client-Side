import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import {
  User,
  Droplet,
  Building,
  FileText,
  Send,
} from "lucide-react";
import { use, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { UseAxiosSecure } from "../../../Hooks/UseAxiosSecure";
import { Link, useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest =()=> {

const [isSubmitted, setIsSubmitted] = useState(false);



   const {user, loading}=use(AuthContext)
const axiosSecure = UseAxiosSecure();


const { data: dbUser, isLoading: statusLoading } = useQuery({
  queryKey: ["userStatus", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get("/donors/by-email", {
      params: { email: user.email },
    });
    return res.data;
  },
  enabled: !!user?.email,
   refetchInterval: 2000,
});








console.log(user)


const handleRequest = async (data) => {
 if (!user) {
    console.log("no user")
 }

    const districtName =
  districts.find((d) => d.id === data.district)?.name;

const upazilaName =
  upazilas.find((u) => u.id === data.upazila)?.name;

  const donationRequest = {
    requesterName: user.displayName,
    requesterEmail: user.email,

    recipientName: data.recipientName,
    district: districtName,
    upazila: upazilaName,

    hospitalName: data.hospitalName,
    hospitalAddress: data.hospitalAddress,

    bloodGroup: data.bloodGroup,
    donationDate: data.donationDate,
    donationTime: data.donationTime,

    message: data.message,

    status: "pending",
    createdAt: new Date(),
  };
console.log(donationRequest)
  try {
    const res = await axiosSecure.post(
      "/donationrequests",
      donationRequest
    );
    console.log("Request saved:", res.data);



setIsSubmitted(true);

  // optional: reset after animation
  setTimeout(() => {
    setIsSubmitted(false);
  }, 3000);





  } catch (error) {
    console.error("Failed to create donation request", error);
  }
};




const { districts, upazilas } = useLoaderData();

const {
  register,
  handleSubmit,
  control,
} = useForm();
const selectedDistrictId = useWatch({
  control,
  name: "district",
});
const filteredUpazilas = upazilas.filter(
  (u) => u.district_id === selectedDistrictId
);


if (loading || statusLoading) {
  return <div className="text-center py-10">Loading...</div>;
}


if (dbUser?.status === "blocked") {
  return (
    <div className="max-w-xl mx-auto mt-20 text-center bg-red-50 border border-red-200 rounded-2xl p-8">
      <h2 className="text-xl font-bold text-red-600 mb-3">
        Account Blocked
      </h2>
      <p className="text-gray-600">
        Your account has been blocked. You cannot create donation requests.
        Please contact the administrator.
      </p>
    </div>
  );
}

  return (
    <div className="max-w-3xl mx-auto">
        {/* Page Header */}
      <div className="flex items-center justify-end mb-3">
       
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </Link>
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
            <form className="space-y-10" onSubmit={handleSubmit(handleRequest)}>

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
                    placeholder="Enter recipient's full name"
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
  <option value="">Select district</option>
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
  <option value="">
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
                    placeholder="e.g., Dhaka Medical College Hospital"
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
                    placeholder="e.g., Zahir Raihan Rd, Dhaka"
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
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>O+</option>
                      <option>AB+</option>
                       <option>O-</option>
                      <option>B-</option>
                      <option>AB-</option>
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
                  placeholder="Why do you need blood?"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </section>

              {/* Submit */}
              <motion.button
  type="submit"
  disabled={isSubmitted}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.95 }}
  animate={
    isSubmitted
      ? { backgroundColor: "#16a34a" } // green
      : {}
  }
  transition={{ duration: 0.3 }}
  className={`w-full h-14 rounded-xl text-lg flex items-center justify-center gap-2 text-white
    ${
      isSubmitted
        ? "bg-green-600 cursor-not-allowed"
        : "bg-gradient-to-r from-rose-500 to-rose-700"
    }`}
>
  {isSubmitted ? (
    <>
      ✅ Donation Request Created
    </>
  ) : (
    <>
      <Send className="w-5 h-5" />
      Submit Donation Request
    </>
  )}
</motion.button>


            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default CreateDonationRequest;
