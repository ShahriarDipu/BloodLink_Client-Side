import React, { use, useState } from 'react'
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../Context/AuthContext';

export const DonorFunding = () => {

const {user}=use(AuthContext)
  const [donateModalOpen, setDonateModalOpen] = useState(false);


   const fundings = []; // replace with API
  const totalFunding = 0;
    const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors }
} = useForm();

  const amount = watch("amount");

  const handleDonate = (data) => {
    console.log("Donation:", data);
    setDonateModalOpen(false);
  };


  return (
    <div>
{/* stats section */}
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white rounded-3xl p-6 shadow-lg">
    <p className="text-sm text-rose-100">Total Funds Raised</p>
    <h2 className="text-3xl font-bold mt-2">৳{totalFunding.toLocaleString()}</h2>
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
            {new Date(fund.funding_date).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
{donateModalOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Make a Donation</h2>
      <p className="text-gray-500 mb-4">Your help saves lives ❤️</p>

      <form onSubmit={handleSubmit(handleDonate)} className="space-y-4">
        {/* Quick amounts */}
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

        {/* Amount input */}
        <input
          type="number"
          placeholder="Enter amount"
          {...register("amount", { required: true, min: 1 })}
          className="w-full border rounded-xl px-4 py-3"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">Enter a valid amount</p>
        )}

        {/* Donor info */}
        <div className="bg-gray-50 p-4 rounded-xl text-sm">
          <p className="font-medium">{user?.full_name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* Actions */}
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
