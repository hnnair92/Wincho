import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configutation, gameEntry, getAllGames } from "../../actions/product";
import { updateProfile } from "../../actions/user";
import style from "./Description.module.css";
import Screen from "./Screen";
import { socket } from "../../socket";
import Lottie from "lottie-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AllAnimation } from "../../Animation/allAnimation";
import { assets } from "./assests";
import ReactPlayer from "react-player";

const Description = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const GameData = state.game;
  const baseUrl = "https://uat.wincha-online.com";
  const onFocus = (e) => {};

  //  Hard coded Datas

  const reportCategories = [
    {
      id: "1",
      category: "CRANE",
    },
    {
      id: "2",
      category: "CAMERA",
    },
    {
      id: "3",
      category: "PAYMENT",
    },
    {
      id: "4",
      category: "DELAY",
    },
    {
      id: "5",
      category: "OTHER",
    },
  ];
  const onBlur = (e) => {
    // console.log("Tab is blurred", e);
    alert("DO you wana exist this page");
  };
  useEffect(() => {
    console.log(navigator.onLine);
  }, [navigator]);
  //   console.log(GameData);
  const videoRef = useRef();
  const userId = JSON.parse(localStorage.getItem("user"));
  const baseMessage = `${userId}|${GameData?.machine_code}`;
  // React UseStates
  const [report, setReport] = useState({
    Title: "",
    Content: "",
  });
  const [status, setStatus] = useState({});
  const [lastWin, setLastWin] = useState(false);
  const [minimized, setminimized] = useState(false);
  const [session, setSession] = useState({});
  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(false);
  const [count, setCount] = useState(4);
  const [viewCount, setViewCount] = useState("");
  const [onPlay, setOnPlay] = useState(true);
  const [startGame, setStartGame] = useState({});
  const [reportIssueCategories, setReportIssueCategories] = useState(false);
  const [reportContent, setReportContent] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);
  const [category, setCategory] = useState("");
  const [reportText, setReportText] = useState("");

  const [freePlay, setFreePlay] = useState(
    localStorage.getItem("times")
      ? JSON.parse(localStorage.getItem("times"))
      : 0
  );
  const [gamePlayStatus, setGamePlayStatus] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [que, setQue] = useState("");
  const [direction, setDirection] = useState([]);
  const [waitAnimation, setWaitAnimation] = useState({});
  const [id, setId] = useState("");
  const [topup, setTopup] = useState(false);
  const [leavePopup, setLeavePopup] = useState(false);
  const [freeLimitPopup, setFreeLimitPopup] = useState(false);
  const [prizeResetActive, setPrizeResetActive] = useState(false);
  // Redux UseSelectors
  const { game, loading } = useSelector((state) => state.gameEntry);
  const { user } = useSelector((state) => state.profile);
  const { configuration } = useSelector((state) => state.configuration);
  const { products } = useSelector((state) => state.collectionProducts);

  //   sockets
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.emit(
      "socket_connect",
      JSON.stringify({
        user_id: userId,
        socket_id: socket.id,
        machineCode: GameData?.machine_code,
      })
    );
    if (game) {
      // setDirection(game.movement.split("-"))
      // console.log(game)
      checkAnime();
    }
  }, []);
  useEffect(() => {
    socket.on("game_que_count", (res) => {
      const splitRes = res.split("|");
      const splitQue = splitRes[splitRes.length - 1].split(":");
      const splitId = splitRes[0].split(":");
      if (userId === splitId[1]) {
        socket.emit("sent_que_status", res);
        setQue(splitQue[splitQue.length - 1]);
      }
    });
    socket.on("request_processing", (res) => {
      console.log(res);
    });
    socket.on("watchers_count", (res) => {
      const splitRes = res.split("|");
      const splitViews = splitRes[splitRes.length - 1].split(":");
      const splitId = splitRes[0].split(":");
      if (game.machineCode === splitId[1]) {
        console.log(splitViews[splitViews.length - 1]);
        setViewCount(splitViews[splitViews.length - 1]);
      }
      console.log(res);
      //   setViewCount();
    });
    socket.on("get_machine_status", (res) => {
      console.log(res);
    });
    socket.on("first_move", (res) => {
      console.log(res);
    });
    socket.on("second_move", (res) => {
      console.log(res);
    });
    socket.on("update_que_status", (res) => {
      console.log(res);
    });
    socket.on("game_started", (res) => {
      console.log(res);
    });
    socket.on("lr_release", (res) => {
      console.log(res);
    });
    socket.on("fw_stop", (res) => {
      console.log(res);
    });
    socket.on("wait_prize_reset", (res) => {
      console.log(res);
    });
    socket.on("prize_reset", (res) => {
      console.log(res);
    });
    socket.on("sensor_message", (res) => {
      const splitRes = res.split("|");
      const data = splitRes[splitRes.length - 1];
      const splitId = splitRes[1].split(":");
      if (data === "PRIZE_WON" && GameData.machine_code === splitId[1]) {
        setPlayAgain(false);
        return addToCart();
      }
      // :UK|M:UK-WH1-NID1-101|PRIZE_WON
      console.log(res);
    });
    socket.on("disconnect", (res) => {
      console.log(res);
    });
  }, [socket, que]);

  let EntryRequest = {};

  // Redux Dispatch and React UseEffect
  useEffect(() => {
    if (GameData) {
      EntryRequest = {
        catalog: GameData && GameData.id,
        playerID: userId,
        machineCode: GameData && GameData.machine_code,
        source: "web",
        replay: false,
        freeplay: false,
      };
      dispatch(gameEntry(EntryRequest));
      dispatch(configutation());
      dispatch(getAllGames(userId));

      //   console.log(EntryRequest);
    }
    dispatch(updateProfile());
  }, [dispatch]);
  useEffect(() => {
    localStorage.getItem("times")
      ? localStorage.setItem("times", freePlay)
      : localStorage.setItem("times", 0);
  }, [freePlay]);
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
  // popups
  async function movePrize() {
    return (
      <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          <p>Woah there you haven't got enough tickets</p>
        </div>
        <div className={style.popupButton}>
          {/* <Link
            to="/tickets"
            onClick={() => {
              setTopup(false);
            }}
          > */}
          <button
            onClick={() => {
              prizeReset();
              setPrizeResetActive(true);
            }}
          >
            YES
          </button>
          {/* </Link> */}
          <Link
            to="/prizes"
            onClick={() => {
              setTopup(false);
            }}
          >
            <button>NO</button>
          </Link>
        </div>
      </div>
    );
  }
  async function TopUps() {
    return (
      <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          <p>Woah there you haven't got enough tickets</p>
        </div>
        <div className={style.popupButton}>
          <Link
            to="/tickets"
            onClick={() => {
              setTopup(false);
            }}
          >
            <button>TOP UP</button>
          </Link>
        </div>
      </div>
    );
  }
  async function LeavePopup() {
    return (
      <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          <p>Woah there you haven't got enough tickets</p>
        </div>
        <div className={style.popupButton}>
          <Link
            to="/tickets"
            onClick={() => {
              setLeavePopup(false);
            }}
          >
            <button>TOP UP</button>
          </Link>
        </div>
      </div>
    );
  }
  async function FreeLimitPopup() {
    return (
      <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          <p>You've used all your free plays</p>
        </div>
        <div className={style.popupButton}>
          <Link
            to="/prizes"
            onClick={() => {
              setFreeLimitPopup(false);
            }}
          >
            <button>OK</button>
          </Link>
        </div>
      </div>
    );
  }

  // All Game Screen API's

  async function sendReport() {
    await fetch(`${baseUrl}/game/issue/report`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineID: game._id,
        productID: GameData.id,
        title: category,
        content: reportText,
        source: "web",
      }),
      headers:{
        "Content-type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
        console.log(data)
        setReportContent(false)
        setReportConfirm(true)
        setCategory("")
        setReportText("")
    })
  }
  async function status_Session() {
    setTimeout(() => {
      gameStatus();
      // gameSession()
    }, game.get_status_time);
  }
  async function timeOut(userId, timeout_status) {
    socket.emit(`${baseMessage}|P_ENDED`);
    socket.emit(`${baseMessage}|G_DISCONNECTED`);
    gameLeave(userId, timeout_status);
    setTimeout(() => {
      EntryRequest.replay = true;
      dispatch(gameEntry(EntryRequest));
    }, 5000);
  }
  async function replayTimeout(id) {
    setId(id);
    gameLeave(id, false);
    setPlayAgain(false);
    navigate("/prizes");
  }
  async function checkAnime() {
    switch (game.machine_delay_time) {
      case 10:
        setWaitAnimation(AllAnimation.wait_10);
        break;
      case 15:
        setWaitAnimation(AllAnimation.wait_15);
        break;
      case 20:
        setWaitAnimation(AllAnimation.wait_20);
        break;
      case 25:
        setWaitAnimation(AllAnimation.wait_25);
        break;
      case 20:
        setWaitAnimation(AllAnimation.wait_30);
        break;
      case 35:
        setWaitAnimation(AllAnimation.wait_35);
        break;
      case 40:
        setWaitAnimation(AllAnimation.wait_40);
        break;
      case 45:
        setWaitAnimation(AllAnimation.wait_45);
        break;
      case 50:
        setWaitAnimation(AllAnimation.wait_50);
        break;
      default:
        setWaitAnimation(AllAnimation.ReverseWait);
        break;
    }
  }
  async function prizeReset() {
    await fetch(`${baseUrl}/game/player/request/prize/move`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineCode: game.machineCode,
        player_request: "RH_MOVE_GIFT",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  async function gameJoin(e) {
    setDirection(game.movement.split("-"));
    e.preventDefault();
    socket.emit("peer_message", `${baseMessage}|G_CONNECTED`);
    await socket.on("game_que_count", (queCount) => {
      console.log(queCount);

      const splitWord = queCount.split("|");

      const splitQue = splitWord[splitWord.length - 1].split(":");
      const splitId = splitWord[0].split(":");
      console.log(typeof splitQue[1]);
      if (splitId[1] === userId) {
        setQue(splitQue[1]);
      }
    });
    await fetch(`${baseUrl}/game/join`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        freeplay: false,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGamePlayStatus(true);
        console.log(data);
        if (que === "0") {
          console.log(que);
        } else {
          setWait(true);
          console.log(que);
          console.log("not zero");
        }
      });
  }
  async function gameStart() {
    // console.log(freePlay)
    // localStorage.setItem("times",JSON.stringify(freePlay))
    // const freePl = JSON.parse(localStorage.getItem("times"))
    // console.log(freePl);
    // setFreePlay(freePlay+1)
    console.log(direction);
    socket.emit("peer_message", `${baseMessage}|P_STARTED`);

    await fetch(`${baseUrl}/game/start`, {
      method: "POST",
      body: JSON.stringify({
        playerID: user._id,
        machineCode: game.machineCode,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWait(false);
        setStartGame(data.data[0]);
        setFirstStep(true);
      });
  }
  async function FirstArrowPress(command) {
    console.log("reached Press");

    if (command === "LEFT") {
      socket.emit("peer_message", `${baseMessage}|P_RL`);
    } else if (command === "RIGHT") {
      socket.emit("peer_message", `${baseMessage}|P_LR`);
    }

    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        command:
          command === "LEFT" ? "LEFT" : command === "RIGHT" ? "RIGHT" : "",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function FirstArrowRelease(command) {
    console.log("reached release");
    if (command === "RL_STOP") {
      socket.emit("peer_message", `${baseMessage}|LR_RELEASE `);
    } else if (command === "LR_STOP") {
      socket.emit("peer_message", `${baseMessage}|LR_RELEASE `);
    }

    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        command: command,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSecondStep(true);
        setFirstStep(false);
        console.log(data);
      });
  }
  async function SecondArrowPress() {
    socket.emit("peer_message", `${baseMessage}|P_FW`);

    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        command: "P_FW",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function SecondArrowRelease() {
    socket.emit("peer_message", `${baseMessage}|FW_RELEASE`);

    await fetch(`${baseUrl}/game/movement`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: user._id,
        command: "FW_STOP",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit(`${baseMessage}|P_ENDED`);
        socket.emit(`${baseMessage}|G_DISCONNECTED`);
        setSecondStep(false);
        setTimeout(() => {
          gameStatus();
          gameSession();
        }, game.get_status_time * 1000);
      });
  }
  async function gameStatus() {
    console.log(userId);
    await fetch(`${baseUrl}/game/status`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineCode: game.machineCode,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setStatus(data.status);
      });
  }
  async function gameSession() {
    console.log("session");
    // setStatus(true)
    await fetch(`${baseUrl}/game/session/status`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user._id,
        machineID: game._id,
        game_status: status,
        product_id: GameData.id,
        game_session_id: gameStart.game_session_id,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setSession(data.data);
        if (status === true) {
          addToCart();
        }
      });
  }
  async function gameLeave(User, timeout_status) {
    await fetch(`${baseUrl}/game/leave`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: userId,
        timeout_status: timeout_status,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        if (User === userId) {
          socket.disconnect();
          setTimeout(() => {
            socket.connect({ forceNew: true });
            socket.on("connect", () => {});
            socket.emit(
              JSON.stringify({
                user_id: userId,
                socket_id: socket.id,
                machineCode: GameData.machine_code,
              })
            );
          }, 1000);
          window.location.reload();
        }
      });
  }
  async function addToCart() {
    await fetch(`${baseUrl}/cart/add`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        product_id: GameData.id,
        game_status: true,
        machineID: game._id,
        archiveid: session.archiveid,
        game_session_id: startGame.game_session_id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        gameLeave();
        socket.disconnect();
      });
  }
  //   async function ApiLog(){
  //     await fetch(`${baseUrl}/game/error/log`,{
  //         method:"POST",
  //         body:JSON.stringify({

  //         })
  //     })
  //   }
  async function PointDebit() {
    const userPointInt = parseInt(user.point);
    const gamePriceInt = parseInt(GameData.price);
    if (userPointInt < gamePriceInt) {
      // return navigate("/prizes")
      return setTopup(true);
    }

    await fetch(`${baseUrl}/points/update`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: user._id,
        point: GameData.price,
        credicts: "false",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (GameData.price === "0") {
          setFreePlay(freePlay + 1);
        }
        if (
          freePlay >= configuration.FREE_PLAY_LIMIT &&
          GameData.price === "0"
        ) {
          return setFreeLimitPopup(true);
        }
        setCount(count + 1);
        dispatch(updateProfile());
        gameStart();
      });
  }
  async function freeplayCheck() {
    await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        device_id: "",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function ReportIssue() {
    await fetch(`${baseUrl}/game/issue/report`, {
      method: "POST",
      body: JSON.stringify({
        playerID: user._id,
        machineID: game._id,
        productID: GameData.id,
        title: report.Title,
        content: report.Content,
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function ValidateApi() {
    await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.parse({
        playerID: user._id,
        machineID: game._id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  return (
    <div className={style.Container}>
      {prizeResetActive ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Woah there you haven't got enough tickets</p>
          </div>
          <div className={style.popupButton}>
            {/* <Link
             to="/tickets"
             onClick={() => {
               setTopup(false);
             }}
           > */}
            <button
              onClick={() => {
                prizeReset();
                setPrizeResetActive(false);
              }}
            >
              YES
            </button>
            {/* </Link> */}
            <Link
              to="/prizes"
              onClick={() => {
                setTopup(false);
                setPrizeResetActive(false);
              }}
            >
              <button>NO</button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {topup ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Woah there you haven't got enough tickets</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/tickets"
              onClick={() => {
                setTopup(false);
              }}
            >
              <button>TOP UP</button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {reportIssueCategories ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>What issue would you like to report</p>
          </div>
          <div className={style.ReportPopupButton}>
            {reportCategories.map((item) => {
              return (
                <button
                  onClick={() => {
                    setCategory(item.category);
                    setReportIssueCategories(false);
                    setReportContent(true);
                  }}
                >
                  {item.category}
                </button>
              );
            })}
            {/* <button>CAMERA</button>
          <button>PAYMENT</button>
          <button>DELAY</button>
          <button>OTHER</button> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {reportContent ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.ReportPopupButton}>
            <button>{category}</button>
          </div>
          <div className={style.popupInput}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => {
                setReportText(e.target.value);
              }}
              placeholder="Please describe the issues you are experiencing..."
            ></textarea>
          </div>
          <div className={style.popupSubmit}>
            <button
              onClick={() => {
                sendReport();
              }}
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {reportConfirm ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>
              Thanks! We have received your reprt and if necessary will aim to
              respond within 24 hours
            </p>
          </div>
          <div className={style.popupButton}>
            <button onClick={()=>{
                setReportConfirm(false)
            }}>OK</button>
            {/* </Link> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {leavePopup ? <LeavePopup /> : ""}
      {freeLimitPopup ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>You've used all your free plays</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/prizes"
              onClick={() => {
                setFreeLimitPopup(false);
              }}
            >
              <button>OK</button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {lastWin ? (
        <div
          className={style.LastWinPopup}
          onClick={() => {
            setOnPlay(false);
          }}
        >
          <div className={style.PlayIcon}>
            <button
              onClick={() => {
                // videoRef.current.play()?videoRef.current.pause():videoRef.current.play()
              }}
            >
              <img
                src={assets.PlayImage}
                alt=""
                onClick={() => {
                  onPlay ? setOnPlay(false) : setOnPlay(true);
                }}
              />
            </button>
          </div>
          <div className={style.VideoSection}>
            <ReactPlayer
              url={game.last_win_url}
              width="100%"
              height="500px"
              playIcon={<button>Play</button>}
              playing={onPlay}
              //   light="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />
            {/* <video ref ={videoRef}>
                <source src={`${configuration.LAST_WIN_VIDEO}`} type="video/mp4"/>
            </video> */}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Section}>
        <div className={style.ExtraGames}>
          <div className={style.ExtraButton}>
            <button>EXIT GAME</button>
          </div>
          <div className={style.Description}>
            <p>YOU MIGHT ALSO LIKE</p>
          </div>
          <div className={style.AllGames}>
            {products?.map((game) => {
              return (
                <Link to={`/game/${game.id}`} state={{ game: game }}>
                  <div className={style.Game}>
                    <div className={style.Image}>
                      <img src={game.featured_image.thumbnail} alt="" />
                    </div>
                    <div className={style.GameContent}>
                      <div className={style.GameName}>
                        <p>{game.title}</p>
                      </div>
                      <div className={style.TicketPrice}>
                        <div className={style.Ticket}>
                          <img src={assets.ticketIcon} alt="" />
                        </div>
                        <div className={style.Price}>
                          <p>{game.price === "0" ? "Free" : game.price}</p>
                        </div>
                        <div className={style.info}>
                          <img src={assets.info} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={style.GameScreen}>
          <div className={style.Screen}>
            <div className={style.Icons}>
              <div className={style.queStatus}>
                <img src={assets.userView} alt="" />
                <span>{que ? que : 0}</span>
              </div>
              <div className={style.spectator}>
                <img src={assets.binoculars} alt="" />
                <span>{viewCount ? viewCount : 0}</span>
              </div>
            </div>
            {game && game.camera_data ? (
              <div className={camera === false ? style.video : style.hideVideo}>
                <Screen
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
              </div>
            ) : (
              ""
            )}
            {game && game.camera_data ? (
              <div className={camera === false ? style.hideVideo : style.video}>
                <Screen
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
              </div>
            ) : (
              ""
            )}
            {/* <div className={style.video}>
                    <Screen />
                </div> */}
          </div>
          <div className={style.Controls}>
            <div className={style.Left}>
              <div className={style.Camera}>
                <button
                  onClick={() => {
                    camera ? setCamera(false) : setCamera(true);
                  }}
                >
                  <img src={assets.cameraChanger} alt="" />
                </button>
              </div>
              <div className={style.PrizeReset}>
                {count % 5 === 0 && playAgain && count != 0 ? (
                  prizeResetActive ? (
                    <button>
                      <img src={assets.GrayPrizeMove} alt="" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPrizeResetActive(true);

                        // prizeReset()
                      }}
                    >
                      <img src={assets.greenPrizeMove} alt="" />
                    </button>
                  )
                ) : (
                  ""
                )}
                {/* <button>
                  <img src={assets.greenPrizeMove} alt="" />
                </button> */}
              </div>
            </div>
            <div className={style.Center}>
              <div className={style.PlayImage}>
                <div className={style.GameScore}>
                  <img src={assets.GamePricePng} alt="" />
                  <span>{GameData?.price}</span>
                </div>
                {gamePlayStatus ? (
                  que === "0" ? (
                    wait ? (
                      <Lottie
                        animationData={AllAnimation.waitPulse}
                        loop={false}
                        onComplete={() => {
                          PointDebit();
                        }}
                      />
                    ) : firstStep ? (
                      direction && direction[1] === "Right" ? (
                        game.camera_data[0].camera_id === "1" ? (
                          camera === false ? (
                            <button
                              onMouseDown={() => {
                                FirstArrowPress("RIGHT");
                              }}
                              onMouseUp={() => {
                                FirstArrowRelease("RL_STOP");
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowRight}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          ) : (
                            <button
                              onMouseDown={() => {
                                FirstArrowPress("RIGHT");
                              }}
                              onMouseUp={() => {
                                FirstArrowRelease("RL_STOP");
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowUp}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          )
                        ) : camera === false ? (
                          <button
                            onMouseDown={() => {
                              FirstArrowPress("RIGHT");
                            }}
                            onMouseUp={() => {
                              FirstArrowRelease("RL_STOP");
                            }}
                          >
                            <Lottie
                              animationData={AllAnimation.ArrowUp}
                              loop={false}
                              onComplete={() => {
                                timeOut(userId, false);
                              }}
                            />
                          </button>
                        ) : (
                          <button
                            onMouseDown={() => {
                              FirstArrowPress("RIGHT");
                            }}
                            onMouseUp={() => {
                              FirstArrowRelease("RL_STOP");
                            }}
                          >
                            <Lottie
                              animationData={AllAnimation.ArrowRight}
                              loop={false}
                              onComplete={() => {
                                timeOut(userId, false);
                              }}
                            />
                          </button>
                        )
                      ) : direction && direction[1] === "Left" ? (
                        game.camera_data[0].camera_id === "1" ? (
                          camera === false ? (
                            <button
                              onMouseDown={() => {
                                FirstArrowPress("LEFT");
                                console.log("clicked");
                              }}
                              onMouseUp={() => {
                                FirstArrowRelease("LR_STOP");
                                console.log("released");
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowLeft}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          ) : (
                            <button
                              onMouseDown={() => {
                                FirstArrowPress("LEFT");
                                console.log("clicked");
                              }}
                              onMouseUp={() => {
                                FirstArrowRelease("LR_STOP");
                                console.log("released");
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowUp}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          )
                        ) : camera === false ? (
                          <button
                            onMouseDown={() => {
                              FirstArrowPress("LEFT");
                              console.log("clicked");
                            }}
                            onMouseUp={() => {
                              FirstArrowRelease("LR_STOP");
                              console.log("released");
                            }}
                          >
                            <Lottie
                              animationData={AllAnimation.ArrowUp}
                              loop={false}
                              onComplete={() => {
                                timeOut(userId, false);
                              }}
                            />
                          </button>
                        ) : (
                          <button
                            onMouseDown={() => {
                              FirstArrowPress("LEFT");
                              console.log("clicked");
                            }}
                            onMouseUp={() => {
                              FirstArrowRelease("LR_STOP");
                              console.log("released");
                            }}
                          >
                            <Lottie
                              animationData={AllAnimation.ArrowLeft}
                              loop={false}
                              onComplete={() => {
                                timeOut(userId, false);
                              }}
                            />
                          </button>
                        )
                      ) : (
                        ""
                      )
                    ) : secondStep ? (
                      game.camera_data[0].camera_id === "2" ? (
                        direction && direction[1] === "Left" ? (
                          camera === false ? (
                            <button
                              onMouseDown={() => {
                                SecondArrowPress();
                              }}
                              onMouseUp={() => {
                                SecondArrowRelease();
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowRight}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          ) : (
                            <button
                              onMouseDown={() => {
                                SecondArrowPress();
                              }}
                              onMouseUp={() => {
                                SecondArrowRelease();
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowUp}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, true);
                                }}
                              />
                            </button>
                          )
                        ) : direction && direction[1] === "Right" ? (
                          camera ? (
                            <button
                              onMouseDown={() => {
                                SecondArrowPress();
                              }}
                              onMouseUp={() => {
                                SecondArrowRelease();
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowLeft}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, false);
                                }}
                              />
                            </button>
                          ) : (
                            <button
                              onMouseDown={() => {
                                SecondArrowPress();
                              }}
                              onMouseUp={() => {
                                SecondArrowRelease();
                              }}
                            >
                              <Lottie
                                animationData={AllAnimation.ArrowUp}
                                loop={false}
                                onComplete={() => {
                                  timeOut(userId, true);
                                }}
                              />
                            </button>
                          )
                        ) : (
                          ""
                        )
                      ) : (
                        <button
                          onMouseDown={() => {
                            SecondArrowPress();
                          }}
                          onMouseUp={() => {
                            SecondArrowRelease();
                          }}
                        >
                          <Lottie
                            animationData={AllAnimation.ArrowUp}
                            loop={false}
                            onComplete={() => {
                              timeOut(userId, true);
                            }}
                          />
                        </button>
                      )
                    ) : (
                      <Lottie
                        animationData={waitAnimation}
                        loop={false}
                        onComplete={() => {
                          setGamePlayStatus(false);
                          setPlayAgain(true);
                        }}
                      />
                    )
                  ) : (
                    <button>
                      <Lottie
                        animationData={AllAnimation.ReverseWait}
                        loop={false}
                      />
                    </button>
                  )
                ) : // :""
                playAgain ? (
                  <button
                    onClick={() => {
                      setWait(true);
                      setGamePlayStatus(true);
                      socket.emit(
                        "socket_connect",
                        JSON.stringify({
                          user_id: userId,
                          socket_id: socket.id,
                          machineCode: GameData.machine_code,
                        })
                      );
                      let message = `${baseMessage}|P_RESTARTED`;
                      socket.emit("peer_message", message);
                      message = `${baseMessage}|G_CONNECTED`;
                      socket.emit("peer_message", message);
                      // gameStart()
                      setPlayAgain(false);
                    }}
                  >
                    <Lottie
                      animationData={AllAnimation.ReversePlay}
                      loop={false}
                      pause={prizeResetActive}
                      onComplete={() => {
                        gameLeave(userId, false);
                        setPlayAgain(false);
                      }}
                    />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      gameJoin(e);
                    }}
                  >
                    <img src={assets.PlayImage} alt="" />
                  </button>
                )}
              </div>
              <div className={style.Report}>
                <button
                  onClick={() => {
                    setReportIssueCategories(true);
                  }}
                >
                  <img src={assets.reportImage} alt="" />
                </button>
              </div>
            </div>
            <div className={style.Right}>
              <div className={style.LastWin}>
                <button
                  onClick={() => {
                    lastWin ? setLastWin(false) : setLastWin(true);
                  }}
                >
                  <img src={assets.lastWin} alt="" />
                </button>
              </div>
              <div className={style.Guide}>
                <button>
                  <img src={assets.Guide} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.LeftSide}>
          {minimized ? (
            <div className={style.NowPlaying}>
              <div className={style.NowPlayingTitle}>
                <p>YOU'RE PLAYING FOR</p>
              </div>
              <div className={style.CurrentTitle}>
                <p>{GameData?.title}</p>
              </div>
              <div className={style.CloseIcon}>
                <IoIosArrowDown
                  onClick={() => {
                    setminimized(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={style.NowPlaying}>
              <div className={style.NowPlayingTitle}>
                <p>YOU'RE PLAYING FOR</p>
              </div>
              <div className={style.CurrentImage}>
                <img src={GameData?.featured_image?.thumbnail} alt="" />
              </div>
              <div className={style.CurrentTitle}>
                <p>{GameData?.title}</p>
              </div>
              <div className={style.CloseIcon}>
                <IoIosArrowUp
                  onClick={() => {
                    setminimized(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
