import { ChevronDown, Droplet, Filter, Plus } from 'lucide-react'
import React, { use } from 'react'
import { Link } from 'react-router'
import { UseAxiosSecure } from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContext';

export const MyDonationRequest = () => {
const axiosSecure = UseAxiosSecure();
const { user, loading } = use(AuthContext);

if (loading) {
  return <div className="p-8 text-center">Loading...</div>;
}


const { data: requests = [], isLoading } = useQuery({
  queryKey: ["myDonationRequests", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/donationrequests?email=${user.email}`
    );
    return res.data;
  },
});





  return (
    <div>
        <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">
          My Donation Requests
        </h1>

        <button className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Home
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-rose-100 p-8 min-h-[420px] flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-lg font-semibold text-gray-900">
            My Donation Requests
          </h2>

          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="relative">
              <button className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                All Status
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown (UI only) */}
              {/* <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
                {["All Status", "Pending", "In Progress", "Done", "Canceled"].map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    >
                      {item}
                      {idx === 0 && <span>✓</span>}
                    </div>
                  )
                )}
              </div> */}
            </div>

            {/* New Request */}
            <Link    to="/donorDashboard/createDonationRequest">
            <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4" />
              New Request
            </button>
            </Link>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
            <Droplet className="w-8 h-8 text-rose-500" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No Donation Requests
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You haven't created any donation requests yet.
          </p>
          <Link    to="/donorDashboard/createDonationRequest">
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl text-sm font-semibold">
            Create Your First Request
          </button>
          </Link>
        </div>
      </div>
    </div>
 
    </div>
  )
}
