import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./Description.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import binoculars from "../../assests/binoculars.png";

import info from "../../assests/info.png";
import userView from "../../assests/GAME - ICON - Queue no bubble ICON.png";

import { useDispatch, useSelector } from "react-redux";
import { gameEntry, getAllGames } from "../../actions/product";

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
import reversePlay from '../../Animation/btn_play_reverse.json'
import infoIcon from "../../assests/info.png";
import Demo from "../Home/Demo";
import pointsBg from "../../assests/Price of Game BG.png";
import { socket } from "../../Socket";
const Description = () => {
  const {id}= useParams()
  const[count,setCount] = useState(0);
  // console.log("url",id)
  const[playAgain,setPlayAgain] = useState(false)
  const [timeoutState, setTimeoutState] = useState(false);
  const [firstMove, setFirstMove] = useState(false);
  const[isKick,setIsKick] = useState(false);
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(true);
  const baseUrl = "https://uat.wincha-online.com";
  const { user } = useSelector((state) => state.userData);
  const [direction, setDirection] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let stateData = location.state;
  const [que, setQue] = useState("");
  console.log(stateData, "stateData");
  // const[baseMessage,setBaseMessage] = useState([])
  const gameData = stateData.game;
  const dataEntry = {
    category_id: 0,
    country_code: user && user.coutryname,
    user_id: user && user.user_id,
  };
  let datas = {
    catalog: gameData && gameData.id,
    playerID: user.id,
    machineCode: gameData && gameData.machine_code,
    source: "android",
    replay: false,
    freeplay: false,
  };
  const { products } = useSelector((state) => state.collectionProducts);
  const { game } = useSelector((state) => state.gameEntry);
  // console.log("its game", game);
  useEffect(() => {
    // console.log("user", user);
    dispatch(getAllGames(dataEntry));
    dispatch(gameEntry(datas));
    console.log(datas)
    if (user === undefined) {
      navigate("/login");
    }
  }, [navigate, dispatch, wait]);


  const [active, setActive] = useState(true);
  // const src1 = `https://wincha-online.com/camera/subscribe.html?cid=1&mcode=${
  //   gameData && gameData.machine_code
  // }`;
  // const src2 = `https://wincha-online.com/camera/subscribe.html?cid=2&mcode=${
  //   gameData && gameData.machine_code
  // }`;
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [failed, setFailed] = useState(false);
  const [moved, setMoved] = useState("");
  const[status,setStatus] = useState({})
  const baseMessage = `${user.user_id}|${game.machineCode}`;
  let socket_connect = {
    user_id: user.user_id,
    socket_id: socket.id,
    machineCode: game.machineCode,
  };
  const checktimeout = () => {
    // if(firstMove===false){
    // setTimeoutState(true)
    socket.emit("peer_message", `${baseMessage}|P_ENDED`);
    socket.emit("peer_message", `${baseMessage}|G_DISCONNECTED`);
    gameLeave()
    console.log("got out");
    
    // }, 5000);

    // }
    // else{
    //   console.log("not timeout")

    // }
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.emit("socket_connect", JSON.stringify(socket_connect));

    socket.on("game_que_count", (queCount) => {
      console.log(queCount);

      const splitWord = queCount.split("|");

      const splitQue = splitWord[splitWord.length - 1].split(":");
      const splitId = splitWord[0].split(":");

      if (splitId[1] === user.user_id) {
        setQue(splitQue[1]);
      }
    });
    socket.on("disconnect", (daata) => {
      console.log(daata);
      console.log("disconnecting the socket");
    });
    socket.on("watchers_count", (count) => {
      console.log(count);
      console.log("watchers_count");
    });
    socket.on("first_move", (moveData) => {
      const move = moveData.split("|");
      setMoved(move[move.length - 1]);
      console.log(moveData);
      console.log(moved, "moved");
    });
    socket.on("second_move", (moveData) => {
      console.log(moveData);
      // console.log(moved,"moved")
    });
    socket.on("get_machine_status", (status) => {
      console.log(status);
      console.log("get_machine_status");
    });
    socket.on("game_started", (status) => {
      console.log(status);
      console.log("game_started");
    });
    socket.on("sensor_message", (sensor) => {
      console.log(sensor);
      console.log("sensor_message");
    });
    socket.on("update_que_status", (sensor) => {
      console.log(sensor);
      const splitedQue = sensor.split('|');
      const userId = splitedQue[0].split(":")
      console.log(userId)
      // console.log(splitedQue[splitedQue.length-1])
      // if(splitedQue[splitedQue.length-1]==="KICK"&&userId[1]===user.user_id){
      //   setIsKick(true)
      //   setPlayAgain(true)
      //   setGameStatus(false);

      // }
      console.log("update_que_status");
    });
    socket.on("request_processing", (sensor) => {
      console.log(sensor);
      console.log("request_processing");
    });
    socket.on("lr_release", (sensor) => {
      console.log(sensor);
      console.log("lr_release");
    });
    socket.on("prize_reset", (sensor) => {
      console.log(sensor);
      console.log("prize_reset");
    });
    socket.on("wait_prize_reset", (sensor) => {
      console.log(sensor);
      console.log("wait_prize_reset");
    });
    socket.on("fw_stop", (sensor) => {
      console.log(sensor);
      console.log("fw_stop");
    });
    // setTimeout(() => {
    //   checktimeout()
    // }, 20000);
  }, [socket, moved, que, timeoutState, firstMove]);

  const firstMoveStart = async (directionMove) => {
    // const P_ENDED = `${baseMessage}|P_ENDED`;
    // const G_DISCONNECTED = `${baseMessage}|G_DISCONNECTED`;
    console.log(moved, "moved");

    if (directionMove === "LEFT") {
      const message = `${baseMessage}|P_LR`;
      socket.emit("peer_message", message);
    } else if (directionMove === "RIGHT") {
      const message = `${baseMessage}|P_RL`;
      socket.emit("peer_message", message);
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
        setFirstMove(false);
      });
  };
  const SecondMoveStart = async () => {
    const message = `${baseMessage}|P_FW`;
    socket.emit("peer_message", message);
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
      .then((data) => {});
  };
  const firstMoveRelease = async (directionMove) => {
    if (directionMove === "RL_STOP") {
      const message = `${baseMessage}|RL_RELEASE`;
      socket.emit("peer_message", message);
      console.log("emited RL");
    } else if (directionMove === "LR_STOP") {
      const message = `${baseMessage}|LR_RELEASE`;
      socket.emit("peer_message", message);
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
    const FW_RELEASE = `${baseMessage}|FW_RELEASE`;
    socket.emit("peer_message",FW_RELEASE);
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
        const P_ENDED = `${baseMessage}|P_ENDED`;
        const G_DISCONNECTED = `${baseMessage}|G_DISCONNECTED`;
        socket.emit("peer_message",P_ENDED);
        socket.emit( "peer_message",G_DISCONNECTED);
        // console.log(data);
        setSecondStep(false);
        // clearTimeout()
        // setQue("")
        setGameStatus(true);
        setTimeout(() => {
          // setGameStatus(false);
          
          setIsKick(true)
          setGameStatus(false);
        setPlayAgain(true)
        }, game && game.machine_delay_time * 1000);
        setTimeout(() => {
          statusApi()
          sessionApi()
        }, game && game.get_status_time * 1000);

      });
  };
  const startGame = async () => {
    const message = `${baseMessage}|P_STARTED`;
    socket.emit("peer_message", message);
    console.log("direction from start", user.user_id);
    await fetch(`${baseUrl}/game/start`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user.user_id,
        source: "android",
        freeplay: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.data[0])
        console.log("starting",data.data[0]);
        setWait(false);
        setDirection(game && game.movement.split("-"));
        setFirstStep(true);
      });
  };
  const [gameStatus, setGameStatus] = useState(false);
  const joinGame = async (e) => { 
    e.preventDefault();
    const message = `${baseMessage}|G_CONNECTED`;
    socket.emit("peer_message", message);
    await socket.on("game_que_count", (queCount) => {
      console.log(queCount);

      const splitWord = queCount.split("|");

      const splitQue = splitWord[splitWord.length - 1].split(":");
      const splitId = splitWord[0].split(":");
      console.log(typeof splitQue[1])
      if (splitId[1] === user.user_id) {
        setQue(splitQue[1]);
      }
    });
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
        console.log("joined",data);

        // setTimeout(() => {
        setGameStatus(true);
        console.log(que, "que");
        if (que==="0") {
          
          console.log("starting joingame");
          

          setWait(false);
          // startGame();
        } else {
          console.log("starting joingame sent");
          setWait(true);

        }
        // }, 5000);
      });
  };
  const statusApi = async () => {
    await fetch(`${baseUrl}/game/status`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      });
  };
  const sessionApi = async () => {
    await fetch(`${baseUrl}/game/session/status`, {
      method: "POST",
      body: JSON.stringify({
        // machineCode: game && game._id,
        user_id:user.user_id,
        machineID:game._id,
        game_status: false, // Status from game status API
        product_id: stateData.game.id,
        game_session_id: status.game_session_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("status.game_session_id",status.game_session_id,)
      });
  };
  // console.log(que,"outside")
  const gameLeave = async()=>{
    await fetch(`${baseUrl}/game/leave`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game.machineCode,
        playerID:user.user_id
      }),
      headers:{
        "Content-type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      navigate(`/prizes/game/${id}`,{state:{game:gameData}});
      // window.location.reload()
      datas.replay=true
      console.log(data);
      console.log(datas.replay)
      dispatch(gameEntry(datas))
      
    })
  }
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
                  {gameStatus ? (
                    que === "0" ? (
                      wait ? (
                        <Lottie
                          animationData={PulseAnime}
                          loop={false}
                          onComplete={() => {
                            // setWait(true)
                            startGame();
                            console.log("reached");
                          }}
                        />
                      ) : firstStep ? (
                        direction && direction[1] === "Right" ? (
                          <button
                            onMouseDown={(e) => {
                              firstMoveStart(
                                direction && direction[1].toUpperCase()
                              );
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
                                // checktimeout()
                                // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                // console.log("finished right")
                                checktimeout();
                              }}
                            />
                          </button>
                        ) : direction && direction[1] === "Left" ? (
                          <button
                            onMouseDown={(e) => {
                              // setFirstMove(true)
                              firstMoveStart(
                                direction && direction[1].toUpperCase()
                              );
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
                                // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                // console.log("finished left")
                                checktimeout();
                              }}
                            />
                          </button>
                        ) : (
                          <Lottie animationData={PulseAnime} loop={true} />
                        )
                      ) : secondStep ? (
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
                            
                          />
                        </button>
                      ) : (
                        <Lottie animationData={PulseAnime} loop={true} />
                      )
                    ) : (
                      <Lottie animationData={waitAnime} loop={false} />
                    )
                  ) : playAgain?<button onClick={()=>{
                    // gameEntry()
                    setGameStatus(true);
                    setWait(false);
                    console.log(que ,"que is replay")
                    let message = `${baseMessage}|P_RESTARTED`;
                    socket.emit("peer_message", message);
                    message = `${baseMessage}|G_CONNECTED`;
                    socket.emit("peer_message", message);
                    // message = `${baseMessage}|P_STARTED`;
                    // socket.emit("peer_message", message);
                    startGame()

                  }}><Lottie animationData={reversePlay} loop={false} onComplete={() => {
                    setFailed(true);
                    // setPlayAgain(false)
                    // socket.emit(
                    //   "peer_message",
                    //   `${baseMessage}|P_ENDED`
                    // );
                    // socket.emit(
                    //   "peer_message",
                    //   `${baseMessage}|G_DISCONNECTED`
                    // );
                    // gameLeave()
                    console.log("finished left");
                    setPlayAgain(false)
                  }}/></button>:(
                    <button
                      onClick={(e) => {
                        // console.log(que,"queCount")
                        joinGame(e);
                      }}
                    >
                      <img src={startImage} />
                    </button>
                  )}
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
