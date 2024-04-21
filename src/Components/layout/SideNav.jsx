
import React from 'react'
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../Components/images/logo.png";

function SideNav() {
       const { pathname } = useLocation();
       const page = pathname.replace("/", "");

  return (
       <>
       <div className="brand">
         <img src={logo} alt="" />
         <span>Muse Dashboard</span>
       </div>
       <hr />
       <Menu theme="light" mode="inline">
         <Menu.Item key="1">
           <NavLink to="/dashboard">
             <span
               className="icon"
               style={{
              //    background: page === "dashboard" ? color : "",
               }}
             >
               dashboard{/* {dashboard} */}
             </span>
             <span className="label">Dashboard</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item key="2">
           <NavLink to="/tables">
             <span
               className="icon"
               style={{
              //    background: page === "tables" ? color : "",
               }}
             >
               tables{/* {tables} */}
             </span>
             <span className="label">Tables</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item key="3">
           <NavLink to="/billing">
             <span
               className="icon"
               style={{
              //    background: page === "billing" ? color : "",
               }}
             >
               {/* {billing} */} billing
             </span>
             <span className="label">Billing</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item key="4">
           <NavLink to="/rtl">
             <span
               className="icon"
               style={{
              //    background: page === "rtl" ? color : "",
               }}
             >
               {/* {rtl} */}
             </span>
             <span className="label">RTL</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item className="menu-item-header" key="5">
           Account Pages
         </Menu.Item>
         <Menu.Item key="6">
           <NavLink to="/profile">
             <span
               className="icon"
               style={{
              //    background: page === "profile" ? color : "",
               }}
             >
               {/* {profile} */}
             </span>
             <span className="label">Profile</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item key="7">
           <NavLink to="/sign-in">
             <span className="icon">signin</span>
             <span className="label">Sign In</span>
           </NavLink>
         </Menu.Item>
         <Menu.Item key="8">
           <NavLink to="/sign-up">
             <span className="icon">signup</span>
             <span className="label">Sign Up</span>
           </NavLink>
         </Menu.Item>
       </Menu>
       <div className="aside-footer">
         <div
           className="footer-box"
           style={{
       //       background: color,
           }}
         >
           <span className="icon" >
             {/* {dashboard} */}
           </span>
           <h6>Need Help?</h6>
           <p>Please check our docs</p>
           <Button type="primary" className="ant-btn-sm ant-btn-block">
             DOCUMENTATION
           </Button>
         </div>
       </div>
     </>
  )
}

export default SideNav
