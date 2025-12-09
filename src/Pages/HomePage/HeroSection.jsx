import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, Heart, Search, Droplet } from "lucide-react";


const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-rose-50" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">
                Donate Blood, Save Lives
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gray-900">Give the </span>
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                Gift of Life
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Join our community of blood donors and help save lives. Every drop counts in making a difference.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <li className="btn bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-rose-200 hover:shadow-rose-300 transition-all duration-300">
                  <Heart className="w-5 h-5 mr-2" />
                  Join as a Donor
                </li>
              </Link>

              <Link to="/search-donors">
                <li variant="outline" className="border-2 btn border-rose-200 text-rose-700 hover:bg-rose-50 px-8 py-6 text-lg rounded-2xl">
                  <Search className="w-5 h-5 mr-2" />
                  Search Donors
                </li>
              </Link>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=700&fit=crop"
                alt="Blood Donation"
                className="rounded-3xl shadow-2xl shadow-rose-200"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50K+</p>
                    <p className="text-gray-500">Lives Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
