import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configutation, gameEntry, getAllGames } from "../../actions/product";
import { cartAction, notificationAction, updateProfile } from "../../actions/user";
import style from "./Description.module.css";
import Screen from "./Screen";
import { socket } from "../../socket";
// import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import Lotties from 'lottie-react'
// import Lotties from 'react-lottie'
import lottie from "lottie-web";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AllAnimation } from "../../Animation/allAnimation";
import { assets } from "./assests";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import playVideo from "../../assests/PlayButton.png";
import { MdClose, MdPauseCircleFilled } from "react-icons/md";
import { music } from "../../assests/Musics/allMusic.js";
import waitStatic from "../../assests/Wait Pressed Button.png";
import Lottie from "lottie-web";
import prizeMove from "../../assests/43 POP UP Full Squared.png";
import prizeMoveUser from "../../assests/43 POP UP Full for Viewers Squared.png";
import overlayImage from '../../assests/Asset 1.png'
const Description = ({
  gameMusic,
  setGameMusic,
  gameSound,
  setGameSound,
  active,
  pageUrl,
  setPageUrl,
  setActive,
  setGamePlay,
  gamePlay,
}) => {
  console.log(localStorage);
  console.log(active, "active from description");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const GameData = state && state.game;
  const baseUrl = "https://uat.wincha-online.com";
  const onFocus = (e) => {};
  const audioRef = useRef(null);
  const audioRefHome = useRef(null);
  const animeRef = useRef(null);
  console.log(state);
  // const location = useLocation()
  // useEffect(() => {
  //   if (GameData?.content?.length < 75) {
  //     console.log(GameData.content);
  //   }
  // },[]);
  // useEffect(() => {
  //   console.log(active, "active from description");
  //   if(active===true){
  //     setExitPopupOpen(true)
  //   }
  // },[active]);
  useEffect(()=>{
  console.log(active)

  },[active])
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
  let audioStatus = localStorage.getItem("sound");

  // console.log(musicStatus)
  // React UseStates
  // console.log(vidRef.current&&vidRef.current.play())
  // console.log(vidRef.current)
  // console.log(vidRef)
  const [premiumPopup, setPremiumPopup] = useState(false);
  const [overlay,setOverlay] = useState(true);
  const [sendCategory,setSendCategory] = useState("")
  const [lastWin, setLastWin] = useState(false);
  const [minimized, setminimized] = useState(false);
  const [cartCheck,setCartCheck] = useState(false)
  const [timeoutStatus, setTimeoutStatus] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [cameraState1, setCameraState1] = useState(false);
  const [cameraState2, setCameraState2] = useState(false);
  const [session, setSession] = useState({});
  const [firstStep, setFirstStep] = useState(false);
  const [freePlayNotReg, setFreePlayNotReg] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(false);
  const [count, setCount] = useState(4);
  const [viewCount, setViewCount] = useState("");
  const [onPlay, setOnPlay] = useState(false);
  const [prizeId,setPrizeID] = useState("")
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(false))
  );
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
  const [transferGame, setTransferGame] = useState({});
  const [SelGameData, setSelGameData] = useState({});
  const [freePlay, setFreePlay] = useState(
    localStorage.getItem("times")
      ? JSON.parse(localStorage.getItem("times"))
      : 0
  );
  const [prizeCount,setPrizeCount] = useState(0)
  const [gamePlayStatus, setGamePlayStatus] = useState(false);
  const [prizeDate,setPrizeDate] = useState("")
  const [playAgain, setPlayAgain] = useState(false);
  const [que, setQue] = useState("");
  const [direction, setDirection] = useState([]);
  const [waitAnimation, setWaitAnimation] = useState({});
  const [id, setId] = useState("");
  const [topup, setTopup] = useState(false);
  const [leavePopup, setLeavePopup] = useState(false);
  const [freeLimitPopup, setFreeLimitPopup] = useState(false);
  const [prizeResetActive, setPrizeResetActive] = useState(false);
  const [currentPrizeMove, setCurrentPrizeMove] = useState(false);
  const [prizeMoveStatus, setPrizeMoveStatus] = useState(false);
  const [exitPopupOpen,setExitPopupOpen] = useState(false)
  const [isTimeout, setisTimeout] = useState(false);
  const [hideEverything,setHideEverything] = useState(false)
  const [report, setReport] = useState({
    Title: "",
    Content: "",
  });
  const [status, setStatus] = useState({});
  const [videoGot, setVideoGot] = useState(false);

  // Redux UseSelectors
  const { game, loading } = useSelector((state) => state.gameEntry);
  const { user } = useSelector((state) => state.profile);
  const { configuration } = useSelector((state) => state.configuration);
  const { products } = useSelector((state) => state.collectionProducts);

  //   sockets
  useEffect(()=>{
    if(GameData&&GameData.category){
      const datas = GameData.category.split(",")
      setSendCategory(datas[0])
    }
  },[GameData])
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
  useEffect(()=>{
    if(GameData&&GameData.price!=="0"&&userId===null){
      navigate("/login")
    }
  },[])
  useEffect(()=>{
    console.log(currentPrizeMove)
    console.log(game.price_move_status)
  },[camera])
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
      const data = res.split("|")
      const progress = data[data.length-1]
      const splitId = data[0].split(":");
      console.log(splitId[1])
      console.log(userId)
      console.log(splitId[1]===userId)
      if(splitId[1]===userId){
        setPrizeID(userId)
      }
      if(progress==="INPROGRESS"){
        setCurrentPrizeMove(true)
      }
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
      setPrizeCount(prizeCount=>prizeCount+1)
      setCartCheck(true)
      const splitRes = res.split("|");
      const data = splitRes[splitRes.length - 1];
      const splitId = splitRes[1].split(":");
      const machineId = splitRes[1].split(":")
      const user = splitRes[0].split(":")
      console.log(user[1])
      console.log(userId)
      console.log(userId===user[1])
      if (data === "PRIZE_WON" && GameData.machine_code === splitId[1]) {
        console.log(prizeCount);
        // if(userId===user){
          setPrizeDate(data)
          setPlayAgain(false);
          // if(cartCheck===true){
          // }
        // }
      }
      if (data === "PRIZE_LOST" && GameData.machine_code === splitId[1]) {
        // setPlayAgain(true);
        // return addToCart();
      }
      if (
        data === "RH_POSITION_CHANGED" &&
        GameData.machine_code === machineId[1]
      ) {
        setCurrentPrizeMove(false);
        socket.emit("sent_help_status", `${baseMessage}|RECEIVED`);
        socket.emit(
          "confirm_move",
          `${baseMessage}|RH_POSITION_CHANGED`
        );
        if(user[1]===userId){
          console.log(user[1])
          // if(que==="0"){
            // setPrizeID(user[1])
            console.log(prizeCount)
          console.log(count,"count from prize move")
          // }

        // setCurrentPrizeMove(false);
        // if(que==="0"&&gamePlayStatus===false){
        // setGamePlayStatus(true)
        // setWait(true)
        // setQue("0")
        setHideEverything(true)
        setPlayAgain(true)
        setCount(count=>count+1)
        // }
        //   setGamePlayStatus(true);
        //   setGamePlay(true);
        //   setWait(true);
        //   socket.emit(
        //     "socket_connect",
        //     JSON.stringify({
        //       user_id: userId,
        //       socket_id: socket.id,
        //       machineCode: GameData.machine_code,
        //     })
        //   );
        //   let message = `${baseMessage}|P_RESTARTED`;
        //   socket.emit("peer_message", message);
        //   message = `${baseMessage}|G_CONNECTED`;
        //   socket.emit("peer_message", message);
        //     console.log(currentPrizeMove)
        // setPlayAgain(true)
        console.log(que,"que from prize move")
          // gameStart()
        }
        // :UK|M:UK-WH1-NID1-101|PRIZE_WON
      }
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
  useEffect(() => {
    console.log(videoGot, "video got in description");
  }, [videoGot]);
  useEffect(() => {
    // localStorage.setItem("music",JSON.stringify(gameMusic))
    // if(gameMusic==="true"){
    //   audioRefHome.current.volume = 1;
    //   playAudioBg()
    // console.log(gameMusic)
    // console.log(audioRefHome.current.volume)
    // console.log("unmute")
    // }
    // else{
    //   audioRefHome.current.volume = 0;
    // console.log(gameMusic)
    // console.log(audioRefHome.current.volume)
    // console.log("mute")
    // }
    // console.log(gameMusic)
  }, [gameMusic]);
  
  useEffect(()=>{
    console.log(videoGot)
    if(videoGot===true){
    setTimeout(()=>{
      if(overlay===true){
        setTimeout(()=>{
          
          setOverlay(false)
        },2000)
      }
      },3000)
    }
  },[videoGot])
  useEffect(() => {
    console.log(gameMusic === "true", "gameSound");
    console.log(typeof gameMusic, "gameMusic");
    if (gameMusic === "true" || gameMusic === true) {
      console.log(audioRefHome.current.volume);
      audioRefHome.current.volume = 1;
      console.log("true for gameMusic");
      console.log(audioRefHome.current.volume);
      playAudioBg();
    } else {
      audioRefHome.current.volume = 0;
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
  }, [gameMusic]);
  useEffect(() => {
    console.log(gameSound === "true", "gameSound");
    console.log(typeof gameSound, "gameMusic");
    if (gameSound === "true" || gameSound === true) {
      console.log(audioRef.current.volume);
      audioRef.current.volume = 1;
      console.log("true for gameMusic");
      console.log(audioRef.current.volume);
    } else {
      audioRef.current.volume = 0;
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof setGameSound);
  }, [gameSound]);
  useEffect(() => {
    if (gameMusic === "true" || gameMusic === true) {
      console.log(audioRefHome.current.volume);
      audioRefHome.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    if (gameSound === "true" || gameSound === true) {
      console.log(audioRef.current.volume);
      audioRef.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
    // console.log()
  }, []);
  useEffect(()=>{
    const premiumData = JSON.parse(localStorage.getItem("premium"))
    if(premiumData===null||premiumData===undefined){
      setPremiumPopup(true)
    }
  },[])
  useEffect(() => {
    console.log(cameraState1);
  }, [cameraState1]);
  useEffect(() => {
    console.log(cameraState2);
  }, [cameraState2]);
  useEffect(() => {
    console.log(musicStatus, "musicStatus from Desc");

    playAudioBg();
  }, []);
  useEffect(() => {
    console.log(typeof audioStatus, "audioStatus");
    console.log(playAgain, "playAgain");

    if (playAgain === false) {
      console.log(audioStatus, "audioStatus from playagain");

      // playAudio(music.Whoops);
    }
  }, [playAgain]);
  useEffect(() => {
    if (freePlay >= configuration.FREE_PLAY_LIMIT) {
      setFreePlayNotReg(true);
    }
  }, [freePlay]);
  useEffect(() => {
    if (reportIssueCategories === true && audioStatus === "true") {
      playAudio(music.Chime);
    }
  }, [reportIssueCategories]);
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
    // dispatch(updateProfile());
  }, [dispatch]);
  useEffect(() => {
    localStorage.getItem("times")
      ? localStorage.setItem("times", freePlay)
      : localStorage.setItem("times", 0);
  }, [freePlay]);
  useEffect(() => {});
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
  // useEffect(() => {
  //   if (game) {
  //     if (
  //       game &&
  //       game.camera_data &&
  //       game.camera_data[0] &&
  //       game.camera_data[0].camera_id === "1"
  //     ) {
  //       setCamera(false);
  //     } else if (
  //       game &&
  //       game.camera_data &&
  //       game.camera_data[0] &&
  //       game.camera_data[0].camera_id === "2"
  //     ) {
  //       setCamera(true);
  //     }
  //     if (
  //       game &&
  //       game.camera_data &&
  //       game.camera_data[1] &&
  //       game.camera_data[1].camera_id === "1"
  //     ) {
  //       setCamera(false);
  //     } else if (
  //       game &&
  //       game.camera_data &&
  //       game.camera_data[1] &&
  //       game.camera_data[1].camera_id === "2"
  //     ) {
  //       setCamera(true);
  //     }
  //   }
  // }, [dispatch, game]);
  useEffect(() => {
    checkFreePlay();
  }, [gamePlayStatus]);
  useEffect(() => {
    if (
      game &&
      game.camera_data &&
      game.camera_data[0] &&
      game.camera_data[0].camera_id === "1"
    ) {
      setCamera(false);
    }
    if (
      game &&
      game.camera_data &&
      game.camera_data[1] &&
      game.camera_data[1].camera_id === "1"
    ) {
      setCamera(true);
    }
  }, [game, dispatch]);
  useEffect(() => {
    console.log("camera status", camera);
  }, [camera]);
  useEffect(()=>{
    if(wait===true){
      setPlayAgain(false)
    }
  },[wait])
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
  console.log(audioStatus, "audioStatus");
  // Extra Funcions
  const preventDragHandler = (e) => {
    e.preventDefault();
  };
  async function audioEnded(src) {
    if (musicStatus === "true") {
      // audioRefHome.current.unmute()
      audioRefHome.current.volume = 1;
      audioRefHome.current.src = src;
      audioRefHome.current.play();
    } else {
      audioRefHome.current.volume = 0;
      // audioRefHome.current.mute()
    }
  }
  async function playAudio(src) {
    console.log(audioStatus, "audioStatus");
    // audioRef.current.volume = 1
    if (audioStatus === "true") {
      console.log("reached here");
      audioRef.current.volume = 1;
      audioRef.current.src = src;
      audioRef.current.play();
      // console.log(audioRef.current.volume);
    } else {
      // audioRefHome.current.mute()
      // console.log(audioStatus);
      audioRef.current.volume = 0;
    }
  }
  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
    // if(musicStatus==="true"){
    console.log(audioRefHome.current.play(), "from its function");
    // audioRefHome.current.volume=1;
    audioRefHome.current.src = music.Game;
    audioRefHome.current.play();
    console.log(audioRefHome.current.volume, "from its function");

    // }
    // else{
    //   audioRefHome.current.volume = 0;

    // }
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
      // gameStatus();
      // gameSession()
    }, game.get_status_time);
  }
  async function timeOut(userId, timeout_status) {
    playAudio(music.Whoops);

    socket.emit(`${baseMessage}|P_ENDED`);
    socket.emit(`${baseMessage}|G_DISCONNECTED`);
    setTimeoutStatus(true);
    setTimeout(async () => {
      await gameLeave(userId, timeout_status);
      setTimeoutStatus(false);
      window.location.reload()
      EntryRequest.replay = true;
      dispatch(gameEntry(EntryRequest));
      // navigate("/prizes",{state:{category:sendCategory}})
    }, 5000);
  }
  async function replayTimeout(id) {
    setId(id);
    gameLeave(id, false);
    setPlayAgain(false);
    navigate("/prizes", { state: { category: sendCategory } });
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
    const message = `${baseMessage}|RH_MOVE_GIFT`;
    socket.emit(message);
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
    playAudio(music.Wincha);
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
    setFreePlay(freePlay+1)
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
        console.log("direction", game.camera_data[0].camera_id);

        localStorage.setItem("inGame", true);
        setWait(false);
        setStartGame(data.data[0]);
        setFirstStep(true);
        // console.log(firstStep)
      });
  }
  useEffect(()=>{
    console.log(startGame)
  },[startGame])
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
          // gameSession();
        }, game.get_status_time * 1000);
      });
  }
  async function gameStatus() {
    console.log(userId);
    const sessionData = {
      playerID: userId,
      machineCode: game.machineCode,
      source: "web",
    }
    await fetch(`${baseUrl}/game/status`, {
      method: "POST",
      body: JSON.stringify(sessionData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(sessionData,"sessionData");
        setStatus(data.status);
          gameSession(data.status);
      });
  }
  async function gameSession(statusCode) {
    console.log("session");
    // setStatus(true)
    const sessionData = {
      user_id: user._id,
        machineID: game._id,
        game_status: statusCode,
        product_id: GameData.id,
        game_session_id: startGame.game_session_id,
        source: "web",
    }
    await fetch(`${baseUrl}/game/session/status`, {
      method: "POST",
      body: JSON.stringify(sessionData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(startGame)
        console.log(sessionData,"sessionData");

        setSession(data.data);
        if (status === true) {
          // addToCart();
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
          // if(timeoutStatus===true){
            window.location.reload();

          // }
        }
      });
  }
  async function addToCart() {
    playAudio(music.Woohoo);
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
        dispatch(cartAction())
        dispatch(notificationAction())
        // setInterval(()=>{
        //   if()
        // })
        // navigate("/win-screen");
        // gameLeave();
        // socket.disconnect();
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
    const gamePriceInt = parseInt(GameData&&GameData.price);
    console.log(gamePriceInt)
    console.log(userPointInt)
    if (userPointInt < gamePriceInt) {
      // return navigate("/prizes")
      return setTopup(true);
    }

    await fetch(`${baseUrl}/points/update`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: user._id,
        point: GameData.price === "0" ? "0" : GameData.price,
        credicts: "false",
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data)
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
        playAudio(music.CoinDrop);
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
      body: JSON.stringify({
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
  useEffect(() => {
    if(gamePlayStatus===true){

      window.addEventListener('beforeunload', alertUser)
      window.addEventListener('unload', handleTabClosing)
      window.onbeforeunload = function() {
        var message = 'Do you want to leave this page?';
        return message;
    }
      return () => {
          window.removeEventListener('beforeunload', alertUser)
          window.removeEventListener('unload', handleTabClosing)
      }
      
      
    }
})
// useEffect(() => {
//   console.log(window)
//   // window.onbeforeunload = setExitPopupOpen(true);
//   // function confirmExit()
//   window.addEventListener('beforeunload',(event)=>{
//     event.preventDefault();
//     event.returnValue = ''

    
//   })

// })

const handleTabClosing = (event) => {
    // removePlayerFromGame()
    // console.log("exiting")\
    // gameLeave()
    event.preventDefault();
    event.returnValue ='';
    // setExitPopupOpen(true);

}

const alertUser = (event:any) => {
  console.log(event)
  gameLeave()
 event.preventDefault();
 
//  event.returnValue = setExitPopupOpen(true);
  // alert("helo")
}
useEffect(()=>{
  console.log(userId)
  console.log(prizeId)
},[prizeId,currentPrizeMove])
  return (
    <div className={style.Container}>
      <audio ref={audioRef}></audio>
      <audio ref={audioRefHome}></audio>
      {/* <audio ref={audioRefHome} onEnded={audioEnded(music.Game)}></audio> */}
      {prizeResetActive ? (
        <div className={style.popup}>
        <div className={style.OverlayBg} onClick={()=>{
            setPrizeResetActive(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Shall we move the prize to an easier position</p>
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
                setCurrentPrizeMove(true);
              }}
            >
              YES
            </button>
            {/* </Link> */}
            <Link
              to="/prizes"
              state={{ category: GameData.category }}
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
      {freePlayNotReg && userId === null ? (
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
        <div className={style.OverlayBg} onClick={()=>{
            setReportIssueCategories(false)
        }}>

        </div>
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
        <div className={style.OverlayBg} onClick={()=>{
            setReportContent(false)
        }}>

        </div>
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

      {freeLimitPopup && user&&user.vip === false ? (
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
          {/* <div className={style.PlayIcon}>
            {onPlay === true ? (
              <button
                onClick={() => {
                  setOnPlay(false);
                  handlePauseVideo();
                }}
              >
                {/* <img src={assets.PlayImage} alt="" /> */}
                {/* <MdPauseCircleFilled />
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
          </div> */}
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
              <video ref={vidRef} autoPlay muted={true}>
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
              {/* <p>{SelGameData.content}</p> */}
              <p>{SelGameData.content.length > 10 ? SelGameData.content.substring(0, 10) + "..." : SelGameData.content}</p>
            </div>
            <div
              className={style.popupPlayNow}
              onClick={() => {
                navigate(`/game/${SelGameData.slug}`, {
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
      {exitPopupOpen ? (
        <div className={style.popup}>
        <div className={style.OverlayBg} onClick={()=>{
            setExitPopupOpen(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Are you sure you want to leave this game?</p>
          </div>
          <div className={style.ExitpopupButton}>
            {/* <Link
            to="/tickets"
            onClick={() => {
              setLeavePopup(false);
            }}
          > */}
            <button
              onClick={() => {
                console.log(transferGame);
                setExitPopupOpen(false);
                gameLeave();
                // socket.disconnect();
                
                // window.location.reload();
                navigate(`/prizes`, {
                  state: { category: sendCategory },
                });
                // window.location.reload()
              }}
            >
              YES
            </button>
            {/* </Link> */}
            <button
              onClick={() => {
                setExitPopupOpen(false);
                console.log("hello");
              }}
            >
              NO
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {leavePopup ? (
        <div className={style.popup}>
        <div className={style.OverlayBg} onClick={()=>{
            setLeavePopup(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Are you sure you want to leave this game?</p>
          </div>
          <div className={style.ExitpopupButton}>
            {/* <Link
            to="/tickets"
            onClick={() => {
              setLeavePopup(false);
            }}
          > */}
            <button
              onClick={() => {
                console.log(transferGame);
                setLeavePopup(false);
                gameLeave();
                // socket.disconnect();
                navigate(`/game/${transferGame.slug}`, {
                  state: { game: transferGame,category:transferGame.category},
                });
                window.location.reload();
                // window.location.reload()
              }}
            >
              YES
            </button>
            {/* </Link> */}
            <button
              onClick={() => {
                setLeavePopup(false);
                console.log("hello");
              }}
            >
              NO
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {active&&gamePlay===true? (
        <div className={style.popup}>
        <div className={style.OverlayBg} onClick={()=>{
            setLeavePopup(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Are you sure you want to leave this game?</p>
          </div>
          <div className={style.ExitpopupButton}>
            {/* <Link
            to="/tickets"
            onClick={() => {
              setLeavePopup(false);
            }}
          > */}
            <button
              onClick={() => {
                // console.log(transferGame);
                setActive(false);
                gameLeave();
                // socket.disconnect();
                // navigate(`/game/${transferGame.slug}`, {
                //   state: { game: transferGame,category:transferGame.category},
                // });
                navigate(`/${pageUrl}`)
                // window.location.reload();
                // window.location.reload()
              }}
            >
              YES
            </button>
            {/* </Link> */}
            <button
              onClick={() => {
                setActive(false);
                console.log("hello");
              }}
            >
              NO
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Section}>
        <div className={style.ExtraGames}>
          <div className={style.ExtraButton}>
            <button
              style={{ pointerEvents: gamePlayStatus ? "none" : "visible" }}
              onClick={() => {
                if (gamePlayStatus === true) {
                  setActive(true);
                }
                if (gamePlayStatus === false) {
                  setActive(false);
                  setExitPopupOpen(true);
                  // navigate("/prizes", {
                  //   state: { category: sendCategory },
                  // });
                  console.log("exiting popuop camed")
                }
                console.log(GameData);
              }}
            >
              EXIT GAME
            </button>
          </div>
          <div className={style.Description}>
            <p>YOU MIGHT ALSO LIKE</p>
          </div>
          <div className={style.AllGames}>
            {products.length>0&&products.map((game) => {
              return (
                // <div
                //   to={`/game/${game.id}`}
                //   state={{ game: game }}
                //  onClick={()=>{
                //   window.location.reload()
                // }}>
                // >
                <div
                  className={style.Game}
                  style={{ pointerEvents: gamePlayStatus ? "none" : "visible" }}
                  onClick={() => {
                    setLeavePopup(true);
                    setTransferGame(game);
                  }}

                  // style={{
                  //   pointerEvents: gamePlayStatus ? "none" : "visible",
                  //   cursor: gamePlayStatus ? "not-allowed" : "pointer",
                  // }}
                >
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
                        <p>{game.price === "0" ? "FREE" : game.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
                // </div>
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
                  <Lotties animationData={AllAnimation.Loader} />
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
              {
                game &&
                game.camera_data &&
                game.camera_data[0] &&
                game.camera_data[0].camera_id === "1" ? (
                  // direction&&direction[1]==="Left"?
                  <div className={style.AllVideoSection}>
                    <div
                      className={
                        camera === true ? style.hideVideo : style.video
                      }
                    >
                      {overlay?
                      
                      <div className={style.gameGuideOverlay}>
                        <div className={style.GameFullOverlay} onClick={()=>{
                          setTimeout(()=>{
                          setOverlay(false) 

                          },3000)
                        }}>

                        </div>
                      <img src={overlayImage} alt="" />
                    </div>
                  :""}
                      
                      {timeoutStatus ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.timeout}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {playAgain===true&&hideEverything===false ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.missed}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :""} 
                    {game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}  
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
                      className={
                        camera === true ? style.video : style.hideVideo
                      }
                    >
                     {overlay?
                      
                      <div className={style.gameGuideOverlay}>
                        <div className={style.GameFullOverlay} onClick={()=>{
                           setTimeout(()=>{
                          setOverlay(false) 

                          },3000)
                        }}>

                        </div>
                      <img src={overlayImage} alt="" />
                    </div>
                  :""}
                      {timeoutStatus ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.timeout}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {playAgain===true&&hideEverything===false? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.missed}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                     
                       {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :""} 
                    {game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}  
                       prizeMoveUser
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
                ) : game &&
                  game.camera_data &&
                  game.camera_data[0] &&
                  game.camera_data[0].camera_id === "2" ? (
                  <div className={style.AllVideoSection}>
                    <div
                      className={
                        camera === true ? style.hideVideo : style.video
                      }
                    >
                     {overlay?
                      
                      <div className={style.gameGuideOverlay}>
                        <div className={style.GameFullOverlay} onClick={()=>{
                           setTimeout(()=>{
                          setOverlay(false) 

                          },3000)
                        }}>

                        </div>
                      <img src={overlayImage} alt="" />
                    </div>
                  :""}
               {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :""} 
                    {game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}  
                      {timeoutStatus ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.timeout}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {playAgain===true&&hideEverything===false ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.missed}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :""} 
                    {game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}  
                      
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
                      className={
                        camera === true ? style.video : style.hideVideo
                      }
                    >
                      {overlay?
                      
                      <div className={style.gameGuideOverlay}>
                        <div className={style.GameFullOverlay} onClick={()=>{
                           setTimeout(()=>{
                          setOverlay(false) 

                          },3000)
                        }}>

                        </div>
                      <img src={overlayImage} alt="" />
                    </div>
                  :""}
                      {timeoutStatus ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.timeout}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {playAgain===true&&hideEverything===false ? (
                        <div className={style.TimeoutAnimation}>
                          <Lotties
                            animationData={AllAnimation.missed}
                            loop={false}
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                     {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :""} 
                    {game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}  
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
                ) : (
                  ""
                ) // :direction&&direction[1]==="Right"?
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
                      ) :hideEverything===false? 
                        <button
                          onClick={() => {
                            setPrizeResetActive(true);
                            setPlayAgain(false);

                            // prizeReset()
                          }}
                        >
                          <img src={assets.greenPrizeMove} alt="" />
                        </button>
                      :""
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
                        wait === true ? (
                          <Lotties
                            animationData={AllAnimation.waitPulse}
                            loop={false}
                            onComplete={() => {
                              PointDebit();
                            }}
                          />
                        ) : firstStep ? (
                          game.camera_data[0].camera_id === "1" ? (
                            direction && direction[1] === "Right" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    ref={animeRef}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    ref={animeRef}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.RightArrowPressed
                                        : assets.RightArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState2(true);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(false);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : direction && direction[1] === "Left" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log(animeRef.current);
                                      console.log("clicked");
                                      setCameraState2(true);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState2(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    // isPaused={animeRef}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.LeftArrowPressed
                                        : assets.LeftArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      // console.log(cameraState1)
                                      setCameraState1(true);
                                      // console.log(animeRef.current)
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          ) : game.camera_data[0].camera_id === "2" ? (
                            direction && direction[1] === "Right" ? (
                              //  <div className={style.playImageLoader}>
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.RightArrowPressed
                                        : assets.RightArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState2(false);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(true);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : direction && direction[1] === "Left" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.LeftArrowPressed
                                        : assets.LeftArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState2(false);
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState2(true);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            <button>
                              <Lotties
                                animationData={AllAnimation.ReverseWait}
                                loop={false}
                              />
                            </button>
                          )
                        ) : secondStep ? (
                          game.camera_data[0].camera_id === "1" ? (
                            direction && direction[1] === "Right" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.LeftArrowPressed
                                        : assets.LeftArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : direction && direction[1] === "Left" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.RightArrowPressed
                                        : assets.RightArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <button>
                                <img src={waitStatic} alt="" />
                              </button>
                            )
                          ) : game.camera_data[0].camera_id === "2" ? (
                            direction && direction[1] === "Right" ? (
                              //  <div className={style.playImageLoader}>
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      //  <img src={cameraState1?assets.UpArrowPressed:assets.UpArrow} alt=""  onMouseDown={() => {
                                      console.log("second arrow left true");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                      console.log(cameraState2);
                                    }}
                                    onMouseUp={() => {
                                      setCameraState2(false);
                                      console.log(cameraState2);

                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      console.log("second arrow left false");
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.LeftArrowPressed
                                        : assets.LeftArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      //  <img src={cameraState2?assets.LeftArrowPressed:assets.LeftArrow} alt=""  onMouseDown={() => {
                                      //  <img src={assets.LeftArrowPressed} alt=""  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      console.log(
                                        "second release arrow left false"
                                      );

                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                    onDragStart={preventDragHandler}
                                  />
                                </div>
                              </div>
                            ) : direction && direction[1] === "Left" ? (
                              <div className={style.ArrowBothButtons}>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoader
                                      : style.playImageLoaderActive
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState1
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    camera
                                      ? style.playImageLoaderActive
                                      : style.playImageLoader
                                  }
                                >
                                  <Lotties
                                    animationData={AllAnimation.Progress1}
                                    loop={false}
                                    onComplete={() => {
                                      timeOut(userId, false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                  />
                                  <img
                                    src={
                                      cameraState2
                                        ? assets.RightArrowPressed
                                        : assets.RightArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <button>
                                <img src={waitStatic} alt="" />
                              </button>
                            )
                          ) : (
                            <button>
                              <Lotties
                                animationData={AllAnimation.ArrowLeft}
                                loop={false}
                              />
                            </button>
                          )
                        ) : timeoutStatus ? (
                          <button>
                            <img src={assets.timeOutImage} alt="" />
                          </button>
                        ) : (
                          <button>
                            <Lotties
                              animationData={waitAnimation}
                              loop={false}
                              onComplete={() => {
                                  console.log(prizeDate)
                                if(prizeDate==="PRIZE_WON"){
                                  console.log(prizeCount)
                                  console.log(prizeDate)
                                     addToCart();
                                   navigate("/win-screen",{state:{game:GameData}});
                                    gameLeave();
                                    socket.disconnect();
                                    setGamePlayStatus(false);
                                setGamePlay(false);
                                setPlayAgain(false);
                                }
                                else{
                                setGamePlayStatus(false);
                                // setGamePlay(false);
                                setPlayAgain(true);

                                }
                              }}
                            />
                          </button>
                        )
                      ) : (
                        <button>
                          <Lotties
                            animationData={AllAnimation.wait_50}
                            loop={false}
                          />
                        </button>
                      )
                    ) : playAgain ? (
                      <button
                        onClick={() => {
                          setWait(true);
                          setGamePlayStatus(true);
                          // setGamePlay(true);
                          setPlayAgain(false);
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
                        }}
                      >
                        <Lotties
                          animationData={AllAnimation.ReversePlay}
                          loop={false}
                          duration={20}
                          onLoad={() => {
                            playAudio(music.Woohoo);
                          }}
                          // pause={prizeResetActive}
                          onComplete={() => {
                            gameLeave(userId, false);
                            setPlayAgain(false);
                            navigate("/prizes",{state:{category:sendCategory}})

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
        <div className={style.MLeftSide}>
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
                <IoIosArrowDown
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
        <div className={style.LeftSide}>
          {minimized ? (
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
                <img src={GameData?.featured_image?.large} alt="" />
              </div>
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
