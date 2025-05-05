import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/dashboard";
import { Sendmoney } from "./pages/sendmoney";
import { EditUser } from "./pages/edituser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendmoney/:email" element={<Sendmoney />} />
        <Route path="/edituser" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
