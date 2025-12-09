import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { Home } from "./Home";


export const  Router = createBrowserRouter([
  {
    path: "/",
    Component:Home
  },
]);
