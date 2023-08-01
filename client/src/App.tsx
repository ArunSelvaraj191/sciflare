import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
