import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Droplet,
  Building,
  FileText,
  Send,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const CreateDonationRequest =()=> {
   const {user,  updateUserProfile}=use(AuthContext)

  const { register, handleSubmit } = useForm();

  const handleRequest = (data) => {
    console.log("Donation Request Data:", data);
  };

  return (
    <div className="max-w-3xl mx-auto">
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
                      class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-600
                             focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    >
                      <option>Select district</option>
                      <option>Dhaka</option>
                      <option>Chattogram</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Upazila <span class="text-rose-500">*</span>
                    </label>
                    <select
                      disabled
                      {...register("upazila")}
                      class="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                    >
                      <option>Select district first</option>
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
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Donation Date <span class="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("donationDate")}
                      value="2025-12-12"
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
                      value="12:30"
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
              <button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-xl text-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Donation Request
              </button>

            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default CreateDonationRequest;
