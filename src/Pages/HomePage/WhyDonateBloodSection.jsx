import { Heart, Clock, ShieldCheck, Activity } from "lucide-react";

export default function WhyDonateBloodSection() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 text-center">

      {/* Heading */}
      <h2 className="text-3xl font-bold">Why Donate Blood?</h2>
      <p className="text-gray-600 mt-2">
        Your single donation can make a tremendous impact on someone's life
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">


        <div className="p-6 rounded-2xl shadow-sm bg-white">
          <div className="w-12 h-12 mx-auto rounded-xl bg-pink-100 flex items-center justify-center">
            <Heart className="text-pink-600" />
          </div>
          <h3 className="font-bold mt-4">Save Lives</h3>
          <p className="text-gray-600 mt-2">
            Every donation can save up to 3 lives. Be a hero today.
          </p>
        </div>

        {/* Quick Process */}
        <div className="p-6 rounded-2xl shadow-sm bg-white">
          <div className="w-12 h-12 mx-auto rounded-xl bg-orange-100 flex items-center justify-center">
            <Clock className="text-orange-600" />
          </div>
          <h3 className="font-bold mt-4">Quick Process</h3>
          <p className="text-gray-600 mt-2">
            Donation takes only 10–15 minutes of your precious time.
          </p>
        </div>

        {/* Safe & Secure */}
        <div className="p-6 rounded-2xl shadow-sm bg-white">
          <div className="w-12 h-12 mx-auto rounded-xl bg-green-100 flex items-center justify-center">
            <ShieldCheck className="text-green-600" />
          </div>
          <h3 className="font-bold mt-4">Safe & Secure</h3>
          <p className="text-gray-600 mt-2">
            All donations are screened and handled with utmost care.
          </p>
        </div>

        {/* Health Benefits */}
        <div className="p-6 rounded-2xl shadow-sm bg-white">
          <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center">
            <Activity className="text-blue-600" />
          </div>
          <h3 className="font-bold mt-4">Health Benefits</h3>
          <p className="text-gray-600 mt-2">
            Regular donation helps maintain good health and reduces risks.
          </p>
        </div>

      </div>
    </section>
  );
}
