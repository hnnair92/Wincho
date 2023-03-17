const socket = require('../../Socket')
const baseUrl = "https://uat.wincha-online.com";
export const firstMoveStart = async (directionMove,baseMessage,moved,game,user) => {
    const P_ENDED = `${baseMessage}|P_ENDED`
    const G_DISCONNECTED = `${baseMessage}|G_DISCONNECTED`
    console.log(moved,"moved")
      if(directionMove==="LEFT"){
        const message = `${baseMessage}|P_LR`
        socket.emit("peer_message",message)
      }
      else if(directionMove==="RIGHT"){
        const message = `${baseMessage}|P_RL`
        socket.emit("peer_message",message)
      }
    
    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerId: user && user.user_id,
        command: directionMove,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        
      });
  };
  export const SecondMoveStart = async (baseMessage,game,user) => {
    const message = `${baseMessage}|P_FW`
    socket.emit("peer_message",message)
    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerId: user && user.user_id,
        command: "P_FW",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      });
  };
 export const firstMoveRelease = async (directionMove,baseMessage,game,user,setFirstStep,setSecondStep) => {
    if(directionMove==="RL_STOP"){
      const message = `${baseMessage}|RL_RELEASE`
      socket.emit("peer_message",message)
      console.log("emited RL");
      
    }
    else if(directionMove==="LR_STOP"){
      const message = `${baseMessage}|LR_RELEASE`
      socket.emit("peer_message",message)
      console.log("emited LR");

    }
    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerId: user && user.user_id,
        command: directionMove,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstStep(false);
        setSecondStep(true);
        
      });
  };
  export const secondMoveRelease = async (baseMessage,game,user,setSecondStep,setGameStatus,) => {
    const FW_RELEASE = `${baseMessage}|FW_RELEASE`
    const P_ENDED = `${baseMessage}|P_ENDED`
    const G_DISCONNECTED = `${baseMessage}|G_DISCONNECTED`
    socket.emit("peer_message",FW_RELEASE)
    
    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerId: user && user.user_id,
        command: "FW_STOP",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSecondStep(false);
        setGameStatus(true);
        setTimeout(() => {
          setGameStatus(false);
          socket.emit("peer_message",P_ENDED)
          socket.emit("peer_message",G_DISCONNECTED)
        }, game && game.machine_delay_time * 1000);
      });
  };
  export const startGame = async (baseMessage,game,user,setWait,setDirection,setFirstStep) => {
    const message = `${baseMessage}|P_STARTED`
    socket.emit("peer_message",message)
    await fetch(`${baseUrl}/game/start`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerId: user && user.user_id,
        source: "android",
        freeplay: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("starting");
        setWait(false)
        setDirection(game && game.movement.split("-"));
        setFirstStep(true);
      });
  };
  export const joinGame = async (e,baseMessage,game,user,setWait,setGameStatus,que,setDirection,setFirstStep) => {
    console.log("starting joingame");
    const message = `${baseMessage}|G_CONNECTED`
    socket.emit("peer_message",message)
    e.preventDefault();
    await fetch(`${baseUrl}/game/join`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerID: user && user.user_id,
        freeplay: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("joined");
        setGameStatus(true);
        console.log(que,"que")
        if(que==="0"){
            console.log("starting joingame sent");

            setWait(true)
            startGame(baseMessage,game,user,setWait,setDirection,setFirstStep);
        }
        else{
    console.log("starting joingame false");

          setWait(false)
        }
        
      });
  };

