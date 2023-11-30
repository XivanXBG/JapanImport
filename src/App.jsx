import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { loadAllOffersWithPhotos } from "./services/carsService";

import Home from "./components/Home/home";
import RegisterPage from "./components/Register/register";
import LoginPage from "./components/Login/login";
import Logout from "./components/Logout/logout";
import Create from "./components/Create/Create";
import { useEffect, useState } from "react";


function App() {
  const [offers, setOffers] = useState();
  useEffect(() => {
    loadAllOffersWithPhotos().then((x) => setOffers(x));
    console.log(offers);
  }, []);
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
