import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "universal-cookie";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../scenes/global/Topbar";
import Navi from "../Components/nav/Navi";
import Home from "../Pages/home/Home";
import Login from "../scenes/login/Login";
import Dorms from "../Pages/dorms/Dorms";
import DormReview from "../Pages/dormReview/DormReview";
import { jwtDecode } from "jwt-decode";
import ChatPage from "../Pages/chat/ChatPage";
function App() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = cookies.get("jwt_auth");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date().getTime();
      if (decodedToken.exp * 1000 < currentDate) {
        cookies.remove("jwt_auth");
        setUser(null);
        navigate("/home");
      } else {
        setUser(decodedToken);
      }
    }
  }, [navigate]);

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar search={search} setSearch={setSearch} />
        <Navi />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Dorms" element={<Dorms search={search} />} />
          <Route path="/Dorms/:id" element={<DormReview />} />
          <Route index path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
