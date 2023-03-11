import React, { useEffect, useState } from "react";
// import {io} from "socket.io-client";
import socketIO from 'socket.io-client';

import Messages from "./Messages";
import MessageInput from "./MessageInput";

import "./App.css";

function Socket() {
//   const [socket, setSocket] = useState(null);
  const socket = socketIO.connect('http://3.239.80.132:4000/');

//   useEffect(() => {
    

    // console.log(newSocket);
    // console.log(received);
    // return () => newSocket.close();
//   }, [setSocket]);
const connectSocket=()=>{
    const item = socket.emit('Socket_connect', {
        user_id: "632966a3276161e78911c3ca",
        socket_id: "g07wnxHwDJre_l5pAADJ",
        machineCode: "UK-WH1-NID1-202",
      })
    socket.on("Game_que_count",(data)=>{
        console.log(data)
    })
    console.log(item)
}
useEffect(()=>{
    connectSocket()
},[])
//   socket.on('Socket_connect',(data)=>{
//     console.log(data);
//   })
  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default Socket;
