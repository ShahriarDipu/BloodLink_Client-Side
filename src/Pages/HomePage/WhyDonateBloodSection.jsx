import { 
  Droplet, 
  Search, 
  Heart, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Sparkles,
  Shield,
  Activity
} from 'lucide-react';
import { motion } from "motion/react";

export default function WhyDonateBloodSection() {


  const features = [
    {
      icon: Heart,
      title: "Save Lives",
      description: "Every donation can save up to 3 lives. Be a hero today.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Donation takes only 10-15 minutes of your precious time.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "All donations are screened and handled with utmost care.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Activity,
      title: "Health Benefits",
      description: "Regular donation helps maintain good health and reduces risks.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Donors Registered" },
    { value: "50K+", label: "Lives Saved" },
    { value: "100+", label: "Hospitals Connected" },
    { value: "64", label: "Districts Covered" }
  ];
  return (
   <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Donate Blood?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your single donation can make a tremendous impact on someone's life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 w-15/17 md:w-full mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-rose-100 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  );
}
