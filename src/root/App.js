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

function App() {
  return (
    <Routes>
      <Route element={<Navi />}>
        <Route  path="/DormReview" element={<DormReview />} />
        <Route path="/login" element={<Login/>} />
        <Route index path="/" element={<DormReview/>} />
        
      </Route>
      
    </Routes>
  );
}

export default App;
