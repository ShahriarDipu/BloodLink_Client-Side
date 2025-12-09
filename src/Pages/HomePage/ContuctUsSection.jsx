import React from 'react'
import { motion } from 'motion/react'
import { Phone,MapPin,Mail } from 'lucide-react'
export const ContuctUsSection = () => {
  return (
<section className="py-24 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Have questions? We're here to help. Contact us anytime.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">+880 1234-567890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-900">info@bloodLink.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg font-semibold text-gray-900">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form className="bg-gray-50 p-8 rounded-3xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      placeholder="Your name" 
                      className="h-12 rounded-xl border-gray-200 focus:border-rose-500 focus:ring-rose-500 border-2 w-full pl-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com" 
                      className="h-12 rounded-xl border-gray-200 focus:border-rose-500 focus:ring-rose-500 border-2 w-full pl-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      placeholder="How can we help you?" 
                      className="min-h-[150px] rounded-xl border-gray-200 focus:border-rose-500 focus:ring-rose-500 border-2 w-full pl-2"
                    />
                  </div>
                  <div className=" btn w-full bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 h-12 rounded-xl text-lg text-white">
                    Send Message
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  )
}
