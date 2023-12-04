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
import MyOffers from "./components/MyOffers/myOffers";
import Edit from "./components/Edit/edit";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cars" element={<Cars />}></Route>
          <Route path="/cars/:offerId/edit" element={<Edit />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/cars/:offerId" element={<Details />}></Route>
          <Route path="/profile/:userId/my-offers" element={<MyOffers />}></Route>
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
