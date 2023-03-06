
import './App.css';
import Games from './Components/Games/Games';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Description from './Components/Description/Description';
import Loader from './Components/Loader/Loader';
import Register from './Components/register/Register';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import Ticket from './Components/TicketScreen/Ticket';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Profile from './Components/Profile/Profile.js'
import Faq from './Components/Faq/faq';
import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed';
import Notification from './Components/Notification/Notification';
import Cart from './Components/Cart/Cart';
import Demo from './Components/Home/Demo';
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/prizes/" element={<Games/>}/>
          <Route path="/prizes/game/:id" element={<Description/>}/>
          {/* <Route path="/:category" element={<Games/>}/> */}
          {/* <Route path="/load" element={<Loader/>}/> */}
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tickets" element={<Ticket/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/order-confirmed" element={<OrderConfirmed/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/Demo" element={<Demo/>}/>
        </Routes>
        <Footer/>
      </Router>
      
       
      {/* <Games/> */}
    </div>
  );
}

export default App;
