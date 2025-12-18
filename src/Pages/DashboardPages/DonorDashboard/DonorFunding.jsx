import React, { use, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../Context/AuthContext';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { Link, useLocation } from 'react-router';

export const DonorFunding = () => {

const location = useLocation();

const axiosSecure=UseAxiosSecure();



const {user}=use(AuthContext)
if (!user) {
  return (
    <div className="p-10 text-center text-gray-500">
      Loading user...
    </div>
  );
}


  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  const amount = watch("amount");

  // 🔹 Fetch fundings
 const { data } = useQuery({
  queryKey: ["fundings"],
  queryFn: async () => {
    const res = await axiosSecure.get("/fundings");
    return Array.isArray(res.data) ? res.data : [];
  },
});

const fundings = data ?? [];


  const totalFunding = fundings.reduce(
    (sum, f) => sum + f.amount,0
  );

  // 🔹 Stripe checkout
  const checkoutMutation = useMutation({
    mutationFn: async ({ amount, email }) => {
      const res = await axiosSecure.post("/create-checkout-session", {
        amount,
        email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  
const queryClient = useQueryClient();
  useEffect(() => {
  if (!user?.email) return;

  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  if (sessionId) {
    const amount = Number(localStorage.getItem("donationAmount"));

    axiosSecure
      .post("/fundings", {
        user_email: user.email,
        amount,
        stripeSessionId: sessionId,
      })
      .then(() => {
        localStorage.removeItem("donationAmount");

     
        queryClient.invalidateQueries(["fundings"]);
      })
      .catch((err) => console.error("Save funding failed", err));
  }
}, [location.search, user?.email, axiosSecure, queryClient]);



  const handleDonate = (data) => {
    localStorage.setItem("donationAmount", data.amount);

    checkoutMutation.mutate({
      amount: Number(data.amount),
      email: user.email,
    });
  };


  

  return (
    <div>
           {/* Page Header */}
      <div className="flex items-center justify-end mb-3">
       
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </Link>
      </div>


      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-3xl p-6 shadow-lg">
          <p className="text-sm text-rose-100">Total Funds Raised</p>
          <h2 className="text-3xl font-bold mt-2">
            ৳{totalFunding.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-sm text-gray-500">Total Donors</p>
          <h2 className="text-3xl font-bold">{fundings.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-sm text-gray-500">Avg. Donation</p>
          <h2 className="text-3xl font-bold">
            ৳{fundings.length ? Math.round(totalFunding / fundings.length) : 0}
          </h2>
        </div>
      </div>

      {/* Donate Button */}
      <div className="flex justify-between items-center bg-rose-50 p-6 mb-10 rounded-2xl shadow">
        <div>
          <h3 className="text-xl font-bold">Support Our Mission</h3>
          <p className="text-gray-500">Help us save more lives</p>
        </div>

        <button
          onClick={() => setDonateModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl"
        >
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="p-4">Donor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {fundings.map((fund) => (
              <tr key={fund._id} className="border-t">
                <td className="p-4">
                  <p className="font-medium">{fund.user_name}</p>
                  <p className="text-sm text-gray-500">{fund.user_email}</p>
                </td>

                <td className="p-4 font-bold text-emerald-600">
                  ৳{fund.amount.toLocaleString()}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(fund.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {donateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Make a Donation</h2>

            <form onSubmit={handleSubmit(handleDonate)} className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {[100, 200, 500, 1000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setValue("amount", amt)}
                    className="border rounded-lg py-2 hover:bg-rose-100"
                  >
                    ৳{amt}
                  </button>
                ))}
              </div>

              <input
                type="number"
                {...register("amount", { required: true, min: 1 })}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Enter amount"
              />

              {errors.amount && (
                <p className="text-red-500 text-sm">Enter a valid amount</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDonateModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!amount}
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg"
                >
                  Donate ৳{amount || 0}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
