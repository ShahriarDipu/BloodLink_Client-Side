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
import { EditDonationRequest } from "../src/Pages/DashboardPages/DonorDashboard/EditDonationRequest";
import { DonorFunding } from "../src/Pages/DashboardPages/DonorDashboard/DonorFunding";
import { adminDashboard } from "../src/Pages/DashboardPages/AdminDashboard/adminDashboard";
import { AllUsers } from "../src/Pages/DashboardPages/AdminDashboard/AllUsers";
import { AllDonationRequests } from "../src/Pages/DashboardPages/AdminDashboard/AllDonationRequests";
import { ContentManagement } from "../src/Pages/DashboardPages/AdminDashboard/ContentManagement";
import { DonationRequests } from "../src/Pages/PublicPages/DonationRequests";
import { donationRequestDetails } from "../src/Pages/PublicPages/donationRequestDetails";
import { VolunteerDashbaord } from "../src/Pages/DashboardPages/VolunteerDashboard/volunteerDashbaord";
import { VolunteerProfile } from "../src/Pages/DashboardPages/VolunteerDashboard/VolunteerProfile";
import { AllBloodDonation } from "../src/Pages/DashboardPages/VolunteerDashboard/AllBloodDonation";
import { VolunteerWelcomePage } from "../src/Pages/DashboardPages/VolunteerDashboard/VolunteerWelcomePage";
import { AdminProfileDashboard } from "../src/Pages/DashboardPages/AdminDashboard/AdminProfileDashboard";



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
  {
  path:"/loginRegister",
  Component:LoginRegistration,
  loader: async () => {
    const fullDistrict = await fetch("/districts.json").then(res => res.json());
    const fullUpazila = await fetch("/upazilas.json").then(res => res.json());
    return { fullDistrict, fullUpazila };
  }
},
{path:"dashboard", Component:DashBoard},
{
path:"/donationRequests",
Component:DonationRequests
},
{
  path:"/donationRequestDetails/:id",
  Component:donationRequestDetails
},

{
  path:"/searchDonors",
  Component:SearchDonors,
  loader:async ()=> {
      const districts = await fetch("/districts.json").then(res => res.json());
      const upazilas = await fetch("/upazilas.json").then(res => res.json()); 

 return { districts, upazilas };


    }
},
{
  path:"/search",
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
      index: true, 
      Component:DonorProfileDashboard,
    },
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
},
{
  path:"editDonationRequest/:id",
  Component:EditDonationRequest,
   loader:LocationLoader,
},
{
  path:"viewDetails/:id",
  Component:donationRequestDetails
},
{
  path:"donorFunding",
  Component:DonorFunding,
  loader:LocationLoader,
}
      ]
},
{
  path:"adminDashboard",
  Component:adminDashboard,
  children:[
   
    {
      index: true, 
      Component:AdminProfileDashboard,
    },
       {
  path:"adminprofile",
  Component:DonarProfile,
  loader:LocationLoader,
},
{
path:"dashbaord",
Component:AdminProfileDashboard
},

{
   path:"allUsers",
  Component:AllUsers,

},
{
  path:"allDonationRequest",
  Component:AllDonationRequests,
  
},
{
  path:"contentManagement",
  Component:ContentManagement,
}
  ]
},
{
  path:"volunteerDashboard",
  Component:VolunteerDashbaord,
  children:[

    {
      index: true, 
      Component:DonorProfileDashboard,
    },
    {
      path:"volunteerProfile",
      Component:DonarProfile,
      loader:LocationLoader,
    },
    {
      path:"allBloodDonationRequest",
      Component:AllBloodDonation,
      loader:LocationLoader,
    },
    {
      path:"volunteerWelcomePage",
      Component:VolunteerWelcomePage
    },
    {
      path:"volunteerFunding",
      Component:DonorFunding
    }
  ]
}

]);
