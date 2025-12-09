import React from 'react'
import { motion } from 'motion/react'
import { Droplet } from 'lucide-react'

export const BloodTypesSection = () => {
  return (
     <section className="py-24 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Blood Types & Compatibility
            </h2>
            <p className="text-xl text-gray-600">
              Understanding blood types helps save lives
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 md:gap-4 gap-5 w-15/17 md:w-full mx-auto">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square bg-white rounded-2xl shadow-lg shadow-rose-100 flex items-center justify-center hover:shadow-xl hover:shadow-rose-200 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <Droplet className="w-8 h-8 mx-auto mb-2 text-rose-500 group-hover:text-rose-600 transition-colors" />
                  <span className="text-2xl font-bold text-gray-900">{type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}
