import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { Sendmoney } from "./pages/sendmoney";
import { EditUser } from "./pages/edituser";
import { Dashboard_new } from "./pages/dashboard_new";
import { Home2 } from "./pages/home_new";
import { Signup2 } from "./pages/signup2";
import { Signin2 } from "./pages/signin2";
import { SendMoney2 } from "./pages/sendmoney2";
import { SendMoney2user } from "./pages/sendmoney2user";
import { Edituser2 } from "./pages/edituser2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin2" element={<Signin2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard2" element={<Dashboard_new />} />
        <Route path="/sendmoney/:email" element={<Sendmoney />} />
        <Route path="/sendmoney2" element={<SendMoney2 />} />
        <Route path="/sendmoney2user/:email" element={<SendMoney2user />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/edituser2" element={<Edituser2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
