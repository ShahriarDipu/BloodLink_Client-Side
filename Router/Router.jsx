import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router";
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
import { AdminDashboard } from "../src/Pages/DashboardPages/AdminDashboard/AdminDashboard";
import { AllUsers } from "../src/Pages/DashboardPages/AdminDashboard/AllUsers";
import { AllDonationRequests } from "../src/Pages/DashboardPages/AdminDashboard/AllDonationRequests";
import { ContentManagement } from "../src/Pages/DashboardPages/AdminDashboard/ContentManagement";
import { DonationRequests } from "../src/Pages/PublicPages/DonationRequests";
import { donationRequestDetails } from "../src/Pages/PublicPages/donationRequestDetails";

import { VolunteerProfile } from "../src/Pages/DashboardPages/VolunteerDashboard/VolunteerProfile";
import { AllBloodDonation } from "../src/Pages/DashboardPages/VolunteerDashboard/AllBloodDonation";
import { VolunteerWelcomePage } from "../src/Pages/DashboardPages/VolunteerDashboard/VolunteerWelcomePage";
import { AdminProfileDashboard } from "../src/Pages/DashboardPages/AdminDashboard/AdminProfileDashboard";
import { PrivateRoute } from "../src/routes/PrivateRoute";
import { VolunteerDashboard } from "../src/Pages/DashboardPages/VolunteerDashboard/VolunteerDashboard";
import Error from "./Error";
import { AdminStatistics } from "../src/Pages/DashboardPages/AdminDashboard/AdminStatistics";



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
  path:"/donorDashboard",
element:(<PrivateRoute>
 <DonorDashboard></DonorDashboard>
</PrivateRoute>
)
,
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
element:(<PrivateRoute><DonorFunding></DonorFunding></PrivateRoute>),
  loader:LocationLoader,
}
      ]
},
{
  path:"/adminDashboard",
  element:(<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>),
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
  path:"editDonationRequest/:id",
  Component:EditDonationRequest,
   loader:LocationLoader,
},
{
  path:"viewDetails/:id",
  Component:donationRequestDetails
},
{
  path:"contentManagement",
  Component:ContentManagement,
}
  ]
},
{
  path:"/volunteerDashboard",
element:(<PrivateRoute><VolunteerDashboard></VolunteerDashboard></PrivateRoute>),
  children:[

    {
      index: true, 
      element: <Navigate to="volunteerWelcomePage" replace />,
//  element: <Navigate to="AdminProfileDashboard" replace />
// Component:AdminProfileDashboard
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
      Component:AdminProfileDashboard
    },
    {
      path:"volunteerFunding",
      Component:DonorFunding
    }
  ]
},
{
        path:"*",
        Component:Error
    }

]);
