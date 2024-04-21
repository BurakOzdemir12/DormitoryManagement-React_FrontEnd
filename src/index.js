import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './root/App';
import reportWebVitals from './reportWebVitals';
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './root/RoutesConfig';
const root = ReactDOM.createRoot(document.getElementById('root'));
const isTopbarVisible = window.location.pathname !== "/DormReview"; // Determine if Topbar should be visible

root.render(
  <BrowserRouter>
  {isTopbarVisible && <RoutesConfig />} {/* Render Topbar conditionally */}
  <App/>

  </BrowserRouter>
);


reportWebVitals();