import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Dashboard_new } from "./pages/dashboard";
import { Home2 } from "./pages/home";
import { Signup2 } from "./pages/signup";
import { Signin2 } from "./pages/signin";
import { SendMoney2 } from "./pages/sendmoney";
import { SendMoney2user } from "./pages/sendmoneyTouser";
import { Edituser2 } from "./pages/edituser";
import { History } from "./pages/history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/signup" element={<Signup2 />} />
        <Route path="/signin" element={<Signin2 />} />
        <Route path="/dashboard" element={<Dashboard_new />} />
        <Route path="/sendmoney/:reciever_email" element={<SendMoney2user />} />
        <Route path="/sendmoney" element={<SendMoney2 />} />
        <Route path="/edituser" element={<Edituser2 />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
