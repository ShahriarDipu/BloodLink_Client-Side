import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { Home } from "./Home";
import LoginRegistration from "../src/Pages/Login/Registration/LoginRegistration";
import { DashBoard } from "../src/Components/Dashboard/DashBoard";
import SearchDonors from "../src/Pages/PublicPages/SearchDonors";
import { DonorDashboard } from "../src/Pages/DashboardPages/DonorDashboard/DonorDashboard";


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
  Component:DonorDashboard
}

]);
