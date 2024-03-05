import { BrowserRouter,Route ,Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
function App() {
  return (
    <div >
     <BrowserRouter>
     <Navi/>

     <Routes>
      <Route path="/DormReview" Component={DormReview}>

      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
