import { BrowserRouter,Route ,Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
import Dorms from "../Pages/dorms/Dorms";
function App() {
  return (
    <div >
     <BrowserRouter>
     <Navi/>

     <Routes>
     
      <Route path="/DormReview" Component={DormReview}/>
      {/* <Route path="/Dorms" Component={Dorms}/> */}
      

     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
