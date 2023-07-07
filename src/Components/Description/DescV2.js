import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configutation, gameEntry, getAllGames } from "../../actions/product";
import { updateProfile } from "../../actions/user";
import style from "./Description.module.css";
import Screen from "./Screen";
import { socket } from "../../socket";
// import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import Lottie from "lottie-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AllAnimation } from "../../Animation/allAnimation";
import { assets } from "./assests";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import playVideo from "../../assests/PlayButton.png";
import { MdClose } from "react-icons/md";
import {music} from '../../assests/Musics/allMusic.js'
import waitStatic from "../../assests/Wait Pressed Button.png";
const Description = ({ active, setActive, setGamePlay, gamePlay }) => {
  console.log(localStorage);
  console.log(active, "active from description");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const GameData = state && state.game;
  //const baseUrl = "https://uat.wincha-online.com/"
const baseUrl = "https://uat.wincha-online.com/"
//const baseUrl = "https://uat.wincha-online.com"
// const baseUrl = "https://uat.wincha-online.com";
  const onFocus = (e) => {};
  const audioRef = useRef(null)
  const audioRefHome = useRef(null)
  console.log(GameData);
  // const location = useLocation()

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
    // alert("DO you wana exist this page");
  };
  useEffect(() => {
    console.log(navigator.onLine);
  }, [navigator]);
  //   console.log(GameData);
  const videoRef = useRef();
  const userId = JSON.parse(localStorage.getItem("user"));
  const baseMessage = `${userId}|${GameData?.machine_code}`;
  const vidRef = useRef(null);
  
  // localStorage
  // let musicStatus = localStorage.getItem("music")
  let audioStatus = localStorage.getItem("sound")

  // console.log(musicStatus)
  // React UseStates
  const [report, setReport] = useState({
    Title: "",
    Content: "",
  });
  const [status, setStatus] = useState({});
  const [videoGot, setVideoGot] = useState(false);
  useEffect(() => {
    console.log(videoGot, "video got in description");
  }, [videoGot]);
  // console.log(vidRef.current&&vidRef.current.play())
  // console.log(vidRef.current)
  // console.log(vidRef)

  const [lastWin, setLastWin] = useState(false);
  const [minimized, setminimized] = useState(false);
  const [timeoutStatus, setTimeoutStatus] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [session, setSession] = useState({});
  const [firstStep, setFirstStep] = useState(false);
  const [freePlayNotReg,setFreePlayNotReg] = useState(false)
  const [secondStep, setSecondStep] = useState(false);
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(false);
  const [count, setCount] = useState(4);
  const [viewCount, setViewCount] = useState("");
  const [onPlay, setOnPlay] = useState(false);
  const [musicStatus,setMusicStatus] = useState(localStorage.getItem("music")?localStorage.getItem("music"):localStorage.setItem("music",JSON.stringify(false)))
  const [startGame, setStartGame] = useState({});
  const [reportIssueCategories, setReportIssueCategories] = useState(false);
  const [reportContent, setReportContent] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);
  const [category, setCategory] = useState("");
  const [reportText, setReportText] = useState("");
  const [ifPerson, setIfPerson] = useState(
    JSON.parse(localStorage.getItem("tabsOpen"))
  );
  const [popup, setPopup] = useState(false);
  const [SelGameData, setSelGameData] = useState({});
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
  const [isTimeout, setisTimeout] = useState(false);

  // Redux UseSelectors
  const { game, loading } = useSelector((state) => state.gameEntry);
  const { user } = useSelector((state) => state.profile);
  const { configuration } = useSelector((state) => state.configuration);
  const { products } = useSelector((state) => state.collectionProducts);

  //   sockets
  useEffect(() => {
    checkFreePlay();
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
      if (data === "PRIZE_LOST" && GameData.machine_code === splitId[1]) {
        // setPlayAgain(true);
        // return addToCart();
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
  //   useEffect(() => {
  //     // console.log(location.pathname.split("/")[1])
  //     // console.log(location)
  //     // define increment counter part
  //     if(location.pathname.split("/")[1]){

  //         const tabsOpen = localStorage.getItem('tabsOpen')
  //         console.log('tabsOpen', tabsOpen)
  //         if (tabsOpen == null) {
  //             localStorage.setItem('tabsOpen', 1)
  //         } else {
  //             localStorage.setItem('tabsOpen', parseInt(tabsOpen) + parseInt(1))
  //         }

  //         // define decrement counter part
  //         window.onunload = function (e) {
  //             const newTabCount = localStorage.getItem('tabsOpen')
  //             if (newTabCount !== null) {
  //                 localStorage.setItem('tabsOpen', newTabCount - 1)
  //             }
  //         }
  //     }
  // }, [location])
  useEffect(()=>{
    console.log(musicStatus,"musicStatus from Desc");
    
    playAudioBg(music.Game)
  },[musicStatus])
  useEffect(()=>{
  console.log(typeof audioStatus,"audioStatus")
  console.log(playAgain,"playAgain")

    if(playAgain===false&&audioStatus==="true"){
  console.log(audioStatus,"audioStatus from playagain")

      playAudio(music.Whoops)
    }
  },[playAgain])
    useEffect(()=>{
    if(freePlay>=configuration.FREE_PLAY_LIMIT){
      setFreePlayNotReg(true)
    }
  },[freePlay])
  useEffect(()=>{
    if(reportIssueCategories===true&&audioStatus==="true"){
      playAudio(music.Chime)
    }
  },[reportIssueCategories])
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
  useEffect(() => {
    if (game) {
      if (
        game &&
        game.camera_data &&
        game.camera_data[0] &&
        game.camera_data[0].camera_id === "1"
      ) {
        setCamera(false);
      } else if (
        game &&
        game.camera_data &&
        game.camera_data[0] &&
        game.camera_data[0].camera_id === "2"
      ) {
        setCamera(true);
      }
      if (
        game &&
        game.camera_data &&
        game.camera_data[1] &&
        game.camera_data[1].camera_id === "1"
      ) {
        setCamera(false);
      } else if (
        game &&
        game.camera_data &&
        game.camera_data[1] &&
        game.camera_data[1].camera_id === "2"
      ) {
        setCamera(true);
      }
    }
  }, [dispatch, game]);
  useEffect(() => {
    checkFreePlay();
  }, [gamePlayStatus]);
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
  console.log(audioStatus,"audioStatus")
  // Extra Funcions
  async function audioEnded(src){
    if(musicStatus==="true"){
      // audioRefHome.current.unmute()
      audioRefHome.current.volume=1;
      audioRefHome.current.src=src;
      audioRefHome.current.play() 
    }
    else{
      audioRefHome.current.volume = 0;
      // audioRefHome.current.mute()

    }
     };  
  async function playAudio(src){
  console.log(audioStatus,"audioStatus")
  // audioRef.current.volume = 1
    if(audioStatus==="true"){
      console.log("reached here")
      audioRef.current.volume = 1;
      audioRef.current.src=src
      audioRef.current.play()
      // console.log(audioRef.current.volume);
      
    }
    else{
      // audioRefHome.current.mute()
      // console.log(audioStatus);
      audioRef.current.volume = 0;

      

    }
    
  }
  async function playAudioBg(src){
  console.log(musicStatus,"musicStatus")
    if(musicStatus==="true"){
      audioRefHome.current.volume=1;
      audioRefHome.current.src=src;
      audioRefHome.current.play()
    }
    else{
      audioRefHome.current.volume = 0;


    }
  }
  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  const handlePauseVideo = () => {
    vidRef.current.pause();
  };

  // All Game Screen API's
  async function checkFreePlay() {
    await fetch(`${baseUrl}/game/freeplay/limit`, {
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
      .then((data) => {
        console.log(data);

        localStorage.getItem("timesall")
          ? localStorage.setItem(
              "timesall",
              parseInt(data.data[0].freeplay_limit)
            )
          : localStorage.setItem("timesall", 0);
      });
  }
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
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReportContent(false);
        setReportConfirm(true);
        setCategory("");
        setReportText("");
      });
  }
  async function status_Session() {
    setTimeout(() => {
      gameStatus();
      // gameSession()
    }, game.get_status_time);
  }
  async function timeOut(userId, timeout_status) {
    playAudio(music.Whoops)

    socket.emit(`${baseMessage}|P_ENDED`);
    socket.emit(`${baseMessage}|G_DISCONNECTED`);
    setTimeoutStatus(true);
    setTimeout(async() => {
      await gameLeave(userId, timeout_status);
      EntryRequest.replay = true;
      dispatch(gameEntry(EntryRequest));
      setTimeoutStatus(false);
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
    playAudio(music.Wincha)
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
        setGamePlay(true);
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
        localStorage.setItem("inGame", true);
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
        if (status === false) {
          setTimeout(() => {
            setGameFailed(true);
          }, 5000);
        }
        localStorage.setItem("inGame", false);
      });
  }
  async function gameLeave(User, timeout_status) {
    await fetch(`${baseUrl}/game/leave`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: userId,
        timeout_status: timeout_status,
        source: "web",
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
          setTimeoutStatus(false);
          window.location.reload();
        }
      });
  }
  async function addToCart() {
    playAudio(music.Woohoo)
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
        playAudio(music.CoinDrop)
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
      <audio ref={audioRef}></audio>
      <audio ref={audioRefHome} onEnded={audioEnded(music.Game)}></audio>
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
      {freePlayNotReg &&userId===null? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>You've used all of your free plays</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/login"
              onClick={() => {
                setFreePlayNotReg(false);
              }}
            >
              <button>REGISTER</button>
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
            <p>What issue would you like to report?</p>
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
          <div className={style.ReportPopupButtonCategory}>
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
              Thanks! We have received your report and if necessary will aim to
              respond within 24 hours
            </p>
          </div>
          <div className={style.popupButtonSubmit}>
            <button
              onClick={() => {
                setReportConfirm(false);
              }}
            >
              OK
            </button>
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
      {/* {ifPerson>=0?
      <div className={style.isLogged}>
        <h1>Please close other tabs inorder to play</h1>
      </div>
      :""} */}
      {lastWin ? (
        <div
          className={lastWin ? style.LastWinPopup : style.hideVideopopup}
          onClick={() => {
            // setOnPlay(false);
          }}
        >
          <div
            className={style.VideoOverlay}
            onClick={() => {
              setLastWin(false);
              setOnPlay(false);
            }}
          ></div>
          <div className={style.PlayIcon}>
            {onPlay === true ? (
              <button
                onClick={() => {
                  setOnPlay(false);
                  handlePauseVideo();
                }}
              >
                <img src={assets.PlayImage} alt="" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setOnPlay(true);
                  handlePlayVideo();
                }}
              >
                <img src={playVideo} alt="" />
              </button>
            )}
          </div>
          <div className={style.VideoSection}>
            <MdClose
              onClick={() => {
                setLastWin(false);
                setOnPlay(false);
              }}
            />
            {game.last_win_url === "" ? (
              <div className={style.VideoEmpty}>
                <p>Whoops! Video unavailable Please try again later.</p>
              </div>
            ) : (
              // <ReactPlayer
              // ref={videoRef2}
              //   url={game.last_win_url}
              //   width="100%"
              //   height="500px"
              //   playIcon={<button>Play</button>}
              //   playing={true}
              //   controls={true}
              //   />\
              <video ref={vidRef}>
                <source src={game.last_win_url} type="video/mp4" />
              </video>
            )}
            {/* <video src=""></video> */}
            {/* light="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" */}
            {/* <video ref ={videoRef}>
                <source src={`${configuration.LAST_WIN_VIDEO}`} type="video/mp4"/>
            </video> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {popup ? (
        <div className={style.PopupSection}>
          <div
            className={style.PopupOverlay}
            onClick={() => {
              setPopup(false);
            }}
          ></div>
          <div
            className={style.Popup}
            onClick={() => {
              setPopup(true);
            }}
          >
            <div className={style.popupImage}>
              <img src={SelGameData.featured_image.large} alt="" />
            </div>
            <div className={style.popupTitle}>
              <p>{SelGameData.title}</p>
            </div>
            <div className={style.popupDescription}>
              <p>{SelGameData.content}</p>
            </div>
            <div
              className={style.popupPlayNow}
              onClick={() => {
                navigate(`/game/${SelGameData.id}`, {
                  state: { game: SelGameData },
                });
              }}
            >
              {/* <button></button> */}
              <p>PLAY</p>
              <div className={style.popupTicket}>
                <img src={assets.ticketIcon} alt="" />
              </div>
              <p>{SelGameData.price === "0" ? "FREE" : SelGameData.price}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Section}>
        <div className={style.ExtraGames}>
          <div className={style.ExtraButton}>
            <button
              onClick={() => {
                if (gamePlayStatus === true) {
                  setActive(true);
                }
                if (gamePlayStatus === false) {
                  setActive(false);
                  navigate("/prizes");
                }
              }}
            >
              EXIT GAME
            </button>
          </div>
          <div className={style.Description}>
            <p>YOU MIGHT ALSO LIKE</p>
          </div>
          <div className={style.AllGames}>
            {products?.map((game) => {
              return (
                <Link
                  to={`/game/${game.id}`}
                  state={{ game: game }}
                  style={{
                    pointerEvents: gamePlayStatus ? "none" : "visible",
                    cursor: gamePlayStatus ? "not-allowed" : "pointer",
                  }}
                  //  onClick={()=>{
                  //   window.location.reload()
                  // }}>
                >
                  <div className={style.Game}>
                    <div className={style.Image}>
                      <img src={game.featured_image.large} alt="" />
                    </div>
                    <div className={style.GameContent}>
                      <div className={style.GameName}>
                        <p>{game.title}</p>
                      </div>
                      <div className={style.TicketPrice}>
                        <div
                          className={style.Ticket}
                          onClick={() => {
                            setPopup(true);
                          }}
                        >
                          <img src={assets.ticketIcon} alt="" />
                        </div>

                        <div className={style.Price}>
                          <p>{game.price === "0" ? "Free" : game.price}</p>
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
          {videoGot === false ? (
            <div className={style.videoStarting}>
              {/* <p>Please wait while we get the video for you!</p> */}
              <div className={style.LoaderDivSection}>
            <div className={style.LoaderAnime}>
              <Lottie animationData={AllAnimation.Loader} />
            </div>
              <p>Make Sure you have stable internet connection</p>
            </div>
            </div>
          ) : (
            ""
          )}
            <div className={style.Screen}>
          <div className={style.AllGameSectin}>
             
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
              {game &&
              game.camera_data &&
              game.camera_data[0] &&
              game.camera_data[0].camera_id === "1" ? (
                // direction&&direction[1]==="Left"?
                <div className={style.AllVideoSection}>
                  <div
                    className={camera === true ? style.hideVideo : style.video}
                    >
                    {timeoutStatus ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.timeout}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
               {playAgain ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.missed}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
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
                      setVideoGot={setVideoGot}
                      videoGot={videoGot}
                    />
                  </div>
                  <div
                    className={camera === true ? style.video : style.hideVideo}
                  >
                    {timeoutStatus ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.timeout}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
               {playAgain ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.missed}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
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
                      setVideoGot={setVideoGot}
                      videoGot={videoGot}
                    />
                  </div>
                </div>
              ) : 
              game &&
              game.camera_data &&
              game.camera_data[0] &&
              game.camera_data[0].camera_id === "2"?
              <div className={style.AllVideoSection}>
                  <div
                    className={camera === true ? style.hideVideo : style.video}
                    >
                    {timeoutStatus ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.timeout}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
               {playAgain ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.missed}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
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
                      setVideoGot={setVideoGot}
                      videoGot={videoGot}
                    />
                  </div>
                  <div
                    className={camera === true ? style.video : style.hideVideo}
                  >
                    {timeoutStatus ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.timeout}
                     loop={false}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
               {playAgain ? (
                 <div className={style.TimeoutAnimation}>
                   <Lottie
                     animationData={AllAnimation.missed}
                     loop={true}
                     onComplete={() => {}}
                   />
                 </div>
               ) : (
                 ""
               )}
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
                      setVideoGot={setVideoGot}
                      videoGot={videoGot}
                    />
                  </div>
                </div>
              :""// :direction&&direction[1]==="Right"?
             
              }
              <div className={style.Controls}>
                <div className={style.Left}>
                  <div className={style.Camera}>
                    <button
                      onClick={() => {
                        console.log(camera);
                        camera ? setCamera(false) : setCamera(true);
                      }}
                    >
                      <img src={assets.cameraChanger} alt="" />
                    </button>
                  </div>
                  <div className={style.PrizeReset}>
                    {count % configuration.FREE_PLAY_LIMIT === 0 &&
                    playAgain &&
                    count != 0 ? (
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
                            game.camera_data[0].camera_id === "2" ? (
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
                                    animationData={AllAnimation.ArrowLeft}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
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
                                      console.log("7");
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              )
                            ) : camera === true ? (
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
                                    setSecondStep(false);
                                    setFirstStep(false);
                                    console.log(timeoutStatus, "6");

                                    setTimeoutStatus(true);
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
                                    setFirstStep(false);
                                    setSecondStep(false);
                                    setTimeoutStatus(true);
                                  }}
                                />
                              </button>
                            )
                          ) : direction && direction[1] === "Left" ? (
                            game.camera_data[0].camera_id === "2" ? (
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
                                    animationData={AllAnimation.ArrowUp}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
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
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      console.log(timeoutStatus, "5");

                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              )
                            ) : camera === true ? (
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
                                    setFirstStep(false);
                                    setSecondStep(false);
                                    console.log(timeoutStatus, "4");

                                    setTimeoutStatus(true);
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
                                  animationData={AllAnimation.ArrowRight}
                                  loop={false}
                                  onComplete={() => {
                                    timeOut(userId, false);
                                    setFirstStep(false);
                                    setSecondStep(false);
                                    setTimeoutStatus(true);
                                  }}
                                />
                              </button>
                            )
                          ) : (
                            <button
                              onClick={(e) => {
                                // gameJoin(e);
                              }}
                            >
                              <img src={assets.waitStatic} alt="" />
                            </button>
                          )
                        ) : secondStep ? (
                          game.camera_data[1].camera_id === "2" ? (
                            direction && direction[1] === "Left" ? (
                              camera === false ? (
                                <button
                                  onMouseDown={() => {
                                    console.log("second arrow left false");
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
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              ) : camera === true ? (
                                <button
                                  onMouseDown={() => {
                                    console.log("second arrow left true");

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
                                      setSecondStep(false);
                                      console.log(timeoutStatus, "3");
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    // gameJoin(e);
                                  }}
                                >
                                  <img src={assets.waitStatic} alt="" />
                                </button>
                              )
                            ) : direction && direction[1] === "Right" ? (
                              camera === false ? (
                                <button
                                  onMouseDown={() => {
                                    console.log("second arrow right false");

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
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              ) : camera === true ? (
                                <button
                                  onMouseDown={() => {
                                    console.log("second arrow right true");

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
                                      timeOut(userId, true);
                                      console.log(timeoutStatus, "2");

                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    // gameJoin(e);
                                  }}
                                >
                                  <img src={assets.waitStatic} alt="" />
                                </button>
                              )
                            ) : (
                              <button
                                onClick={(e) => {
                                  // gameJoin(e);
                                }}
                              >
                                <img src={assets.waitStatic} alt="" />
                              </button>
                            )
                          ) : (
                            <button
                              onMouseDown={() => {
                                console.log("second arrow right find it ");

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
                                  console.log(timeoutStatus, "1");

                                  setSecondStep(false);
                                  setTimeoutStatus(true);
                                }}
                              />
                            </button>
                          )
                        ) : timeoutStatus ? (
                          <button>
                            <img src={assets.timeOutImage} alt="" />
                          </button>
                        ) : (
                          <Lottie
                            animationData={waitAnimation}
                            loop={false}
                            onComplete={() => {
                              setGamePlayStatus(false);
                              setGamePlay(false);
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
                          setGamePlay(true);
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
                          onLoad={()=>{
                            playAudio(music.Woohoo)
                          }}
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
                  <div
                    className={style.Report}
                    style={{
                      pointerEvents: gamePlayStatus ? "none" : "visible",
                    }}
                  >
                    <button
                      onClick={() => {
                        setReportIssueCategories(true);
                      }}
                    >
                      <img src={assets.reportImage} alt="" />
                    </button>
                  </div>
                </div>
                <div
                  className={style.Right}
                  style={{ pointerEvents: gamePlayStatus ? "none" : "visible" }}
                >
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
          </div>
        </div>
        <div className={style.LeftSide}>
          {minimized ? (
            <div className={style.NowPlaying}>
              <div className={style.NowPlayingTitle}>
                <p>YOU'RE PLAYING FOR</p>
              </div>
              <div className={style.CurrentImage}>
                <img src={GameData?.featured_image?.large} alt="" />
              </div>
              <div className={style.CurrentTitle}>
                <p>{GameData?.title}</p>
              </div>
              <div className={style.CloseIcon}>
                <IoIosArrowUp
                  onClick={() => {
                    setminimized(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={style.NowPlaying}>
              {/* <div className={style.NowPlayingTitle}>
                <p>YOU'RE PLAYING FOR</p>
              </div> */}
              <div className={style.CurrentTitle}>
                <p>{GameData?.title}</p>
              </div>
              <div className={style.CloseIcon}>
                <IoIosArrowDown
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
