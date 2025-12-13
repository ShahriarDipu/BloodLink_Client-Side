import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { Home } from "./Home";
import LoginRegistration from "../src/Pages/Login/Registration/LoginRegistration";
import { DashBoard } from "../src/Components/Dashboard/DashBoard";
import SearchDonors from "../src/Pages/PublicPages/SearchDonors";
import { DonorDashboard } from "../src/Pages/DashboardPages/DonorDashboard/DonorDashboard";
import CreateDonationRequest from "../src/Pages/DashboardPages/DonorDashboard/CreateDonationRequest";
import { MyDonationRequest } from "../src/Pages/DashboardPages/DonorDashboard/MyDonationRequest";
import { DonarProfile } from "../src/Pages/DashboardPages/DonorDashboard/DonarProfile";
import { DonorProfileDashboard } from "../src/Pages/DashboardPages/DonorDashboard/DonorProfileDashboard";
import { LocationLoader } from "./LocationLoader";



export const  Router = createBrowserRouter([
  {
    path: "/",
    Component:Home,
       
  },
  { path:"loginRegistration", Component: LoginRegistration ,
     loader:async ()=> {
      const fullDistrict = await fetch("/districts.json").then(res => res.json());
      const fullUpazila = await fetch("/upazilas.json").then(res => res.json()); 

 return { fullDistrict, fullUpazila };


    }
  },
{path:"dashboard", Component:DashBoard},
{
  path:"searchDonors",
  Component:SearchDonors,
  loader:async ()=> {
      const districts = await fetch("/districts.json").then(res => res.json());
      const upazilas = await fetch("/upazilas.json").then(res => res.json()); 

 return { districts, upazilas };


    }
},
{
  path:"donorDashboard",
  Component:DonorDashboard,
  children:[
       {
  path:"createDonationRequest",
  Component:CreateDonationRequest,
  loader:LocationLoader,
},
{
  path:"myDonationRequest",
  Component:MyDonationRequest
},
{
  path:"profile",
  Component:DonarProfile,
   loader:LocationLoader,
}
,{
  path:"donorProfileDashboard",
  Component:DonorProfileDashboard
}
      ]
}

]);
