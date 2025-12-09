import React from 'react'

export const StatisticsSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-rose-500 to-rose-700 text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        <div>
          <h2 className="text-3xl font-bold">10K+</h2>
          <p className="mt-1">Donors Registered</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">50K+</h2>
          <p className="mt-1">Lives Saved</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">100+</h2>
          <p className="mt-1">Hospitals Connected</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">64</h2>
          <p className="mt-1">Districts Covered</p>
        </div>

      </div>
    </section>
  )
}
