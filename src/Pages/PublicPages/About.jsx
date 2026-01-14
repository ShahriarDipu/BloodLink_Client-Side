import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../HomePage/NavbarFooterSection/Footer";

const Icon = ({ children, className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const values = [
    {
      title: "Compassion",
      description: "We believe in the power of human kindness and empathy to save lives."
    },
    {
      title: "Trust",
      description: "Building a reliable platform where donors and recipients connect safely."
    },
    {
      title: "Community",
      description: "Creating a strong network of life savers across Bangladesh."
    },
    {
      title: "Impact",
      description: "Making a real difference in lives, one donation at a time."
    }
  ];

  const stats = [
    { number: "50K+", label: "Lives Saved" },
    { number: "10K+", label: "Active Donors" },
    { number: "100+", label: "Hospitals" },
    { number: "64", label: "Districts" }
  ];

  const milestones = [
    { year: "2020", title: "Foundation", description: "LifeFlow was founded with a mission to connect donors with patients." },
    { year: "2021", title: "1,000 Donors", description: "Reached our first donor milestone in Dhaka." },
    { year: "2022", title: "Nationwide", description: "Expanded to all 64 districts of Bangladesh." },
    { year: "2023", title: "10K Lives", description: "Saved over 10,000 lives." },
    { year: "2024", title: "50K Lives", description: "Crossed 50,000+ lives saved." }
  ];

  const faqs = [
    {
      q: "Who can donate blood?",
      a: "Anyone aged 18–60, in good health, and meeting basic eligibility criteria can donate blood."
    },
    {
      q: "Is blood donation safe?",
      a: "Yes. All equipment used is sterile and disposable. There is no risk of infection."
    },
    {
      q: "How often can I donate blood?",
      a: "You can donate whole blood every 3 months."
    },
    {
      q: "Does donating blood hurt?",
      a: "You may feel a slight pinch, but the process is generally painless."
    },
    {
      q: "How long does the process take?",
      a: "The entire process usually takes 10–15 minutes."
    }
  ];

  return (
    <div className="min-h-screen">

<Navbar></Navbar>

      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-600 to-rose-800 py-20 text-center text-white px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Saving Lives Through Blood Donation
          </h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            Bangladesh’s trusted blood donation platform.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <p className="text-3xl font-bold text-gray-900">{s.number}</p>
              <p className="text-gray-600">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-gray-600">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 flex gap-6"
              >
                <div className="w-16 h-16 bg-rose-600 text-white rounded-xl flex items-center justify-center font-bold">
                  {m.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{m.title}</h3>
                  <p className="text-gray-600">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
  <div className="max-w-4xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-14">
      <span className="inline-block mb-4 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
        Need Help?
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Everything you need to know about blood donation and LifeFlow
      </p>
    </div>

    {/* FAQ Items */}
    <div className="space-y-5">
      {faqs.map((faq, i) => {
        const isOpen = openFaq === i;

        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-rose-300 bg-white shadow-lg"
                : "border-gray-200 bg-white hover:border-rose-200"
            }`}
          >
            {/* Question */}
            <button
              onClick={() => setOpenFaq(isOpen ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left group"
            >
              <span className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition">
                {faq.q}
              </span>

              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition ${
                  isOpen
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-rose-50 text-rose-600 border-rose-200"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
<Footer></Footer>

    </div>
  );
}
