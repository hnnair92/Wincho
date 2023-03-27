import React, { useState, useRef, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  usePrompt,
} from "react-router-dom";
import style from "./Description.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import binoculars from "../../assests/binoculars.png";
import io from "socket.io-client";

import info from "../../assests/info.png";
import userView from "../../assests/GAME - ICON - Queue no bubble ICON.png";

import { useDispatch, useSelector } from "react-redux";
import { configutation, gameEntry, getAllGames } from "../../actions/product";

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
import reversePlay from "../../Animation/btn_play_reverse.json";
import infoIcon from "../../assests/info.png";
import Demo from "../Home/Demo";
import pointsBg from "../../assests/Price of Game BG.png";
import { socket } from "../../Socket";
import { AllAnimation } from "../../Animation/allAnimation";
import { updateProfile } from "../../actions/user";
import greenPrizeMove from '../../assests/Assistance Button.png'
import GrayPrizeMove from '../../assests/Assistance Pressed Button.png'
const Description = () => {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    if (gameStatus) {
      window.addEventListener("beforeunload", alertUser);
    }
    // window.addEventListener("unload", handleEndConcert);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      // window.removeEventListener("unload", handleEndConcert);
      // handleEndConcert();
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
    setExit(true);
  };
  // const handleEndConcert = async () => {
  //   await fetcher({
  //     url: endConcert(concert.id),
  //     method: "PUT",
  //   });
  // };

  const dispatch = useDispatch();
  const baseUrl = "https://uat.wincha-online.com";
  const { user } = useSelector((state) => state.profile);
  const userData = useSelector((state) => state.userData);
  const { configuration } = useSelector((state) => state.configuration);
  const navigate = useNavigate();
  const location = useLocation();
  let stateData = location.state;
  console.log(stateData.game.price);
  const [viewCount, setViewCount] = useState(0);
  const [ids, setId] = useState("");
  const [playAgain, setPlayAgain] = useState(false);
  const [firstMove, setFirstMove] = useState(false);
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(true);
  const [direction, setDirection] = useState([]);
  const [que, setQue] = useState("");
  const [active, setActive] = useState(true);
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [moved, setMoved] = useState("");
  const [status, setStatus] = useState({});
  const [gameStart, setGameStart] = useState({});
  const [gameStatus, setGameStatus] = useState(false);
  const [waitAnimation, setWaitAnime] = useState({});
  const [session, setSession] = useState({});
  const [userFreePlay, setUserFreePlay] = useState(
    JSON.parse(localStorage.getItem("times"))
      ? JSON.parse(localStorage.getItem("times"))
      : 0
  );
  const[count,setCount] = useState(0)
  console.log(stateData, "stateData");
  useEffect(() => {
    localStorage.getItem("times")
      ? localStorage.setItem("times", JSON.stringify(userFreePlay))
      : localStorage.setItem("times", JSON.stringify(0));
  }, [userFreePlay]);
  console.log(userFreePlay, "userFreePlay");
  console.log(stateData, "stateData");
  const onFocus = (e) => {
    console.log("Tab is in focus", e);
  };
  const onBlur = (e) => {
    console.log("Tab is blurred", e);
  };
  console.log(waitAnime);
  const checkWaitAnime = () => {
    console.log(game.machine_delay_time, "its the delay time");
    switch (game.machine_delay_time) {
      case 10:
        setWaitAnime(AllAnimation.wait_10);
        break;
      case 15:
        setWaitAnime(AllAnimation.wait_15);
        break;
      case 20:
        setWaitAnime(AllAnimation.wait_20);
        break;
      case 25:
        setWaitAnime(AllAnimation.wait_25);
        break;
      case 30:
        setWaitAnime(AllAnimation.wait_30);
        break;
      case 35:
        setWaitAnime(AllAnimation.wait_35);
        break;
      case 40:
        setWaitAnime(AllAnimation.wait_40);
        break;
      case 45:
        setWaitAnime(AllAnimation.wait_45);
        break;
      case 50:
        setWaitAnime(AllAnimation.wait_50);
        break;

      default:
        setWaitAnime({});
    }
  };
  useEffect(() => {
    dispatch(updateProfile(userData.user));
  }, [dispatch]);
  useEffect(() => {
    console.log(window.navigator);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("offline", () => {
      console.log("I am offline.");
    });
    //
    window.addEventListener("online", () => {
      console.log("I am back online.");
    });

    onFocus();
    return () => {
      // usePrompt("Hello from usePrompt -- Are you sure you want to leave?", isBlocking);
      window.addEventListener("offline", () => {
        console.log("I am offline.");
      });

      window.addEventListener("online", () => {
        console.log("I am back online.");
      });
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [window]);
  const gameData = stateData.game;
  const dataEntry = {
    category_id: 0,
    country_code: user && user.coutryname,
    user_id: user && user._id,
  };
  let datas = {
    catalog: gameData && gameData.id,
    playerID: user && user._id,
    machineCode: gameData && gameData.machine_code,
    source: "web",
    replay: false,
    freeplay: false,
  };
  const { products } = useSelector((state) => state.collectionProducts);
  const { game } = useSelector((state) => state.gameEntry);

  useEffect(() => {
    dispatch(getAllGames(dataEntry));
    dispatch(gameEntry(datas));
    console.log(datas);
    if (user === undefined) {
      navigate("/login");
    }
  }, [navigate, dispatch, wait]);

  const baseMessage = `${user && user._id}|${game && game.machineCode}`;
  let socket_connect = {
    user_id: user && user._id,
    socket_id: socket.id,
    machineCode: game && game.machineCode,
  };
  // console.log(socket_connect);
  const checktimeout = (id) => {
    // socket.disconnect();
    //       console.log("socket disconnected of user", user._id);
    //       console.log("socket disconnected of user ids", ids);
    //       setTimeout(()=>{
    //         console.log(socket)
    //         socket.connect({'forceNew': true});
    //         socket.on('connect', function() {
    //           console.log('Connected!');
    //         });
    //         socket.emit("socket_connect", JSON.stringify(socket_connect));
    //         console.log(socket)

    //       },1000)
    // if(firstMove===false){
    socket.emit("peer_message", `${baseMessage}|P_ENDED`);
    socket.emit("peer_message", `${baseMessage}|G_DISCONNECTED`);
    datas.replay = true;
    console.log(datas.replay);
    dispatch(gameEntry(datas));
    if (secondStep === false && firstStep === false) {
      gameLeave(id, true);
    } else {
      gameLeave(id, false);
    }
    console.log(datas);

    // console.log("got out");
    // }, 5000);
    // }
    // else{
    //   console.log("not timeout")
    // }
  };
  useEffect(() => {
    if (game) {
      checkWaitAnime();
    }
  }, [game]);
  console.log(waitAnimation);
  useEffect(() => {
    console.log(socket);
    dispatch(configutation());
    console.log(configuration.FREE_PLAY_LIMIT);

    socket.on("connect", () => {
      console.log("connected");
      console.log(socket);
    });
    socket.emit("socket_connect", JSON.stringify(socket_connect));
  }, []);
  useEffect(() => {
    if (socket.connected === false) {
      socket.on("connect", () => {
        console.log("connected");
      });
    }

    socket.on("game_que_count", (queCount) => {
      console.log(queCount);
      const splitWord = queCount.split("|");
      const splitQue = splitWord[splitWord.length - 1].split(":");
      const splitId = splitWord[0].split(":");

      if (splitId[1] === user._id) {
        setQue(splitQue[1]);
      }
    });
    socket.on("disconnect", (daata) => {
      console.log(daata);
      console.log("disconnecting the socket");
      socket.on("connect", () => {
        console.log("connected after ");
      });
      socket.emit("socket_connect", JSON.stringify(socket_connect));
    });
    socket.on("watchers_count", (count) => {
      console.log(count);
      const splitCount = count.split("|");
      const num = splitCount[splitCount.length - 1].split(":");
      setViewCount(num[1]);
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
      const splitedQue = sensor.split("|");
      const userId = splitedQue[0].split(":");
      console.log(userId);
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
  }, [socket, moved, que, firstMove]);

  const firstMoveStart = async (directionMove) => {
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
        playerID: user && user._id,
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
        playerID: user && user._id,
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
        playerID: user && user._id,
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
  const secondMoveRelease = async () => {
    const FW_RELEASE = `${baseMessage}|FW_RELEASE`;
    socket.emit("peer_message", FW_RELEASE);
    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game && game.machineCode,
        playerID: user && user._id,
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
        socket.emit("peer_message", P_ENDED);
        socket.emit("peer_message", G_DISCONNECTED);

        setSecondStep(false);

        setGameStatus(true);
        setTimeout(() => {
          setGameStatus(false);
          setPlayAgain(true);
        }, game && game.machine_delay_time * 1000);
        setTimeout(() => {
          statusApi();
          sessionApi();
        }, game && game.get_status_time * 1000);
      });
  };
  const fetchPoints = async () => {
    console.log(que, "que from fetch points");
    await fetch(`${baseUrl}/points/update`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: user._id,
        point: stateData.game.price,
        credicts: "false",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateProfile(user._id));
        console.log(data);
        startGame();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkQue = async () => {
    try {
      await fetch(`${baseUrl}/game/player/que/verify`, {
        method: "POST",
        body: JSON.stringify({
          playerID: user._id,
          machineID: game._id,
          source: "web",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setWait(false);
          console.log(data);
          if (data.status === true) {
            fetchPoints();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const startGame = async () => {
    const message = `${baseMessage}|P_STARTED`;
    socket.emit("peer_message", message);
    console.log("direction from start", user._id);
    await fetch(`${baseUrl}/game/start`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        source: "web",
        freeplay: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGameStart(data.data[0]);
        console.log("starting", data.data[0]);
        setWait(false);
        setDirection(game && game.movement.split("-"));
        setFirstStep(true);
        setCount(count+1)
      });
  };
  const joinGame = async (e) => {
    e.preventDefault();
    const intPrice = parseInt(stateData.game.price);
    const intPoints = parseInt(user.point);
    if (intPrice <= intPoints) {
      console.log(intPoints >= intPrice);
      const message = `${baseMessage}|G_CONNECTED`;
      socket.emit("peer_message", message);
      await socket.on("game_que_count", (queCount) => {
        console.log(queCount);

        const splitWord = queCount.split("|");

        const splitQue = splitWord[splitWord.length - 1].split(":");
        const splitId = splitWord[0].split(":");
        console.log(typeof splitQue[1]);
        if (splitId[1] === user._id) {
          setQue(splitQue[1]);
        }
      });
      await fetch(`${baseUrl}/game/join`, {
        method: "POST",
        body: JSON.stringify({
          machineCode: game && game.machineCode,
          playerID: user && user._id,
          freeplay: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("joined", data);

          // setTimeout(() => {
          setGameStatus(true);
          console.log(que, "que");
          if (que === "0") {
            console.log("starting joingame");

            setWait(false);
            // startGame();
          } else {
            console.log("starting joingame sent");
            setWait(true);
          }
          // }, 5000);
        });
    } else {
      // navigate("/tickets");
      console.log(intPoints >= intPrice);
      console.log("intPoints", user);
      console.log("intPrice", intPrice);
    }
  };
  const statusApi = async () => {
    await fetch(`${baseUrl}/game/status`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      });
  };
  const sessionApi = async () => {
    await fetch(`${baseUrl}/game/session/status`, {
      method: "POST",
      body: JSON.stringify({
        // machineCode: game && game._id,
        user_id: user._id,
        machineID: game._id,
        game_status: status, // Status from game status API
        product_id: stateData.game.id,
        game_session_id: gameStart.game_session_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSession(data.data[0]);
        if (data.status === "True") {
          AddtoCart();
        }
        console.log("status.game_session_id", gameStart.game_session_id);
      });
  };
  // console.log(que,"outside")
  const gameLeave = async (idData, status) => {
    await fetch(`${baseUrl}/game/leave`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        timeout_status: "",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // navigate(`/prizes/game/${id}`,{state:{game:gameData}});
        if (user._id === idData) {
          socket.disconnect();
          console.log("socket disconnected of user", user._id);
          console.log("socket disconnected of user ids", ids);
          setTimeout(() => {
            console.log(socket);
            socket.connect({ forceNew: true });
            socket.on("connect", function () {
              console.log("Connected!");
            });
            socket.emit("socket_connect", JSON.stringify(socket_connect));
            console.log(socket);
          }, 1000);
        } else {
          console.log("not getting disconnected");
          console.log("socket not disconnected of user", user._id, ids);
        }

        window.location.reload();
      });
  };
  const AddtoCart = async () => {
    await fetch(`${baseUrl}//cart/add`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user._id,
        product_id: stateData.id,
        game_status: status,
        machineID: game._id,
        archiveid: session.archiveid,
        game_session_id: game.game_session_id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        navigate("/order-confirmed");
      });
  };
  return (
    <div className={style.Container}>
      {exit ? (
        <div>
          <p>Are you sure you want to leave this page?</p>
        </div>
      ) : (
        ""
      )}
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
                          <img src={gameItem.featured_image.thumbnail} alt="" />
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
                  <span>{viewCount ? viewCount : 0}</span>
                </div>
                <div className={style.life}>
                  <div className={style.lifeIcons}>
                    <img src={userView} alt="" className={style.userIcons1} />
                    {/* <img src={userIcon} alt="" className={style.userIcons2} />
                <img src={userIcon} alt="" className={style.userIcons3} /> */}
                  </div>
                  <span>{que ? que : 0}</span>
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
                <div className={style.CameraChanger}>
                  <img
                    src={cameraImage}
                    alt=""
                    onClick={() => {
                      camera ? setCamera(false) : setCamera(true);
                    }}
                  />
                </div>
                <div className={style.PrizeMove}>
                    {count%configuration.FREE_PLAY_LIMIT===0&&count!==0?
                    <img src={greenPrizeMove} />
                  :
                    // <img src={GrayPrizeMove} />
                    ""
                      
                  }
                </div>
               

                {/* <img
                  src={cameraImage}
                  alt=""
                  onClick={() => {
                    camera ? setCamera(false) : setCamera(true);
                  }}
                /> */}
              </div>
              <div className={style.Start}>
                <div className={style.Play}>
                  <div className={style.Points}>
                    <img src={pointsBg} alt="" />
                    <p>{stateData.game.price}</p>
                  </div>
                  {gameStatus ? (
                    que === "0" ? (
                      wait ? (
                        <Lottie
                          animationData={PulseAnime}
                          loop={false}
                          onComplete={() => {
                            // setWait(true)
                            checkQue();
                            console.log("reached");
                          }}
                        />
                      ) : firstStep ? (
                        direction && direction[1] === "Right" ? (
                          <div className={style.CheckCamera}>
                            <button
                              className={
                                camera === true
                                  ? style.ShowCamera
                                  : style.hideCamera
                              }
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
                                  // setFailed(true);
                                  // checktimeout()
                                  // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                  // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                  // console.log("finished right")
                                  checktimeout(user._id);
                                }}
                              />
                            </button>
                            :
                            <button
                              className={
                                camera === true
                                  ? style.hideCamera
                                  : style.ShowCamera
                              }
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
                              <Lottie animationData={UpArrow} loop={false} />
                            </button>
                          </div>
                        ) : direction && direction[1] === "Left" ? (
                          <div className={style.CheckCamera}>
                            <button
                              className={
                                camera === true
                                  ? style.ShowCamera
                                  : style.hideCamera
                              }
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
                                  // setFailed(true);
                                  // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                  // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                  // console.log("finished left")
                                  checktimeout(user._id);
                                }}
                              />
                            </button>
                            :
                            <button
                              className={
                                camera === true
                                  ? style.hideCamera
                                  : style.ShowCamera
                              }
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
                              <Lottie animationData={UpArrow} loop={false} />
                            </button>
                          </div>
                        ) : (
                          ""
                        )
                      ) : secondStep ? (
                        <div className={style.CheckCamera}>
                          <button
                            className={
                              camera === true
                                ? style.ShowCamera
                                : style.hideCamera
                            }
                            onMouseDown={(e) => {
                              SecondMoveStart();
                              // console.log("e.target.value");
                            }}
                            onMouseUp={() => {
                              secondMoveRelease();
                            }}
                          >
                            <Lottie animationData={UpArrow} loop={false} />
                          </button>
                          <div
                            className={
                              camera === true
                                ? style.hideCamera
                                : style.ShowCamera
                            }
                          >
                            <button
                              className={
                                direction && direction[1] === "Left"
                                  ? style.Show
                                  : style.hide
                              }
                              onMouseDown={(e) => {
                                SecondMoveStart();
                                // console.log("e.target.value");
                              }}
                              onMouseUp={() => {
                                secondMoveRelease();
                              }}
                            >
                              <Lottie
                                animationData={RightArrow}
                                loop={false}
                                onComplete={() => {
                                  // setFailed(true);
                                  // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                  // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                  // console.log("finished left")
                                  checktimeout(user._id);
                                }}
                              />
                            </button>

                            <button
                              className={
                                direction && direction[1] === "Right"
                                  ? style.Show
                                  : style.hide
                              }
                              onMouseDown={(e) => {
                                SecondMoveStart();
                                // console.log("e.target.value");
                              }}
                              onMouseUp={() => {
                                secondMoveRelease();
                              }}
                            >
                              <Lottie
                                animationData={LeftArrow}
                                loop={false}
                                onComplete={() => {
                                  // setFailed(true);
                                  // socket.emit("peer_message",`${baseMessage}|P_ENDED`)
                                  // socket.emit("peer_message",`${baseMessage}|G_DISCONNECTED`)
                                  // console.log("finished left")
                                  checktimeout(user._id);
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Lottie animationData={waitAnimation} loop={false} />
                      )
                    ) : (
                      <Lottie
                        animationData={AllAnimation.wait_R_G}
                        loop={false}
                      />
                    )
                  ) : playAgain ? (
                    <button
                      onClick={() => {
                        // gameEntry()
                        setGameStatus(true);
                        setWait(false);
                        socket.emit(
                          "socket_connect",
                          JSON.stringify(socket_connect)
                        );
                        console.log(que, "que is replay");
                        let message = `${baseMessage}|P_RESTARTED`;
                        socket.emit("peer_message", message);
                        message = `${baseMessage}|G_CONNECTED`;
                        socket.emit("peer_message", message);
                        // message = `${baseMessage}|P_STARTED`;
                        // socket.emit("peer_message", message);
                        fetchPoints();
                      }}
                    >
                      <Lottie
                        animationData={reversePlay}
                        loop={false}
                        onComplete={() => {
                          // setFailed(true);
                          // setPlayAgain(false)
                          // socket.emit(
                          //   "peer_message",
                          //   `${baseMessage}|P_ENDED`
                          // );
                          // socket.emit(
                          //   "peer_message",
                          //   `${baseMessage}|G_DISCONNECTED`
                          // );
                          setId(user._id);
                          gameLeave(user._id);
                          console.log("finished left");
                          setPlayAgain(false);
                          navigate("/prizes");
                        }}
                      />
                    </button>
                  ) : (
                    // game.price==="0"?
                    // userFreePlay<=configuration.FREE_PLAY_LIMIT?
                    <button
                      onClick={(e) => {
                        if (stateData.game.price === "0") {
                          setUserFreePlay(userFreePlay + 1);
                          if (userFreePlay <= configuration.FREE_PLAY_LIMIT) {
                            console.log(
                              userFreePlay <= configuration.FREE_PLAY_LIMIT
                            );
                            joinGame(e);
                          } else {
                            console.log(
                              userFreePlay <= configuration.FREE_PLAY_LIMIT
                            );
                            console.log(userFreePlay, "userFreePlay");
                            console.log(
                              configuration.FREE_PLAY_LIMIT,
                              "configuration.FREE_PLAY_LIMIT"
                            );

                            navigate("/prizes");
                          }
                        } else {
                          console.log(
                            userFreePlay <= configuration.FREE_PLAY_LIMIT
                          );
                          joinGame(e);
                        }

                        // console.log(que,"queCount")
                      }}
                    >
                      <img src={startImage} />
                    </button>
                    // :""

                    // <button
                    //   onClick={(e) => {
                    //     // console.log(que,"queCount")
                    //     joinGame(e);
                    //   }}
                    // >
                    //   <img src={startImage} />
                    // </button>
                  )}
                </div>
                <div className={style.ReportDiv}>
                  <img src={reportImage} alt="" />
                </div>
              </div>
              <div className={style.CameraDiv}>
                <div className={style.userDiv}>
                  {gameStatus?
                  <img src={playInfo} alt="" />
                  
                  :
                  <img src={playInfo} alt="" />
                  
                }
                </div>
                <div className={style.AngleChanger}>
                  {/* <button disabled = {gameStatus}> */}
                  {gameStatus ? (
                    <img src={restartImg} alt="" />
                  ) : (
                    <img src={restartImg} alt="" />
                  )}

                  {/* </button> */}
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
