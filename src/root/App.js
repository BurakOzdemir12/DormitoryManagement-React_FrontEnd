import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
// import AdminNav from "../Components/adminNav/AdminNav";
import Dorms from "../Pages/dorms/Dorms";
import { Switch } from "antd";
import RoutesConfig from "./RoutesConfig";
// Admin Page
// import AdminMain from "../Pages/adminMain/AdminMain";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Login from "../scenes/login/Login";
import Home from "../Pages/home/Home";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const undefinedLocation = window.location.pathname === "*";

function App() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  //Token Expires

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = cookies.get("jwt_auth");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date().getTime();

      if (decodedToken.exp * 1000 < currentDate) {
        // localStorage.removeItem("token");
        cookies.remove("jwt_auth");
        setUser(null); 

        window.location.reload();
        navigate("/login");
        window.location.reload();


        // Clear user state if token is expired
      } else {
        setUser(decodedToken);
      }
    }
  }, [navigate]);
  return (
    <Routes>
      <Route element={<Navi />}>
        <Route  path="/home" element={<Home/>} />
        <Route  path="/DormReview" element={<DormReview />} />
        <Route path="/login" element={<Login/>} />
        <Route index path="/" element={<Home/>} />
         <Route path="*" element={<Home/>}/>
        
      </Route>
      
    </Routes>
  );
}

export default App;
