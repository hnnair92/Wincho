
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
function App() {
  
  // const SERVER = "http://3.239.80.132:4000/";
  // var socket = socketClient (SERVER);
  // console.log("reached here");
  //     socket.on('Socket_connect', () => {
  //         console.log(`I'm connected with the back-end`);
  // });

// }
  // useEffect(()=>{
  //   socket.on("Game_que_count",(data)=>{
  //     console.log('====================================');
  //     console.log(data);
  //     console.log('====================================');
  //   })
  // },[socket])
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Games/>}/>
          <Route path="/:category" element={<Games/>}/>
          <Route path="/game/:id" element={<Description/>}/>
          {/* <Route path="/load" element={<Loader/>}/> */}
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tickets" element={<Ticket/>}/>
        </Routes>
      </Router>
      {/* <Games/> */}
    </div>
  );
}

export default App;
