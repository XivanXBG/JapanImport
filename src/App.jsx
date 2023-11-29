import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import RegisterPage from "./components/Register/register";
import LoginPage from "./components/Login/login";
import { AuthProvider } from "./contexts/authContext";
import Logout from "./components/Logout/logout";

function App() {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
