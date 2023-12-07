import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
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
import Reviews from "./components/Reviews/reviews";
import FooterComponent from "./components/Footer/footer";
import NotFound from "./components/NotFound/notFound";
import VerifyEmail from "./components/VerifyEmail/verifyEmail";
import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import AuthGuard from "./components/Guards/AuthGuard";
import GuestGuard from "./components/Guards/GuestGuard";
import Wishlist from "./components/Wishlish/wishlist";
import CheckoutPage from "./components/Checkout/checkout";
import Successfull from "./components/Succesfull/successfull";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route element={<AuthGuard />}>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/create" element={<Create />}></Route>
                  <Route path="/wishlist" element={<Wishlist />}></Route>
                  <Route
                    path="/profile/:userId/my-offers"
                    element={<MyOffers />}
                  ></Route>
                  <Route path="/cars/:offerId/edit" element={<Edit />}></Route>
                  <Route path="/checkout" element={<CheckoutPage/>}></Route>
                  <Route path="/successfull" element={<Successfull/>}></Route>
                </Route>
               
                <Route element={<GuestGuard />}>
                  <Route path="/register" element={<RegisterPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                </Route>

                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cars" element={<Cars />}></Route>
                <Route path="/reviews" element={<Reviews />}></Route>
                <Route path="/cars/:offerId" element={<Details />}></Route>
                <Route path="/verify-email" element={<VerifyEmail />}></Route>
                
                <Route
                  path="/reset-password"
                  element={<ForgotPassword />}
                ></Route>
                <Route path="/404" element={<NotFound/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </div>

            <FooterComponent />
          </div>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
