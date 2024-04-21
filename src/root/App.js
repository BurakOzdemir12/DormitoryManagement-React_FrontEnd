import { BrowserRouter, Route, Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
import AdminNav from "../Components/adminNav/AdminNav";
import Dorms from "../Pages/dorms/Dorms";
import Test from "../Pages/phptest/Test";
import { Switch } from "antd";
import RoutesConfig from "./RoutesConfig";
// Admin Page
import AdminMain from "../Pages/adminMain/AdminMain";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";

function App() {
  return (
    <Routes>
      <Route element={<Navi />}>
        <Route index path="/DormReview" element={<DormReview />} />
      </Route>
      {/* <Route path="/Dorms" element={<Dorms />} /> */}
      <Route index path="/AdminMain" element={<AdminMain />} />
      <Route path="/Test" element={<Test />} />
    </Routes>
  );
}

export default App;
