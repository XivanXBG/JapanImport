import Header from './components/Header/Header';
import {Routes,Route} from 'react-router-dom'
import Home from "./components/Home/home";
import RegisterPage from './components/Register/register';
import LoginPage from './components/Login/login';


function App() {
  
  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>

   
    </>)
}

export default App
