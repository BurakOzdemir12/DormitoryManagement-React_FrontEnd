import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
// Admin Page
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard/Index";
import Students from "../scenes/students/Students";
import Comments from "../scenes/comments/Comments";
import Reservations from "../scenes/reservations/Reservations";
import Form from "../scenes/form/Form";
// import Room2 from "../scenes/room/Room2";
import Room from "../scenes/room/Room";
import Bar from "../scenes/bar/Bar";
// import Line from "../scenes/line";
import Pie from "../scenes/pie/Pie";
import DormProps from "../scenes/dormProps/DormProps";
import UpdateForm from "../scenes/form/UpdateForm";
import RoomUpdate from "../scenes/room/RoomUpdate";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import RoomProps from "../scenes/roomProps/RoomProps";

// import Geography from "../scenes/geography";
// import Calendar from "../scenes/calendar";
const isNavigatingToLoginPage = window.location.pathname === "/login";

const RoutesConfig = () => {
  const cookies = new Cookies();

  const navigate = useNavigate();
  // if (isNavigatingToLoginPage) {
  //   // window.location.reload();

  //   // localStorage.removeItem("token");
  //   cookies.remove("jwt_auth");

  //   navigate("/");
  // }

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
        // window.location.reload();

        navigate("/login");
        // window.location.reload();

        // Clear user state if token is expired
      } else {
        setUser(decodedToken);
      }
    }
  }, [navigate]);

  
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar isSidebar={isSidebar} />

          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/dormprops" element={<DormProps />} />
              <Route path="/form" element={<Form />} />
              <Route path="/updateStudent/:id" element={<UpdateForm />} />

              <Route path="/room" element={<Room />} />
              <Route path="/roomUpdate/:id" element={<RoomUpdate />} />
              <Route path="/roomprops" element={<RoomProps />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/statistics" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/reservations" element={<Reservations />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default RoutesConfig;

// <BrowserRouter>
//         <Routes>
//           <Route path="/" />
//           <Route element={<Navi />}>
//             <Route index path="/DormReview" Component={DormReview} />
//           </Route>
//           {/* <Route path="/Dorms" Component={Dorms}/> */}
//             <Route index path="/AdminMain" Component={AdminMain} />
//           <Route path="/Test" Component={Test} />
//         </Routes>
//       </BrowserRouter>
