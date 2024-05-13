import React from "react";
import ReactDOM from "react-dom/client";
import App from "./root/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RoutesConfig from "./root/RoutesConfig";
import { jwtDecode } from "jwt-decode";
import DormReview from "./Pages/dormReview/DormReview";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const isTopbarVisible = window.location.pathname !== "/DormReview"||"/login"; // Determine if Topbar should be visible
const isTopbarVisible =
  window.location.pathname !== "/DormReview" &&
  window.location.pathname !== "/login";

const userToken = localStorage.getItem("token");
const data = userToken ? jwtDecode(userToken) : null;
const isAdmin = data ? data.isAdmin : false;
const isAuthenticated = data ? true : false;
const isnotGuest = isAuthenticated;
const isnon = window.location.pathname === "*";
root.render(
  // <BrowserRouter>
  // {isTopbarVisible && <RoutesConfig />} {/* Render Topbar conditionally */}
  // <App/>
  // </BrowserRouter>

  <BrowserRouter>
  
  {isAdmin && isnon ? <Navigate to="/dashboard" />:""}

  {isAuthenticated && isAdmin && isnotGuest ? <RoutesConfig /> :<App/> }
  </BrowserRouter>
);

reportWebVitals();
