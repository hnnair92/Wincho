import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Description.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineRestartAlt, MdFlipCameraIos } from "react-icons/md";
import { RxExclamationTriangle } from "react-icons/rx";
import userIcon from "../../assests/penguin.png";
import binoculars from "../../assests/binoculars.png";
import svgIcon from "../../assests/SIDEpng2.png";
import svgBottom from "../../assests/SIDEBottom.png";
import info from "../../assests/info.png";
import userView from "../../assests/GAME - ICON - Queue no bubble ICON.png";

// import videoDemo from "../../assests/www.ytmp4.Net---Arcade Game_ Pac-Man (1980 Namco (Midway License for US release)).mp4";
import { useDispatch, useSelector } from "react-redux";
import { gameEntry, getAllGames } from "../../actions/product";
import gameScreen from "../../assests/gamescreen.png";
import gameScreen2 from "../../assests/gamescreen2.png";
import io from "socket.io-client";
import { BsArrowLeft, BsArrowRight, BsArrowUp } from "react-icons/bs";
// import svgIcon from '../../assests/sideIcon.png';
import restartImg from "../../assests/Last Win Button.png";
import cameraImage from "../../assests/Switch Camera Button.png";
import playInfo from "../../assests/How to Play Button.png";
import reportImage from "../../assests/Report Issue Icon.png";
import startImage from "../../assests/Play Button.png";
import Lottie from "lottie-react";
import RightArrow from "../../Animation/arrow_right.json";
import LeftArrow from "../../Animation/left_arrow.json";
import UpArrow from "../../Animation/arrow_up.json";
import waitAnime from "../../Animation/wait_reverse.json";
import PulseAnime from "../../Animation/wait_pulse.json";
import ticketIcon from "../../assests/golden-ticket.png";
import infoIcon from "../../assests/info.png";
import Demo from "../Home/Demo";
import pointsBg from "../../assests/Price of Game BG.png";
import { socket } from "../../Socket";
const Description = () => {
  const[timeout,setTimeout] = useState(false)
  const[firstMove,setFirstMove] = useState(false)
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(true);
  const baseUrl = "https://uat.wincha-online.com";
  const { user } = useSelector((state) => state.userData);
  const [direction, setDirection] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let stateData = location.state;
  const[que,setQue] = useState("0")
  // const[baseMessage,setBaseMessage] = useState([])
  const gameData = stateData.game;
  const dataEntry = {
    category_id: 0,
    country_code: user && user.coutryname,
    user_id: user && user.user_id,
  };
  const { products } = useSelector((state) => state.collectionProducts);
  const { game } = useSelector((state) => state.gameEntry);
  // console.log("its game", game);
  useEffect(() => {
    // console.log("user", user);
    dispatch(getAllGames(dataEntry));
    dispatch(gameEntry(datas));

    if (user === undefined) {
      navigate("/login");
    }
  }, [navigate, dispatch, wait]);
  const datas = {
    catalog: gameData && gameData.id,
    playerID: user && user.id,
    machineCode: gameData && gameData.machine_code,
    source: "android",
    replay: false,
    freeplay: false,
  };

  const [active, setActive] = useState(true);
  const src1 = `https://wincha-online.com/camera/subscribe.html?cid=1&mcode=${
    gameData && gameData.machine_code
  }`;
  const src2 = `https://wincha-online.com/camera/subscribe.html?cid=2&mcode=${
    gameData && gameData.machine_code
  }`;
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [failed, setFailed] = useState(false);
  const[moved,setMoved] = useState("")
  const baseMessage=`${user.user_id}|${game.machineCode}`
  let socket_connect = {
    user_id: user.user_id,
    socket_id: socket.id,
    machineCode: game.machineCode,
  }
  const checktimeout = ()=>{
    if(firstMove===false){
      // setTimeout(true)
      // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
      // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
      console.log("got out");
    }
    else{
      console.log("not timeout")

    }
  }
  useEffect(()=>{
  

    // console.log(JSON.stringify(datassssss))
    // console.log(typeof user.user_id)
    // console.log(typeof game.machineCode)
    socket.on("connect",()=>{
      console.log("connected")
    })
      socket.emit("socket_connect",JSON.stringify(socket_connect))
      
    
    socket.on("game_que_count",(queCount)=>{
      console.log(queCount);
      
      const splitWord = queCount.split("|")
    
      const splitQue = splitWord[splitWord.length-1].split(":")
      const splitId = splitWord[0].split(":")

      // console.log(splitQue[1])
      // console.log(splitId[1],"id")
      if(splitId[1]===user.user_id){
        setQue(splitQue[1])
        // console.log("yes")
      }
    })
    socket.on("disconnect",(daata)=>{
      console.log(daata);
      console.log("disconnecting");
    })
    socket.on("watchers_count",(count)=>{
      console.log(count)
      console.log("watchers_count")
    })
    socket.on("first_move",(moveData)=>{
      const move = moveData.split("|")
      setMoved(move[move.length-1])
      console.log(moveData)
      console.log(moved,"moved")
    })
    socket.on("get_machine_status",(status)=>{
      console.log(status)
      console.log("get_machine_status")
    })
    socket.on("game_started",(status)=>{
      console.log(status)
      console.log("game_started")
    })
    socket.on("sensor_message",(sensor)=>{
      console.log(sensor)
      console.log("sensor_message")
    })
    socket.on("update_que_status",(sensor)=>{
      console.log(sensor)
      console.log("update_que_status")
    })
    socket.on("request_processing",(sensor)=>{
      console.log(sensor)
      console.log("request_processing")
    })
    socket.on("lr_release",(sensor)=>{
      console.log(sensor)
      console.log("lr_release")
    })
    socket.on("prize_reset",(sensor)=>{
      console.log(sensor)
      console.log("prize_reset")
    })
    socket.on("wait_prize_reset",(sensor)=>{
      console.log(sensor)
      console.log("wait_prize_reset")
    })
    socket.on("fw_stop",(sensor)=>{
      console.log(sensor)
      console.log("fw_stop")
    })
    // setTimeout(() => {
    //   checktimeout()
    // }, 10000);
    // return()=>{
    //   socket.on("disconnect",(data)=>{
    //     console.log("disconnected")
    //   })
    // }
  },[socket,moved,que,timeout,firstMove])
  
  // console.log("direction", direction);
  const firstMoveStart = async (directionMove) => {
    const P_ENDED = `${baseMessage}|P_ENDED`
    const G_DISCONNECTED = `${baseMessage}|G_DISCONNECTED`
    console.log(moved,"moved")
    // while(moved==="MOVED"){
    //   console.log("called firstMoveStart")
      if(directionMove==="LEFT"){
        const message = `${baseMessage}|P_LR`
        socket.emit("peer_message",message)
      }
      else if(directionMove==="RIGHT"){
      // console.log(baseMessage,"baseMessage firstMoveStart")
      // console.log(moved,"moved firstMoveStart")
        const message = `${baseMessage}|P_RL`
        socket.emit("peer_message",message)
      }
    // }
    
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
        // setFirstMove(false)
        // console.log(data);
        
        
      });
  };
  const SecondMoveStart = async () => {
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
        // console.log(data);
      });
  };
  const firstMoveRelease = async (directionMove) => {
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
        // console.log(data);
        setFirstStep(false);
        setSecondStep(true);
        // setTimeout(() => {
        //   setFailed(true);
        //   setSecondStep(false);
        //   setGameStatus(false);
        // }, 150000);
        // clearTimeout()
      });
  };
  const secondMoveRelease = async () => {
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
        // console.log(data);
        setSecondStep(false);
        // clearTimeout()
        setGameStatus(true);
        setTimeout(() => {
          setGameStatus(false);
          socket.emit("peer_message",P_ENDED)
          socket.emit("peer_message",G_DISCONNECTED)
        }, game && game.machine_delay_time * 1000);
      });
  };
  const startGame = async () => {
    const message = `${baseMessage}|P_STARTED`
    socket.emit("peer_message",message)
    // console.log("direction from start", direction);
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
  const [gameStatus, setGameStatus] = useState(false);
  const joinGame = async (e) => {
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
        
          // setTimeout(() => {
        setGameStatus(true);
        console.log(que,"que")
        if(que==="0"){
            console.log("starting joingame sent");

            setWait(true)
            startGame();
        }
        else{
    console.log("starting joingame false");

          setWait(false)
        }
        // }, 5000);
        
      });
  };
  console.log(que,"outside")

  return (
    <div className={style.Container}>
      {/* <div className={style.Overlay}></div> */}
      <div className={style.Description}>
        {active ? (
          <div className={style.NowPlaying}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <div className={style.Image}>
              <img src={gameData.featured_image.large} alt="" />
            </div>
            <p className={style.title}>{gameData.title}</p>
            <div className={style.arrow}>
              <IoIosArrowUp
                className={style.arrowIcon}
                onClick={() => {
                  setActive(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={style.minimized}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <p className={style.title}>{gameData.title}</p>
            <div className={style.arrow}>
              <IoIosArrowDown
                className={style.arrowIcon}
                onClick={() => {
                  setActive(true);
                }}
              />
            </div>
          </div>
        )}

        <div className={style.OtherGames}>
          <div className={style.OtherBtn}>
            <Link to="/prizes">
              <button>EXIT GAME</button>
            </Link>
          </div>
          <div className={style.OtherTitle}>
            <p>YOU MIGHT ALSO LIKE</p>
          </div>
          <div className={style.AllGames}>
            {products &&
              products.map((gameItem, index) => {
                if (index < 6) {
                  return (
                    <Link
                      to={`/prizes/game/${gameItem.id}`}
                      state={{ game: gameItem, user: info }}
                      className={style.GameAnchor}
                      key={index}
                    >
                      <div className={style.SingleGame}>
                        <div className={style.ProductImage}>
                          <img src={gameItem.featured_image.large} alt="" />
                        </div>
                        <div className={style.ProductContent}>
                          <div className={style.ProductTitle}>
                            <p>{gameItem.title}</p>
                          </div>
                          <div className={style.PriceSection}>
                            <div className={style.TicketIcon}>
                              <img src={ticketIcon} alt="" />
                            </div>
                            <div className={style.ProductPrice}>
                              <p>{gameItem.price}</p>
                            </div>
                            <div className={style.InfoIcon}>
                              <img src={infoIcon} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
          </div>
        </div>
        <div className={style.gameSection}>
          <div className={style.GamePlay}>
            <div className={style.Screen}>
              <div className={style.icons}>
                <div className={style.Magnify}>
                  <img src={binoculars} alt="" />
                  <span>{game.total_viewers ? game.total_viewers : 0}</span>
                </div>
                <div className={style.life}>
                  <div className={style.lifeIcons}>
                    <img src={userView} alt="" className={style.userIcons1} />
                    {/* <img src={userIcon} alt="" className={style.userIcons2} />
                <img src={userIcon} alt="" className={style.userIcons3} /> */}
                  </div>
                  <span>{game.total_players ? game.total_players : 0}</span>
                </div>
              </div>
              {/* <iframe src={src1} title={gameData.title} className={camera===true?style.showVideo:style.hideVideo}></iframe>
            <iframe src={src2} title={gameData.title} className={camera===false?style.showVideo:style.hideVideo}></iframe> */}
              <div
                className={camera === true ? style.showVideo : style.hideVideo}
              >
                {game && game.camera_data ? (
                  <Demo
                    sessionId={
                      game &&
                      game.camera_data &&
                      game.camera_data[0] &&
                      game.camera_data[0].session
                    }
                    token={
                      game &&
                      game.camera_data &&
                      game.camera_data[0] &&
                      game.camera_data[0].token
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                className={camera === false ? style.showVideo : style.hideVideo}
              >
                {game && game.camera_data ? (
                  <Demo
                    sessionId={
                      game &&
                      game.camera_data &&
                      game.camera_data[1] &&
                      game.camera_data[1].session
                    }
                    token={
                      game &&
                      game.camera_data &&
                      game.camera_data[1] &&
                      game.camera_data[1].token
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              {/* <div className={camera===true?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""}
            </div>
            <div className={camera===false?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""}
            </div> */}
              {/* {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""} */}
            </div>
          </div>
          <div className={style.MobileControls}>
            <div className={style.ActionBtn}>
              <div className={style.Restart}>
                <img
                  src={cameraImage}
                  alt=""
                  onClick={() => {
                    camera ? setCamera(false) : setCamera(true);
                  }}
                />
              </div>
              <div className={style.Start}>
                <div className={style.Play}>
                  <div className={style.Points}>
                    <img src={pointsBg} alt="" />
                    <p>{user && user.point}</p>
                  </div>
                  {gameStatus
                  ?
                  que==="0"
                  ?wait?<Lottie animationData={PulseAnime} loop={true}/>
                  :firstStep?direction && direction[1] === "Right"?
                  <button
                  onMouseDown={(e) => {
                    firstMoveStart(
                      direction && direction[1].toUpperCase()
                    )
                  }}
                  onMouseUp={() => {
                    firstMoveRelease("RL_STOP");
                  }}
                  onTimeUpdate={(e) => {
                    // console.log(e);
                  }}
                >
                  <Lottie
                    animationData={RightArrow}
                    loop={false}
                    onComplete={() => {
                      setFailed(true);
                    }}
                  />
                </button>
                  :direction && direction[1] === "Left"?
                  <button
                  onMouseDown={(e) => {
                    // setFirstMove(true)
                    firstMoveStart(
                      direction && direction[1].toUpperCase()
                    )
                  }}
                  onMouseUp={() => {
                    firstMoveRelease("LR_STOP");
                  }}
                >
                  <Lottie
                    animationData={LeftArrow}
                    loop={false}
                    onComplete={() => {
                      setFailed(true);
                    }}
                  />
                
                </button>
                  :<Lottie animationData={PulseAnime} loop={true} />
                  :secondStep?
                  <button
                        onMouseDown={(e) => {
                          SecondMoveStart();
                          // console.log("e.target.value");
                        }}
                        onMouseUp={() => {
                          secondMoveRelease();
                        }}
                      >
                        <Lottie
                          animationData={UpArrow}
                          loop={false}
                          onComplete={() => {
                            setFailed(true);
                          }}
                        />
                      </button>
                  :<Lottie animationData={PulseAnime} loop={true} />
                  :<Lottie animationData={waitAnime} loop={false} />
                  :<button
                      onClick={(e) => {
                        // console.log(que,"queCount")
                        joinGame(e);
                      }}
                    >
                      <img src={startImage} />
                    </button>
                    }
                    
                </div>
                <div className={style.ReportDiv}>
                  <img src={reportImage} alt="" />
                </div>
              </div>
              <div className={style.CameraDiv}>
                <div className={style.userDiv}>
                  <img src={playInfo} alt="" />
                </div>
                <div className={style.AngleChanger}>
                  <img src={restartImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.leftSide}></div>
      </div>
    </div>
  );
};

export default Description;
