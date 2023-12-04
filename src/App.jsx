import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { Provider } from "react-redux";
import store from "../src/reducer/store";

import Home from "./components/Home/home";
import RegisterPage from "./components/Register/register";
import LoginPage from "./components/Login/login";
import Logout from "./components/Logout/logout";
import Create from "./components/Create/Create";
import Cars from "./components/Cars/cars";
import Details from "./components/Details/details";
import Profile from "./components/Profile/profile";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cars" element={<Cars />}></Route>

          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/cars/:offerId" element={<Details />}></Route>
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
