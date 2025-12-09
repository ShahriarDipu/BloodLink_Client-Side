import React from 'react'
import {Navbar} from "../src/Pages/Navbar/Navbar"
import {Footer} from "../src/pages/Homepage/NavbarFooterSection/Footer"
import HeroSection from '../src/Pages/HomePage/HeroSection'
import { StatisticsSection } from '../src/Pages/HomePage/StatisticsSection'
import WhyDonateBloodSection from '../src/Pages/HomePage/WhyDonateBloodSection'
import { BloodTypesSection } from '../src/Pages/HomePage/BloodTypesSection'
import { ContuctUsSection } from '../src/Pages/HomePage/ContuctUsSection'
import LoginRegister from '../src/Pages/Login/Registration/LoginRegistration'
export const Home = () => {
  return (
<>
 <Navbar></Navbar>
 <HeroSection></HeroSection>
 <StatisticsSection>
 </StatisticsSection>
 <WhyDonateBloodSection></WhyDonateBloodSection>
 <BloodTypesSection></BloodTypesSection>
<ContuctUsSection></ContuctUsSection>
 <Footer></Footer>
 <LoginRegister></LoginRegister>
 </>
  )
}
