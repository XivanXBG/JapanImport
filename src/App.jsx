import Header from './components/Header/Header';
import {Routes,Route} from 'react-router-dom'
import Home from "./components/Home/home";
function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
    </>)
}

export default App
