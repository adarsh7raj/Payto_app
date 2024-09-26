import{BrowserRouter,Route,Routes} from "react-router-dom";
import {Signup} from "./pages/Signup";
import{Signin} from "./pages/Signin";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import {Success} from "./pages/Success.jsx"
import { LandingPage } from "./pages/landing_page.jsx";
import { Balance } from "./pages/Balance.jsx";



function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/balance" element={<Balance></Balance>}></Route>
          <Route path="/send" element={<SendMoney></SendMoney>}></Route>
          <Route path="/success" element={<Success></Success>}></Route>
          
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
