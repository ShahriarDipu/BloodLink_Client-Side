import React from 'react'
import { Droplet ,Phone, Mail, MapPin} from 'lucide-react'
import { Link } from 'react-router'
export const Footer = () => {
  return (
  <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-15/17 md:w-full mx-auto">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center">
                  <Droplet className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">BloodLink</span>
              </div>
              <p className="text-gray-400 max-w-md">
                LifeFlow is a blood donation platform connecting donors with those in need. Together, we can save lives.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="Home" className="text-gray-400 hover:text-rose-400 transition-colors">Home</Link></li>
                <li><Link to="SearchDonors" className="text-gray-400 hover:text-rose-400 transition-colors">Search Donors</Link></li>
                <li><Link to="DonationRequests" className="text-gray-400 hover:text-rose-400 transition-colors">Donation Requests</Link></li>
                <li><Link to="Register" className="text-gray-400 hover:text-rose-400 transition-colors">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +880 1234-567890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@BloodLink.org
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 BloodLink. All rights reserved. Made with ❤️ for humanity.</p>
          </div>
        </div>
      </footer>
  )
}
