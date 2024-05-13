import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './root/App';
import reportWebVitals from './reportWebVitals';
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './root/RoutesConfig';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const isTopbarVisible = window.location.pathname !== "/DormReview"||"/login"; // Determine if Topbar should be visible
const isTopbarVisible = window.location.pathname !== "/DormReview" && window.location.pathname !== "/login";

const isAdmin = false;
root.render(
  // <BrowserRouter>
  // {isTopbarVisible && <RoutesConfig />} {/* Render Topbar conditionally */}
  // <App/>


  // </BrowserRouter>
  <BrowserRouter>
    {isAdmin ? <RoutesConfig /> : <App />}
  </BrowserRouter>,
);


reportWebVitals();