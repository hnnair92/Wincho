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
import WinScreen from "./Components/winScreen/winScreen";
import Success from "./Components/successPage/success";
// import { Socket } from 'socket.io-client';
function App() {
  const dispatch = useDispatch()
  const [userJoined,setUserJoined] = useState(false)
  const [pageUrl,setPageUrl] = useState("")
  // const navigate = useNavigate()
  const [count,setCount] = useState(0)
  const [gameMusic,setGameMusic] = useState(localStorage.getItem("music")?localStorage.getItem("music"):localStorage.setItem("music",JSON.stringify(true)))
  const [gameSound,setGameSound] = useState(localStorage.getItem("sound")?localStorage.getItem("sound"):localStorage.setItem("sound",JSON.stringify(true)))
  const userId = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","");
  useEffect(()=>{
    localStorage.setItem("music",gameMusic)
    console.log(typeof gameMusic)
  },[gameMusic])
  useEffect(()=>{
    if(userId===undefined||userId===null||userId===""){
      localStorage.removeItem("user")
      // window.location="/login";
      
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("sound",gameSound)
    console.log(typeof gameSound)

  },[gameSound])
  useEffect(() => {
    const handleContextmenu = e => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
}, [ ])
  const[countryCode,setCountryCode] = useState("")

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
  const ipAdd = async()=>{
    setCount(count+1)
    try {
    //   fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
    //  .catch(() => console.log('Network request failed, adblock is enabled'));
      await fetch(`https://api.ipify.org/?format=json`).then(res=>res.json()).then((data)=>{
        console.log(data,count)
        // setCountryCode(data.countryCode)
        // dispatch(configutation(data.countryCode))
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
  useEffect(()=>{
    // setInterval(()=>{
      ipAdd()
    // },1)
  },[])
  const [active,setActive] = useState(false)
  const [gamePlay,setGamePlay] = useState(false)
  useEffect(()=>{
    console.log(active,"active from APP.JS");
  },[active])
  let value = new Date().getTimezoneOffset()
let time = new Date().valueOf();
let id = time*value
console.log(id)
  // console.log(localStorage.getItem("user"))
  return (
    <div className="App">
      <Router>
        <Header userJoined={userJoined} setUserJoined={setUserJoined} setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prizes/" element={<Games userJoined={userJoined} setUserJoined={setUserJoined} setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          <Route path="/game/:id" element={<Description userJoined={userJoined} setUserJoined={setUserJoined} setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active}  setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          {/* <Route path="/:category" element={<Games/>}/> */}
          {/* <Route path="/load" element={<Loader/>}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart  setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<Ticket  setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          <Route path="/profile" element={<Profile  setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          <Route path="/faq" element={<Faq  setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/notifications" element={<Notification  setPageUrl={setPageUrl} pageUrl={pageUrl} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} setActive={setActive} active={active} setGamePlay={setGamePlay} gamePlay={gamePlay}/>} />
          {/* <Route path="/Demo" element={<Demo />} /> */}
          <Route path="/win-screen" element={<WinScreen />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/cancel" element={<Ticket />} />
          {/* <Route path="/socket" element={<Socket/>}/> */}
        </Routes>
        <Footer setGamePlay={setGamePlay} gamePlay={gamePlay}/>
      </Router>

      {/* <Games/> */}
    </div>
  );
}

export default App;
