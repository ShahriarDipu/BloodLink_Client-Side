import React from 'react';
import { Navbar } from '../src/Pages/Navbar/Navbar';
import HeroSection from '../src/Pages/HomePage/HeroSection'
import { StatisticsSection } from '../src/Pages/HomePage/StatisticsSection'
import WhyDonateBloodSection from '../src/Pages/HomePage/WhyDonateBloodSection';
import { BloodTypesSection } from '../src/Pages/HomePage/BloodTypesSection';
import ContuctUsSection from '../src/Pages/HomePage/ContuctUsSection';
import { Footer } from '../src/Pages/HomePage/NavbarFooterSection/Footer';

export const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatisticsSection />
      <WhyDonateBloodSection />
      <BloodTypesSection />
      <ContuctUsSection />
      <Footer />
    </>
  );
};
