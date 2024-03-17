import { BrowserRouter, Route, Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
import AdminNav from "../Components/adminNav/AdminNav";
import Dorms from "../Pages/dorms/Dorms";
import Test from "../Pages/phptest/Test";
import AdminMain from "../Pages/adminMain/AdminMain";
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navi /> */}
        <AdminNav />

        <Routes>
          <Route path="/DormReview" Component={DormReview} />
          {/* <Route path="/Dorms" Component={Dorms}/> */}

          <Route path="/Test" Component={Test} />
          <Route path="/AdminMain" Component={AdminMain}></Route>
        
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
