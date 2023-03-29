import "./App.css";
import Games from "./Components/Games/Games";
import Header from "./Components/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Description from "./Components/Description/Description";
import Loader from "./Components/Loader/Loader";
import Register from "./Components/register/Register";
import Login from "./Components/Login/Login";
import { useEffect, useState } from "react";
import Ticket from "./Components/TicketScreen/Ticket";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile.js";
import Faq from "./Components/Faq/faq";
import OrderConfirmed from "./Components/OrderConfirmed/OrderConfirmed";
import Notification from "./Components/Notification/Notification";
import Cart from "./Components/Cart/Cart";
import Demo from "./Components/Description/Screen";
import Jins from "./Components/jins/jins";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { configutation } from "./actions/product";
// import { Socket } from 'socket.io-client';
function App() {
  const dispatch = useDispatch()
  const[countryCode,setCountryCode] = useState("")
  // const {user} = useSelector((state)=>state.userData)
  // let data = {
  //   user_id: user&&user.user_id,
  //   socket_id: "g07wnxHwDJre_l5pAADJ",
  //   machineCode: "UK-WH1-NID1-201",
  // }
  // let emits = {
  //   P:"63ebd13d45a883626f85348e"|M:6318a00045546b21bcf681af|QUE:0

  // }
  // useEffect(() => {
    // socket.on('connect', () => {
    //   console.log("connected");
    // });
    // socket.EVENT_CONNECT('connect',()=>)
    // socket.on("connect", () => socket.emit("hello", `Hi there! I am ${window.navigator.userAgent}`));
    // socket.emit("socket_connect",data)
    // socket.on("sent_que_status",()=>{
    //   console.log("reached")
    // })
    // socket.on("game_que_count",(datas)=>{
    //   console.log(datas,"ques")
    // })
    // socket.on("watchers_count",(datsas)=>{
    //   console.log(datsas,"ques")
    // })
    // return ()=>{
    //   socket.off("socket_connect")
    //   socket.off("connect")
    //   socket.off("game_que_count")
    // }
  // },[socket]);
  
  const state = async()=>{
    try {
    //   fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
    //  .catch(() => console.log('Network request failed, adblock is enabled'));
      await fetch(`http://ip-api.com//json`).then(res=>res.json()).then((data)=>{
        // console.log(data)
        setCountryCode(data.countryCode)
        dispatch(configutation(data.countryCode))
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(()=>{
    state()
    
  },[dispatch,countryCode])
  // console.log(localStorage.getItem("user"))
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prizes/" element={<Games />} />
          <Route path="/game/:id" element={<Description />} />
          {/* <Route path="/:category" element={<Games/>}/> */}
          {/* <Route path="/load" element={<Loader/>}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<Ticket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/Demo" element={<Demo />} />
          {/* <Route path="/socket" element={<Socket/>}/> */}
        </Routes>
        <Footer />
      </Router>

      {/* <Games/> */}
    </div>
  );
}

export default App;
