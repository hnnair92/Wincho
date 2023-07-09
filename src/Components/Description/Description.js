import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configutation, gameEntry,getProductByCollection,getAllGames } from "../../actions/product";
import { cartAction, notificationAction, registerAction, updateProfile } from "../../actions/user";
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
import { baseUrl } from "../url";
import videoSrc from "../../assests/video/wincha.mp4";
import PlayGameAudio from "../Audio/PlayAudio";
import PlaySound from "../Audio/PlaySound";
const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};
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
  userJoined,
  setUserJoined
}) => {
  console.log(localStorage);
  console.log(active, "active from description");
  const dispatch = useDispatch();
  const videoParentRef = useRef();
  const [shouldUseImage, setShouldUseImage] = useState(false);
  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", ""); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none";
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const GameData = state && state.game;
  // const baseUrl = process.env.REACT_APP_BASEURL
  const [userFocusCheck,setUserFocusCheck] = useState(true)
  
  const onFocus = (e) => {
    const timeoutId = JSON.parse(localStorage.getItem("timeoutId"))
    localStorage.setItem("blur",JSON.stringify(false))
    console.log("focus")
    console.log(isUserFocus)
    setUserFocusCheck(true)
    let blurCheck = localStorage.getItem("blur")?JSON.parse(localStorage.getItem("blur")):""
    // console.log(blurCheck,"checking")
    if(blurCheck===false){
      console.log(timeoutId)
      clearTimeout(timeoutId)
      window.removeEventListener("blur",(e)=>{
        onBlur(e,false)
      })
    }
    setUserFocusCheck(false)
    // setIsUserFocus("FOCUS")
    
  };
  const[playAudio,setPlayAudio] = useState()
  let Animestate = JSON.parse(localStorage.getItem("state"))
  const audioRef = useRef(null);
  const audioRefHome = useRef(null);
  const animeRef = useRef(null);
  const animeRef2 = useRef(null);
  const newDate = new Date()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  const date = newDate.getDate()
  const day = newDate.getDay()
  const CustomDate = new Date(year,month+1,0)
  const lastDateOfTheMonth = CustomDate.getDate()
  const utc = newDate.getUTCMilliseconds()
  const milliseconds = newDate.getTime()
  console.log(state);
  const animeStatus = JSON.parse(localStorage.getItem("animeStatus"))
  const localDate = JSON.parse(localStorage.getItem("dates"))
  const deviceId = JSON.parse(localStorage.getItem("deviceId"))
  // const checkUserArray = JSON.parse(localStorage.getItem("checkPlay"))?JSON.parse(localStorage.getItem("checkPlay")):[]
  // const checkUserArray = JSON.parse(localStorage.getItem("checkPlay"))?JSON.parse(localStorage.getItem("checkPlay")):[]
  // useEffect(()=>{
  //   if(deviceId===null){
  //     localStorage.setItem("deviceId",JSON.stringify(milliseconds*utc))
  //   }
  // })
 
  const [animeStopStatus,setAnimeStopStatus] = useState(false)
  useEffect(()=>{
    if(animeStatus===null||animeStatus===undefined||animeStatus==="undefined"){
        localStorage.setItem("animeStatus",JSON.stringify(false))
        
    }
    if(animeStopStatus===false){
      localStorage.setItem("animeStatus",JSON.stringify(false))
      
    }
    if(animeStopStatus===true){
      localStorage.setItem("animeStatus",JSON.stringify(true))

    }
  },[animeStopStatus,animeStatus])
  const [checkDateCount,setCheckDateCount] = useState(0)
  useEffect(()=>{
    console.log(animeStopStatus)
  },[animeStopStatus])
  // const checkUserArray = []
  // const checkUserArray = JSON.parse(localStorage.getItem("checkPlay"))
  // const [checkDateCount,setCheckDateCount] = useState(localStorage.getItem("checkPlay")?JSON.parse(localStorage.getItem("checkPlay")):localStorage.setItem("checkPlay",JSON.stringify(0)))
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
  if(active===true&&pageUrl!==""){
    // gameLeave(userId,false)
    // setExitPopupOpen(true)
  }

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
  const onBlur = (e,check) => {
    localStorage.setItem("blur",JSON.stringify(true))    // setIsUserFocus("BLUR")
    console.log("Tab is blurred", e);
    let blurCheck = localStorage.getItem("blur")?JSON.parse(localStorage.getItem("blur")):""
    setUserFocusCheck(false)
    // if(t)
    let timeoutId = setTimeout(()=>{
      blurCheck =  localStorage.getItem("blur")?JSON.parse(localStorage.getItem("blur")):""

      if(check===false&&blurCheck===true){
      // if(check===false&&userFocusCheck===false&&isUserFocus===""){
        setIsUserFocus(timeoutId)
        console.log("navigated with userFocusCheck")
        // console.log(blurCheck)
        // gameLeave(userId,false)
        // navigate("/prizes",{state:{category:sendCategory}})
      }
      else{
        clearTimeout(timeoutId)
        console.log(blurCheck)
        
        console.log("timeout cleared")

      }
      // if(check===false&&userFocusCheck===false&&isUserFocus===""){
      //   clearTimeout(timeoutId)
      //   console.log(userFocusCheck)
        
      //   console.log("timeout cleared")
        
      // }
      // else{
      //   setIsUserFocus(timeoutId)
      //   console.log("navigated with userFocusCheck")
      //   console.log(userFocusCheck)
      //   navigate("/prizes",{state:{category:sendCategory}})

      // }
      localStorage.setItem("timeoutId",JSON.stringify(timeoutId))
      return timeoutId;

      // console.log("navigated")
    },25000)
    
    // alert("DO you wana exist this page");
  };
  useEffect(()=>{
    let checkIsUser =JSON.parse(localStorage.getItem("userJoined"))
    if(checkIsUser===false){
      let timeoutCheckuser = setTimeout(()=>{
        checkIsUser =JSON.parse(localStorage.getItem("userJoined"))
        if(checkIsUser===false){
          // gameLeave(userId,false)
          // navigate("/prizes",{state:{category:sendCategory}})
          console.log("yes exiting");
          console.log(userJoined,"userJoined");
          
        }
        else{
          clearTimeout(timeoutCheckuser)
        }
      },120000)
    }
  },[userJoined])
  useEffect(() => {
    console.log(navigator.onLine);
  }, [navigator]);
  const videoRef = useRef();
  const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    if(userId===undefined||userId==="undefined"){
      localStorage.removeItem("user")
    }
  },[userId])
  // const userId = JSON.parse(localStorage.getItem("user"));
  // localStorage.getItem("user")?localStorage.getItem("user"):localStorage.setItem("user","")
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
  const [checkPrizeWon, setCheckPrizeWon] = useState("");
  const [showUserPopup,setShowUserPopup] = useState(false)
  const [overlay,setOverlay] = useState(true);
  const [reloadStatus,setReloadStatus] = useState(false)
  const [sendCategory,setSendCategory] = useState("")
  const [lastWin, setLastWin] = useState(false);
  const [minimized, setminimized] = useState(false);
  const [kickout,setKickOut] = useState(false)
  const [cartCheck,setCartCheck] = useState(false)
  const [timeoutStatus, setTimeoutStatus] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [cameraState1, setCameraState1] = useState(false);
  const [cameraState2, setCameraState2] = useState(false);
  const [howToPlayStatus, setHowToPlayStatus] = useState(false);
  const [session, setSession] = useState({});
  const [firstStep, setFirstStep] = useState(false);
  const [freePlayNotReg, setFreePlayNotReg] = useState(false);
  const [secondStep, setSecondStep] = useState(false);
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(false);
  const [count, setCount] = useState(0);
  const [viewCount, setViewCount] = useState("");
  const [onPlay, setOnPlay] = useState(false);
  const [prizeId,setPrizeID] = useState("")
  const [showGrayIcon,setShowGrayIcon] = useState(false)
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(0))
  );
  const [startGame, setStartGame] = useState({});
  const [gameStartStatus, setGameStartStatus] = useState(false);
  const [prizeMoveIcon,setPrizeMoveIcon] = useState(false)
  const [reportIssueCategories, setReportIssueCategories] = useState(false);
  const [reportContent, setReportContent] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);
  const [category, setCategory] = useState("");
  const [reportText, setReportText] = useState("");
  const [prizeResetStatus,setPrizeResetStatus] = useState("")
  const [ifPerson, setIfPerson] = useState(
    JSON.parse(localStorage.getItem("tabsOpen"))
  );
  const [popup, setPopup] = useState(false);
  const [transferGame, setTransferGame] = useState({});
  const [SelGameData, setSelGameData] = useState({});
  const [freePlay, setFreePlay] = useState(
    localStorage.getItem("times")
      ? localStorage.getItem("times")
      : 0
  );
    useEffect(()=>{
      console.log(gamePlay)
    },[gamePlay])
    useEffect(()=>{
      console.log(active)
    },[active])
  const [prizeCount,setPrizeCount] = useState(0)
  const [gameJoinCount,setGameJoinCount] = useState(0)
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
  const [showGrayPrizeIcon,setShowGrayPrizeIcon] = useState(false)
  const [isTimeout, setisTimeout] = useState(false);
  const [hideEverything,setHideEverything] = useState(false)
  const [report, setReport] = useState({
    Title: "",
    Content: "",
  });
  const [status, setStatus] = useState({});
  const [videoGot, setVideoGot] = useState(false);
  const [checkPlayArray, setCheckPlayArray] = useState([]);
  const [isUserFocus,setIsUserFocus] = useState("")

  const { game, loading } = useSelector((state) => state.gameEntry);
  const { user } = useSelector((state) => state.profile);
  const { configuration } = useSelector((state) => state.configuration);
  const { products } = useSelector((state) => state.collectionProducts);
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    if(GameData&&GameData.category){
      const datas = GameData.category.split(",")
      console.log(datas)
      setSendCategory(datas[0])
    }
  },[GameData])
  useEffect(()=>{                                                                                                                                  
    console.log(leavePopup)
  },[leavePopup])
  useEffect(()=>{
    console.log(exitPopupOpen)
  },[exitPopupOpen])
  useEffect(()=>{
    checkFreePlay()
  },[])
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
      checkAnime();
    }
  }, []);
 useEffect(()=>{
  if(active===true&&gamePlay===false){
    console.log("not reached")
  }
 },[active,gamePlay])
  useEffect(()=>{
    if(GameData&&GameData.price!=="0"&&userId===null){
      navigate("/login")
    }
  },[])
  // useEffect(()=>{
  //   const userRegAnom = {
  //     username:"",
  //     email:"",
  //     password:"",
  //     dob:"",
  //     country:"",
  //     state:"",
  //     countrycode:configuration&&configuration.COUNTRY_CODE,
  //     countryname:configuration&&configuration.COUNTRY_NAME,
  //     user_type:"anonymous",
  //     device_id:deviceId?deviceId:""
      
  // }
  //   if(userId===null){
  //     localStorage.setItem("deviceId",JSON.stringify(milliseconds*utc))
  //     if(userId===undefined){
  //       localStorage.removeItem("user")
  //     }
  //     dispatch(registerAction(userRegAnom))
  //     dispatch(updateProfile())
  //   }
  //   dispatch(updateProfile())

  // },[userId])
  // useEffect(()=>{
  //   console.log(userId)
  //   const userRegAnom = {
  //     username:"",
  //     email:"",
  //     password:"",
  //     dob:"",
  //     country:"",
  //     state:"",
  //     countrycode:configuration.COUNTRY_CODE,
  //     countryname:configuration.COUNTRY_NAME,
  //     user_type:"anonymous",
  //     device_id:deviceId?deviceId:""
      
  // }
  //   if(userId===undefined||userId==="undefined"){
  //       localStorage.removeItem("user")
  //     dispatch(registerAction(userRegAnom))
  //   dispatch(updateProfile())
      
  //   }
  //   dispatch(updateProfile())
  // },[userId])

  useEffect(()=>{
    console.log(parseInt(configuration.GamePlayCount))
  },[configuration])
  useEffect(()=>{
    console.log(count)
  },[count])
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
        setShowUserPopup(true)
      }
      if(progress==="INPROGRESS"){
        setPrizeDate("PRIZE_WON")
        setCurrentPrizeMove(true)
      }
    });
    socket.on("watchers_count", (res) => {
      const splitRes = res.split("|");
      const splitViews = splitRes[splitRes.length - 1].split(":");
      const splitId = splitRes[0].split(":");
      if (GameData.machine_code === splitId[1]) {
        console.log(splitViews[splitViews.length - 1]);
        setViewCount(splitViews[splitViews.length - 1]);
      }
      console.log(res);
      console.log(GameData.machine_code===splitId[1]);
      console.log(GameData.machine_code);
      console.log(splitId[1]);
      //   setViewCount();
    });
    socket.on("get_machine_status", (res) => {
      console.log(res);
      const resData = res.split("|")
      const socketData = resData[resData.length-1]
      console.log(socketData)
      console.log(resData)
      if(socketData==="inactive"){
        localStorage.setItem("reload",false)
        setKickOut(true)
        setVideoGot(false)
      }
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
      const splitRes = res.split("|");
      const data = splitRes[splitRes.length - 1];
      console.log(data)
      setCheckPrizeWon(data)
      setPrizeDate(data)
      setCurrentPrizeMove(true)
    });
    socket.on("prize_reset", (res) => {
      console.log(res);
      const splitData = res.split("|")
      const resetData = splitData[splitData.length-1]
      console.log(resetData)
      console.log(typeof resetData)
      if(resetData==="RESET"){
        setPrizeResetStatus(resetData)
        setPrizeDate(resetData)
        setCurrentPrizeMove(false)
        dispatch(gameEntry(EntryRequest))

      }
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
          setPrizeDate(data)
          setPlayAgain(false);
      }
      if (data === "PRIZE_LOST" && GameData.machine_code === splitId[1]) {
      }
      if (
        data === "RH_POSITION_CHANGED" &&
        GameData.machine_code === machineId[1]
      ) {
        setCurrentPrizeMove(false);
        setShowUserPopup(false)
        setShowGrayPrizeIcon(false)
        setPrizeMoveIcon(false);
        setShowGrayIcon(false)
        setPrizeDate("RESET")
        socket.emit("sent_help_status", `${baseMessage}|RECEIVED`);
        socket.emit(
          "confirm_move",
          `${baseMessage}|RH_POSITION_CHANGED`
        );
        if(user[1]===userId){
          console.log(user[1])
            console.log(prizeCount)
          console.log(count,"count from prize move")
        setHideEverything(true)
        setPlayAgain(true)
        setCount(count=>count+1)
        console.log(que,"que from prize move")
        }
      }
      console.log(res);
    });
    socket.on("disconnect", (res) => {
      console.log(res);
    });
  }, [socket, que]);
useEffect(()=>{
  console.log(viewCount)
},[viewCount])
  let EntryRequest = {};
  useEffect(() => {
    console.log(videoGot, "video got in description");
  }, [videoGot]);

  useEffect(()=>{
    if(game&&game.prize_reset_status===false){
      setCurrentPrizeMove(false)
      setPrizeDate("RESET")

    }
    if(game&&game.price_move_status===false){
      setCurrentPrizeMove(false)
      setPrizeDate("RESET")
    }
    if(game&&game.price_move_status===true){
      setCurrentPrizeMove(true)
      setPrizeDate("PRIZE_WON")
    }
    if(game&&game.prize_reset_status===true){
      setCurrentPrizeMove(true)
      setPrizeDate("PRIZE_WON")

    }
  },[game])
  useEffect(()=>{
    console.log(prizeDate)
  },[prizeDate])
  useEffect(()=>{
    console.log(currentPrizeMove)
  },[currentPrizeMove])
  useEffect(()=>{
    console.log(currentPrizeMove)
  },[currentPrizeMove])
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
  
  

  useEffect(()=>{
    // count % parseInt(configuration.GamePlayCount) === 0 &&
    //                 playAgain &&
    //                 count != 0 ? 
    //                   hideEverything===false? 
    console.log(count)
    console.log(count%parseInt(configuration.GamePlayCount))
    console.log(count%parseInt(configuration.GamePlayCount)===0)
  },[count])
  useEffect(()=>{
    console.log(parseInt(configuration.GamePlayCount))
    // consle.log(parseInt(configuration.GamePlayCount))
    console.log(parseInt(count%configuration.GamePlayCount))
    console.log(parseInt(count%configuration.GamePlayCount)===0)
  },[configuration])
  useEffect(()=>{
    console.log(hideEverything)
  },[hideEverything])
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
    console.log(showGrayPrizeIcon);
  }, [showGrayPrizeIcon]);
  useEffect(() => {
    console.log(cameraState2);
  }, [cameraState2]);
  useEffect(() => {
    console.log(freePlay);
    console.log(freePlay >= configuration.FREE_PLAY_LIMIT &&
      GameData.price === "0"&&user&&user.vip===false);
    console.log(  freePlay >= configuration.FREE_PLAY_LIMIT &&
      GameData.price === "0")
  }, [freePlay,configuration]);
  
  const setPlayBack = () => {
    vidRef.current.playbackRate = 1.5;
  };

  // useEffect(() => {
  //   if (freePlay >= configuration.FREE_PLAY_LIMIT) {
  //     setFreePlayNotReg(true);
  //   }
  // }, [freePlay,configuration]);
  useEffect(() => {
    if (reportIssueCategories === true && audioStatus === "true") {
      setPlayAudio(music.Chime);
    }
  }, [reportIssueCategories]);

  useEffect(() => {
    if (GameData) {
      
      EntryRequest = {
        catalog: GameData && GameData.id,
        playerID: userId===null||userId===undefined?milliseconds*utc: userId,
        machineCode: GameData && GameData.machine_code,
        source: "web",
        replay: false,
        //  ,
      freeplay:GameData.price==="0"?true:false,

      };
      dispatch(gameEntry(EntryRequest));
      dispatch(configutation());
      // dispatch(getAllGames(userId));

      //   console.log(EntryRequest);
    }
    // dispatch(updateProfile());
  }, [dispatch]);


  useEffect(() => {
    const userPlayCount = {
      userId: userId,
      count:checkDateCount,
      date:date
    }
  const checkUserArray = localStorage.getItem("checkPlay")

    if(checkUserArray===null||checkUserArray===undefined){
      setCheckPlayArray((checkPlayArray=>[...checkPlayArray,userPlayCount]))
      console.log(userPlayCount)
      console.log(typeof checkUserArray)
      localStorage.setItem("checkPlay",checkPlayArray)
      console.log(checkPlayArray)
      
    }
    // setCheckPlayArray((checkPlayArray=>[...checkPlayArray,userPlayCount]))
    // localStorage.getItem("checkPlay")
    //   ? localStorage.setItem("checkPlay", JSON.stringify(checkPlayArray))
    //   : localStorage.setItem("checkPlay", JSON.stringify(checkPlayArray));
    // if(localDate<date){
    //   localStorage.setItem("checkPlay", JSON.stringify(checkPlayArray))
    // }
  }, []);


  useEffect(() => {
    localStorage.getItem("times")
      ? localStorage.setItem("times", JSON.stringify(freePlay))
      : localStorage.setItem("times", 0);
      console.log(freePlay)
      // console.log()
  }, [freePlay]);
  useEffect(() => {});
  useEffect(() => {
    console.log(window.navigator);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", (e)=>{
      onBlur(e,false)
    });
    window.addEventListener("offline", () => {
      console.log("I am offline.");
    });
    //
    window.addEventListener("online", () => {
      console.log("I am back online.");
    });

    // onFocus();
    return () => {
      // usePrompt("Hello from usePrompt -- Are you sure you want to leave?", isBlocking);
      window.addEventListener("offline", () => {
        console.log("I am offline.");
      });

      window.addEventListener("online", () => {
        console.log("I am back online.");
      });
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", (e)=>{
        onBlur(e,false)
      });
    };
  });
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
  // const [addNumArray,setAddNumArray] = useState([1])
  let addNumArray = [1]
  useEffect(()=>{
    const fetchData = {
      // category_id:state.category,
      // user_id:userId,
      // countryCode:user.countryCode
      category_id: state&&state.cateogry,
    country_code: configuration.COUNTRY_NAME,
    user_id: userId,
    }
    dispatch(getProductByCollection(fetchData))
    console.log(fetchData);
    // dispatch(getAllGames())
  },[dispatch,state])
  useEffect(()=>{
    let getNum = 1;
    if(products){
      while(getNum<6){
        addNumArray.forEach((num)=>{
          
          let randomNumber = Math.random() * (products.length-0) + 0
          if(randomNumber!==num){
            addNumArray.push(parseInt(randomNumber))
            // setAddNumArray((addNumArray)=>[...addNumArray,randomNumber]) 
            getNum = getNum + 1;
          }
          console.log(randomNumber)
        })
        console.log(getNum)
        console.log(products.length)
        console.log(addNumArray)

      }
    }
  },[products])
  useEffect(() => {
    checkFreePlay();
  }, [gamePlayStatus]);
  useEffect(() => {
    changeFreePlayDaily();
  }, [checkDateCount]);
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
          <p>Woah there! You haven't got enough tickets</p>
        </div>
        <div className={style.popupButton}>
        
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
        <p>Woah there! You haven't got enough tickets</p>
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
        <p>Woah there! You haven't got enough tickets</p>
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
          <p>You've used all of your daily free plays</p>
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
  
  // Extra Funcions
  const preventDragHandler = (e) => {
    e.preventDefault();
  };

 

  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  const handlePauseVideo = () => {
    vidRef.current.pause();
  };
  useEffect(()=>{
      JSON.stringify(localStorage.setItem("times",freePlay))
  },[freePlay])

  // All Game Screen API's
  async function checkFreePlay() {
    const userBody={
      user: user&&user.username===""?"":userId,
      device_id: user&&user.username===""?JSON.parse(localStorage.getItem("deviceId")):"",
    }
    await fetch(`${baseUrl}/game/freeplay/limit`, {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(userBody);
        // changeFreePlayDaily()
        setFreePlay(data.data[0].freeplay_limit)
        // localStorage.setItem(
        //   "times",data.data[0].freeplay_limit
        // );
      });
  }
  async function changeFreePlayDaily(){
    // console.log(milliseconds*utc)
    // console.log(checkDateCount)
    // if(checkDateCount<=0){
    //   localStorage.setItem("dates",parseInt(date))
    // }
    // else if(localDate<date){
    //     localStorage.setItem("dates",parseInt(date))
        // localStorage.setItem("checkPlay",0)
      //   localStorage.setItem("deviceId",JSON.stringify(milliseconds*utc))
      // }

    
    console.log(lastDateOfTheMonth)
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
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
    setPlayAudio(music.Whoops);

    socket.emit(`${baseMessage}|P_ENDED`);
    socket.emit(`${baseMessage}|G_DISCONNECTED`);
    setTimeoutStatus(true);
    localStorage.setItem("reload",false)
    setReloadStatus(false)
    localStorage.setItem("timeoutState",JSON.stringify(true))
    
    setTimeout(async () => {
      await gameLeave(userId, timeout_status);
      setTimeoutStatus(false);
      // setKickOut(true)
      setVideoGot(false)
      setPlayAgain(false)
      setGamePlayStatus(false)
      setGamePlay(false)
      setUserJoined(false)
      window.location.reload()
      // EntryRequest.replay = true;
      // dispatch(gameEntry(EntryRequest));
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
    console.log(game.machine_delay_time)
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
      case 30:
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
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
  async function gameJoin(e) {
    // setActive(false)
    console.log(EntryRequest)
    checkAnime();
    console.log(typeof GameData.price)
    setPlayAudio(music.Wincha);
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
    const joinBody = {
      machineCode: game.machineCode,
      playerID: userId,
      freeplay:GameData.price==="0"?true:false,
      //  ,
      source: "web",
    }
    await fetch(`${baseUrl}/game/join`, {
      method: "POST",
      body: JSON.stringify(joinBody),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
    .then((res) => res.json())
    .then((data) => {
        setUserJoined(true)
        localStorage.setItem("userJoined",JSON.stringify(true))
        // setReloadStatus(true)
        console.log(data);
        console.log(joinBody,"joinBody");
        if (que === "0") {
          console.log(que);
        } else {
          console.log(que);
          console.log("not zero");
        }
        setGamePlayStatus(true);
      });
  }
  useEffect(()=>{
    console.log(userJoined)
  },[userJoined])
  useEffect(()=>{
    console.log(gamePlay)
  },[gamePlay])
  useEffect(()=>{
    console.log(active)
  },[active])


  async function gameStart() {
    console.log("started")
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
    // console.log(freePlay)
    // localStorage.setItem("times",JSON.stringify(freePlay))
    // const freePl = JSON.parse(localStorage.getItem("times"))
    // console.log(freePl);
    // setFreePlay(freePlay+1)
    if(GameData.price==="0"&&user?.vip===false){
      setCheckDateCount(checkDateCount+1)
      // localStorage.setItem("checkPlay",checkDateCount)
    }
    console.log(direction);
    socket.emit("peer_message", `${baseMessage}|P_STARTED`);
    const startBody = {
      playerID: userId,
      machineCode: game.machineCode,
      source: "web",
      //  ,
      freeplay:GameData.price==="0"?true:false,
      product_id: GameData.id,
      //  ,
    }
    await fetch(`${baseUrl}/game/start`, {
      method: "POST",
      body: JSON.stringify(startBody),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGameStartStatus(true)
        console.log("direction", game.camera_data[0].camera_id);
        console.log(data)
        console.log(startBody,"startBody")
        localStorage.setItem("inGame", true);
        setWait(false);
        setStartGame(data.data[0]);
        setFirstStep(true);
        setGamePlay(true);
        setReloadStatus(true)
        setShowGrayIcon(false)
        localStorage.setItem("reload",true)

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
        playerID: userId,
        command:
          command === "LEFT" ? "LEFT" : command === "RIGHT" ? "RIGHT" : "",
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
        playerID: userId,
        command: command,
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
        playerID: userId,
        command: "P_FW",
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
        playerID: userId,
        command: "FW_STOP",
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit(`${baseMessage}|P_ENDED`);
        socket.emit(`${baseMessage}|G_DISCONNECTED`);
        setSecondStep(false);
        setHideEverything(false)
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
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
      user_id: userId,
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
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
    setReloadStatus(false)
    const checkTime = JSON.parse(localStorage.getItem("timeoutState"))||false
    await fetch(`${baseUrl}/game/leave`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: userId,
        timeout_status: timeout_status,
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        // setReloadStatus(false)
        localStorage.setItem("reload",false)
        // window.removeEventListener("beforeunload", handleTabClosing);
        window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
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
          localStorage.setItem("userJoined",JSON.stringify(false))
          // if(timeoutStatus===true){
            if(checkTime===false){
              window.location.reload();
            }
            localStorage.setItem("timeoutState",JSON.stringify(false))

          // }
        }
      });
  }
  async function addToCart() {
    setPlayAudio(music.Woohoo);
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
        "Content-Type":"application/json",
                    "access-token":`${token}`
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
    const userPointInt = parseInt(user?.point);
    const gamePriceInt = parseInt(GameData?.price);
    console.log(gamePriceInt)
    console.log(userPointInt)
    console.log(userPointInt < gamePriceInt)
    if (userPointInt < gamePriceInt) {
      return setTopup(true);
    }

    await fetch(`${baseUrl}/points/update`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: userId,
        point: GameData.price === "0" ? "0" : GameData.price,
        credicts: "false",
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data)
        if (GameData.price === "0") {
          // setFreePlay(freePlay + 1);
        }
        console.log(user.vip)
        if (
          freePlay >= configuration.FREE_PLAY_LIMIT &&
          GameData.price === "0"&&user.vip===false
          ) {
            // if(user.username === "" || user.username === undefined ){
            //   setFreePlayNotReg(true)
            // }
            // else{
            //   return setFreeLimitPopup(true);
            // }
            return setFreeLimitPopup(true);
          }
          else{
            setCount(count + 1);
            // setPlayAudio(music.CoinDrop);
            console.log(data)
            console.log(freePlay)
            console.log(configuration.FREE_PLAY_LIMIT)
            console.log(GameData.price)
            console.log(user.vip)
            dispatch(updateProfile());
            gameStart();
            console.log(data)
          }
      });
  }
  // console.log(GameData?.price)
  async function freeplayCheck() {
    await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        device_id: "",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function ReportIssue() {
    await fetch(`${baseUrl}/game/issue/report`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineID: game._id,
        productID: GameData.id,
        title: report.Title,
        content: report.Content,
        source: "web",
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  async function ValidateApi() {
    await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineID: game._id,
      }),
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  }
  useEffect(() => {
    const reloadLocal = localStorage.getItem("reload")
    if(reloadLocal===null||reloadLocal===undefined){
      localStorage.setItem("reload",false)
    }
    if(reloadLocal==="true"){

      window.addEventListener('beforeunload', alertUser)
      window.addEventListener('unload', handleTabClosing)
      // window.onbeforeunload = function() {
    

      //     var message = 'Do you want to leave this page?';
      //     return message}
      
      return () => {
          window.removeEventListener('beforeunload', alertUser)
          window.removeEventListener('unload', handleTabClosing)
        //   window.onbeforeunload = function() {

        //     var message = 'Do you want to leave this page?';
        //     return message;
    
        // }
      }
      
      
    }
    if(reloadLocal==="false"){
      window.removeEventListener('beforeunload', alertUser)
      window.removeEventListener('unload', handleTabClosing)
    }
    console.log(reloadLocal)
    console.log(typeof reloadLocal)
})
useEffect(()=>{
  console.log(reloadStatus)
},[reloadStatus])
useEffect(()=>{
  console.log(currentPrizeMove)
},[currentPrizeMove])
useEffect(()=>{
  console.log(prizeId)
},[prizeId])
useEffect(()=>{
  console.log(userId)
},[userId])
useEffect(()=>{
  console.log(prizeDate)
},[prizeDate])
// useEffect(() => {
//   console.log(window)
//   // window.onbeforeunload = setExitPopupOpen(true);
//   // function confirmExit()
//   window.addEventListener('beforeunload',(event)=>{
//     event.preventDefault();
//     event.returnValue = ''

    
//   })

// })
useEffect(()=>{
  console.log(gameStartStatus)
},[gameStartStatus])
useEffect(()=>{
  console.log(animeRef)
},[animeRef])
const handleTabClosing = async(event) => {
    // removePlayerFromGame()
    // console.log("exiting")\
    await gameLeave(userId,false)
    // console.log(closing)
    // if(reloadStatus===true){

    // event.preventDefault();
    // event.returnValue ='';
    // }E
    // setExitPopupOpen(true);

}

const alertUser = (event:any) => {
    // if(reloadStatus===true){

  console.log(event)
  // gameLeave()
 event.preventDefault()
    // }
 
 event.returnValue = ''
  // alert("helo")
}
useEffect(()=>{
  if(que==="0"){
    setWait(true)
  }
},[que])
useEffect(()=>{
  console.log(userId)
  console.log(prizeId)
},[prizeId,currentPrizeMove])
useEffect(()=>{
  if(active===true&&gameStartStatus===false&&userJoined===false&&window.location.pathname.split("/")[1]==="game"===true){
    // setLeavePopup(true)
    console.log("yaah got it")
  }
  console.log(active===true&&gameStartStatus===false&&userJoined===false&&window.location.pathname.split("/")[1]==="game","yes it true or false")
  console.log(active===true)
  console.log(gameStartStatus===false)
  console.log(userJoined)
  console.log(window.location.pathname.split("/")[1]==="game","yes it true or false")
   
})
useEffect(()=>{
  console.log(leavePopup)
  console.log(active)
},[leavePopup,active])
useEffect(()=>{
  console.log(userJoined)
  console.log(gameStartStatus)
},[userJoined,gameStartStatus])

// useEffect(() => {
// if (reportIssueCategories === true && audioStatus === "1"||reportIssueCategories === true && audioStatus === 1) {
// setPlayAudio(music.Chime);
// }
// }, [reportIssueCategories]);

// useEffect(() => {
//   if (gameSound === 1||gameSound==="1") {
//     audioRef.current.volume = 1;
//   } else {
//     audioRef.current.volume = 0;
//   }
// }, [gameSound]);


// async function setPlayAudio(src) {
//   if (audioStatus===1||audioStatus==="1") {
//     audioRef.current.volume = 1;
//     audioRef.current.src = src;
//     audioRef.current.play();
  
//   } else {
//     audioRef.current.volume = 0;
//   }
// }
  return (
    <div className={style.Container}>
    {playAudio?
      <PlaySound src={playAudio} reportIssueCategories ={reportIssueCategories} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound}/>
    :""}
      <PlayGameAudio gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} />
      {prizeResetActive ? (
        <div className={style.popup}>
        <div className={style.OverlayBg} onClick={()=>{
            // setPrizeResetActive(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Shall we move the prize to an easier position?</p>
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
                // setCurrentPrizeMove(true);
                // setShowUserPopup(true)
                // if(prize)
              }}
            >
              YES
            </button>
            {/* </Link> */}
            {/* <Link
              to="/prizes"
              state={{ category: GameData.category }} */}
              <button
              onClick={() => {
                setTopup(false);
                setPrizeResetActive(false);
                setPlayAgain(true);
                // setCount(c)
                setHideEverything(true)

              }}
            >
              NO
            </button>
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
          <p>Woah there! You haven't got enough tickets</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/tickets"
              onClick={() => {
                gameLeave(userId,false)
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
      {freeLimitPopup && user&&user.username === ""||freeLimitPopup && userId === undefined ||freeLimitPopup&& userId ==="" ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>You've used all of your free plays</p>
          </div>
          <div className={style.popupButton}>
            {/* <Link
              to="/login"
              onClick={() => {
                setFreeLimitPopup(false);
              }}
            > */}
              <button onClick={()=>{
                setFreeLimitPopup(false)
                gameLeave()
                navigate("/login")
                // window.location.reload()
              }}>OK</button>
            {/* </Link> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {reportIssueCategories ? (
        <div className={`${style.popup} ${style.reportPopup}`}>
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
        <div className={`${style.popup} ${style.reportPopup}`}>
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
        <div className={`${style.popup} ${style.reportPopup}`}>
        
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>
              Thanks! We have received your report and, if necessary,will aim to
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

      {freeLimitPopup &&user&&user.vip === false&&user&&user.username!==""? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
          <p>You've used all of your daily free plays</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/prizes"
              onClick={() => {
                setFreeLimitPopup(false);
                gameLeave(userId,false)
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
            {/* <MdClose
              onClick={() => {
                setLastWin(false);
                setOnPlay(false);
              }}
            /> */}
            {game.last_win_url === "" ? (
              <div className={style.VideoEmpty}>
                <p>Whoops! Video unavailable Please try again later.</p>
              </div>
            ) : (
              <div
              ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${game.last_win_url}" type="video/mp4" />
        <source src="${game.last_win_url}" type="video/MPEG-4" />
        <source src="${game.last_win_url}" type="video/avc" />
        </video>`
      }}
    ></div>
             
              
            )}
            {/* <video src=""></video> */}
            {/* light="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" */}
            {/* <video ref ={videoRef}>
                <source src={`${configuration.LAST_WIN_VIDEO}`} type="video/mp4"/>
            </video> */}
            {/* <iframe src={`${game.last_win_url}`} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="1" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100'}} title="Other Things - BNAE - Website Sizzle - V1.mp4" data-ready="true"></iframe> */}
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
      {exitPopupOpen&& gameStartStatus===false? (
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
                gameLeave(userId,false);
                // socket.disconnect();
                
                // window.location.reload();
                navigate("/prizes", {
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
      {kickout?<div className={style.kickoutPopupAll}>
        <div className={style.KickoutOverlay}>

        </div>
        <div className={style.kickoutPopup}>
        <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <p className={style.KickoutMessage}>Whoops! There seems to be an issue with this prize.<br/>Please try again or select another prize </p>
          <div className={style.KickoutBtn}>
            <button onClick={()=>{
                  navigate("/prizes",{state:{category:sendCategory}})
                  window.location.reload()
      // EntryRequest.replay = true;
      // dispatch(gameEntry(EntryRequest));
            }}>OK</button>
          </div>
        </div>
      </div>
      :""}
      {leavePopup &&gameStartStatus===false? (
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
                // socket.disconnect();
                gameLeave(userId,false);
                navigate(`/game/${transferGame.slug}`, {
                  state: { game: transferGame,category:transferGame.category},
                });
                // window.location.reload();
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
      {/* {active===true&&userJoined===false? ( */}
      {active===true&&gameStartStatus===false&&userJoined===true&&window.location.pathname.split("/")[1]==="game"||active===true&&gameStartStatus===false&&userJoined===false&&window.location.pathname.split("/")[1]==="game"? (
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
                console.log(pageUrl)
                // console.log(transferGame);
                setActive(false);
                gameLeave(userId,false);
                // socket.disconnect();
                // navigate(`/game/${transferGame.slug}`, {
                //   state: { game: transferGame,category:transferGame.category},
                // });
                if(pageUrl==="bandai"){
                  window.open("http://www.bandainamco-am.co.uk/")
                }
                else if(pageUrl==="weplay"){
                  window.open("http://www.weplaycreative.com/")
                }
                else{
                  navigate(`/${pageUrl}`)
                }
               
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
      {/* {active===true&&gameStartStatus===false&&userJoined===true? (
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
          > 
            <button
              onClick={() => {
                // console.log(transferGame);
                setActive(false);
                gameLeave(userId,false);
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
      )} */}
      <div className={style.Section}>
        <div className={style.ExtraGames}>
          <div className={style.ExtraButton}>
            <button
              style={{ pointerEvents: gamePlay===true||currentPrizeMove===true&&prizeId===userId ? "none" : "visible" }}
              onClick={() => {
                if (gamePlayStatus === true) {
                  setActive(true);
                  // setPageUrl("prizes",{state:{category:sendCategory}})
                  setPageUrl("prizes",{state:{category:sendCategory}})
                }
                if (gamePlayStatus === false) {
                  setActive(false);
                  // setPageUrl("prizes",{state:{category:sendCategory}})
                  setPageUrl("prizes",{state:{category:sendCategory}})
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
            <p>YOU MIGHT ALSO LIKE...</p>
          </div>
          <div className={style.AllGames}>
            {products.length>0&&products.filter((gameFilter)=>gameFilter.id!==GameData.id).map((gameDetails,index) => {
             
              const randomNumber = Math.random() * (products.length-0) + 0
                  console.log(randomNumber)
              if(index<6){ 
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
                      style={{ pointerEvents: gamePlay===true||currentPrizeMove===true&&prizeId===userId ? "none" : "visible" }}
                      onClick={() => {
                        if((freePlay >= configuration.FREE_PLAY_LIMIT &&
                          gameDetails.price === "0" &&
                          user.vip === false)  || (gameDetails.machine_status === false)){

                          }
                          else{
                            setLeavePopup(true);
                            setTransferGame(gameDetails);
                          }
                       
                      }}

                      // style={{
                      //   pointerEvents: gamePlayStatus ? "none" : "visible",
                      //   cursor: gamePlayStatus ? "not-allowed" : "pointer",
                      // }}
                    >
                      <div className={style.Image}>
                        <img src={gameDetails.featured_image.large} alt="" />
                      </div>
                      <div className={style.GameContent}>
                        <div className={style.GameName}>
                          <p>{gameDetails.title}</p>
                        </div>
                        <div className={style.TicketPrice}>
                          <div
                            className={style.Ticket}
                            onClick={() => {
                              setPopup(true);
                            }}
                          >
                           {(freePlay >= configuration.FREE_PLAY_LIMIT &&
                              gameDetails.price === "0" &&
                              user.vip === false)  || (gameDetails.machine_status === false)? (
                                <img
                                  src={assets.ticketIcon}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(1)" }}
                                />
                              ) : (
                                <img
                                  src={assets.ticketIcon}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(0)" }}
                                />
                              )}
                          </div>

                          <div className={style.Price}>
                            <p>{gameDetails.price === "0" ? "FREE" : gameDetails.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    // </div>
                  );
                }
            })}
          </div>
        </div>
        <div className={style.GameScreen}>
        {howToPlayStatus?
                       <div className={style.howToPlay}>
                        <div className={style.HowToPlayOverlay} onClick={()=>{
                          setHowToPlayStatus(false)
                        }}>

                        </div>
                        <div className={style.HowToPlayPopup}>
                          <Lotties animationData={AllAnimation.howToPlay} loop={false} onComplete={()=>{
                            setHowToPlayStatus(false)
                          }}/>
                        </div>
                       </div>
                       :""}
          {videoGot === false ? (
            <div className={style.videoStarting}>
              {/* <p>Please wait while we get the video for you!</p> */}
              <div className={style.LoaderDivSection}>
                <div className={style.LoaderAnime}>
                  <Lotties animationData={AllAnimation.Loader} />
                </div>
                <p>Please wait whilst we<br/> connect you to your game</p>
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
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId ?
                       <div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
                       
                    {/* {game.price_move_status===true&&prizeId!==userId&&prizeDate!=="RESET"?
                   
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}    */}
                   {prizeDate==="PRIZE_WON"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
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
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId ?
                       <div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
                       
                    {/* {game.price_move_status===true&&prizeId!==userId&&prizeDate!=="RESET"?
                   
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}    */}
                   {prizeDate==="PRIZE_WON"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
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
               {/*  {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId ?<div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
                        
                        {/* {game.prize_reset_status===true&&prizeResetStatus!=="RESET"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}
                     */}
                    {currentPrizeMove===true&&prizeId===userId?
                      <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId ?
                       <div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
                       
                    {/* {game.price_move_status===true&&prizeId!==userId&&prizeDate!=="RESET"?
                   
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}    */}
                   {prizeDate==="PRIZE_WON"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
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
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId ?
                       <div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
{/*                        
                    {game.price_move_status===true&&prizeId!==userId&&prizeDate!=="RESET"?
                   
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}    */}
                   {prizeDate==="PRIZE_WON"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
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
                            onComplete={() => {

                            }}
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
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMove} alt="" />
                      </div>
                      
                       :currentPrizeMove===true&&prizeId!==userId&&prizeDate!=="RESET" ?
                       <div className={style.PrizeMove}>
                       <div className={style.PrizeMoveOverlay}></div>
                     <img src={prizeMoveUser} alt="" />
                   </div>:""} 
{/*                        
                    {game.price_move_status===true&&prizeId!==userId&&prizeDate!=="RESET"?
                   
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
                        <img src={prizeMoveUser} alt="" />
                      </div>
                       :""}    */}
                   {prizeDate==="PRIZE_WON"&&prizeId!==userId?
                        <div className={style.PrizeMove}>
                          <div className={style.PrizeMoveOverlay}></div>
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
              {howToPlayStatus===false?
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
                  <button
                          onClick={() => {
                            // setPlayAudio(music.Chime);

                            setPrizeResetActive(true);
                            setPlayAgain(false);
                            setPrizeMoveIcon(true)
                            setShowGrayPrizeIcon(true)
                            setShowGrayIcon(true)
                            // prizeReset()
                          }}
                        >
                          <img src={assets.greenPrizeMove} alt="" />
                        </button>
                    {/* {count %  === 0 &&/ */}
                    {count % parseInt(configuration.GamePlayCount) === 0 &&
                    playAgain &&
                    count != 0 ? 
                      hideEverything===false? 
                        <button
                          onClick={() => {
                            setPrizeResetActive(true);
                            setPlayAgain(false);
                            setPrizeMoveIcon(true)
                            setShowGrayPrizeIcon(true)
                            setShowGrayIcon(true)
                            
                          }}
                        >
                          <img src={assets.greenPrizeMove} alt="" />
                        </button>
                      // :""
                     : 
                      showGrayIcon===true ?
                        <button>
                          <img src={assets.GrayPrizeMove} alt="" />
                        </button>
                      :""
                      : showGrayIcon===true ?
                      <button>
                        <img src={assets.GrayPrizeMove} alt="" />
                      </button>
                    :""
                    }
                   
                  </div>
                </div>
                {/* <span>{GameData&&GameData.price}</span> */}
                <div className={style.Center}>
                  <div className={style.PlayImage}>
                      {GameData&&GameData.price==="0"?""
                      :
                    <div className={style.GameScore}>
                      <img src={assets.GamePricePng} alt="" />
                      <span>{GameData&&GameData.price}</span>
                      
                    </div>
                      }
                    <div className={style.BgStaticImaage}>
                      <img src={waitStatic} alt="" />
                    </div>
                    {gamePlayStatus ? (
                      que === "0" ? (
                        wait === true ? (
                          <button>
                            <Lotties
                              animationData={AllAnimation.waitPulse}
                              loop={false}
                              // localStorage.setItem("reload",false)
                              onComplete={() => {
                                setReloadStatus(true)
                                PointDebit();
                              }}
                              onClick={()=>{
                                setReloadStatus(true)
                                PointDebit();
                              }}
                               
                            />
                          </button>
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
                                    isPaused={state}
                                    onComplete={() => {
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                     
                                    lottieRef={animeRef}
                                     
                                  />
                                   <button onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState1(true);
                                          animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                          animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                  /> */}
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
                                    isPaused={Animestate}
                                    onComplete={() => {
                                      Animestate = JSON.parse(localStorage.getItem("state"))
                                      console.log(Animestate)
                                      // if(animeStopStatus===false){
                                        // if(animeStopStatus===false){
                                      // }
                                      if(Animestate===false){
                                          console.log("finished")
                                        timeOut(userId, false);
                                          setFirstStep(false);
                                          setSecondStep(false);
                                          setTimeoutStatus(true);
                                      }
                                      else{
                                          console.log("exited")
                                      }
                                      // }
                                      
                                    }}
                                     
                                    lottieRef={animeRef}
                                     
                                  />
                                  <button  onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState2(true);
                                      localStorage.setItem("state",JSON.stringify(true))
                                      animeRef.current.pause()

                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      localStorage.setItem("state",JSON.stringify(false))

                                      setCameraState2(false);

                                      
                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState2(true);
                                      localStorage.setItem("state",JSON.stringify(true))
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      localStorage.setItem("state",JSON.stringify(false))
                                      setCameraState2(false);

                                    }}>
                                  <Lotties
                                    animationData={cameraState2?AllAnimation.rightPressedStatic:AllAnimation.rightStatic}
                                    loop={false}
                                     
                                  />
                                  </button>
                                  {/* its here */}
                                  {/* <img
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
                                      localStorage.setItem("state",JSON.stringify(true))
                                      animeRef.current.pause()

                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      localStorage.setItem("state",JSON.stringify(false))

                                      setCameraState2(false);

                                      
                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      console.log(animeRef);
                                      setCameraState2(true);
                                      localStorage.setItem("state",JSON.stringify(true))
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      localStorage.setItem("state",JSON.stringify(false))
                                      setCameraState2(false);

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                  />
                                  <button onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log(animeRef.current);
                                      console.log("clicked");
                                      setCameraState2(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      // animeRef.current.play()
                                      setCameraState2(false);
                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log(animeRef.current);
                                      console.log("clicked");
                                      setCameraState2(true);
                                          animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState2(false);
                                      // animeRef.current.play()

                                    }}>
                                  <Lotties
                                    animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                    loop={false}
                                     
                                  />
                                  </button>
                                  {/* <img
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
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      // animeRef.current.play()
                                      setCameraState2(false);
                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log(animeRef.current);
                                      console.log("clicked");
                                      setCameraState2(true);
                                          animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState2(false);
                                      // animeRef.current.play()

                                    }} 
                                  />*/}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                    // isPaused={animeRef}
                                  />
                                  <button onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      // console.log(cameraState1)
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                      // console.log(animeRef.current)
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                      // console.log(cameraState1)
                                      setCameraState1(true);
                                      // console.log(animeRef.current)
                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}>
                                  <Lotties
                                    animationData={cameraState2?AllAnimation.leftPressedStatic:AllAnimation.leftStatic}
                                    loop={false}
                                     
                                  />
                                  </button>
                                  {/* <img
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
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                      // console.log(animeRef.current)
                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                      // console.log(cameraState1)
                                      setCameraState1(true);
                                      // console.log(animeRef.current)
                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log(animeRef.current);
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                  /> */}
                                </div>
                              </div>
                            ) : (
                            <img src={waitStatic} alt="" />
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                  />
                                  <button onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}>
                                    <Lotties
                                    animationData={cameraState2?AllAnimation.rightPressedStatic:AllAnimation.rightStatic}
                                    loop={false}
                                     
                                  />
                                  </button>
                                  {/* <img
                                    src={
                                      cameraState1
                                        ? assets.RightArrowPressed
                                        : assets.RightArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }} 
                                  />*/}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                  />
                                  <button onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState2(false);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState2(false)
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)
                                      ;
                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}> 
                                  <Lotties
                                    animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                    loop={false}
                                     
                                  />
                                  </button>
                                  {/* <img
                                    src={
                                      cameraState2
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onMouseDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState2(false);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("RIGHT");
                                      setCameraState2(false)
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)
                                      ;
                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("RL_STOP");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                    // onPointerDown={()=>{

                                    // }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                  />

                                  <button onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      console.log("hello its Here");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      console.log("hello its Here");

                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("hello its Here");

                                      console.log("clicked");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("hello its Here");

                                      console.log("released");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState1?AllAnimation.leftPressedStatic:AllAnimation.leftStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState1(true);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState1(false);
                                      // animeRef.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setFirstStep(false);
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef}
                                     
                                  />
                                   <button onMouseDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState2(false);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState2(false);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                    onPointerDown={() => {
                                      FirstArrowPress("LEFT");
                                      console.log("clicked");
                                      setCameraState2(false);
                                          // animeRef.current.pause()
                                      animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      FirstArrowRelease("LR_STOP");
                                      console.log("released");
                                      setCameraState2(true);
                                      // animeRef.current.play()

                                    }}
                                  /> */}
                                </div>
                              </div>
                            ) : (
                             <img src={waitStatic} alt="" />
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                     
                                  />

                                  <button onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.leftPressedStatic:AllAnimation.leftStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                     
                                  />

                                  <button  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                      
                                  />

                                  <button onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.rightPressedStatic:AllAnimation.rightStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                     
                                  />

                                  <button  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()

                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()

                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                     
                                  />

                                  <button  onMouseDown={() => {
                                      //  <img src={cameraState1?assets.UpArrowPressed:assets.UpArrow} alt=""  onMouseDown={() => {
                                      console.log("second arrow left true");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                      console.log(cameraState2);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      setCameraState2(false);
                                      console.log(cameraState2);
                                      // animeRef2.current.play()


                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      console.log("second arrow left false");
                                    }}
                                    onPointerDown={() => {
                                      //  <img src={cameraState1?assets.UpArrowPressed:assets.UpArrow} alt=""  onMouseDown={() => {
                                      console.log("second arrow left true");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                      console.log(cameraState2);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      setCameraState2(false);
                                      console.log(cameraState2);
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      console.log("second arrow left false");
                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      setCameraState2(false);
                                      console.log(cameraState2);
                                      // animeRef2.current.play()


                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      console.log("second arrow left false");
                                    }}
                                    onPointerDown={() => {
                                      //  <img src={cameraState1?assets.UpArrowPressed:assets.UpArrow} alt=""  onMouseDown={() => {
                                      console.log("second arrow left true");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                      console.log(cameraState2);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      setCameraState2(false);
                                      console.log(cameraState2);
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      console.log("second arrow left false");
                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                     
                                  />

                                  <button onMouseDown={() => {
                                      //  <img src={cameraState2?assets.LeftArrowPressed:assets.LeftArrow} alt=""  onMouseDown={() => {
                                      //  <img src={assets.LeftArrowPressed} alt=""  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      console.log(
                                        "second release arrow left false"
                                      );
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                    onPointerDown={() => {
                                      //  <img src={cameraState2?assets.LeftArrowPressed:assets.LeftArrow} alt=""  onMouseDown={() => {
                                      //  <img src={assets.LeftArrowPressed} alt=""  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      console.log(
                                        "second release arrow left false"
                                      );
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                    onDragStart={preventDragHandler}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.leftPressedStatic:AllAnimation.leftStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                      setCameraState1(true);
                                    }}
                                    onMouseUp={() => {
                                      console.log(
                                        "second release arrow left false"
                                      );
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                    onPointerDown={() => {
                                      //  <img src={cameraState2?assets.LeftArrowPressed:assets.LeftArrow} alt=""  onMouseDown={() => {
                                      //  <img src={assets.LeftArrowPressed} alt=""  onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      console.log(
                                        "second release arrow left false"
                                      );
                                      // animeRef2.current.play()

                                      SecondArrowRelease();
                                      setCameraState1(false);
                                    }}
                                    onDragStart={preventDragHandler}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                    }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    // playSpeed={0}
                                    lottieRef={animeRef2}
                                     
                                  />
                                   <button  onPointerDown={()=>{
                                      console.log("clicked")
                                    }}
                                    onPointerUp={()=>{
                                      console.log("Closed")
                                    }}
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.upPressedStatic:AllAnimation.upStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
                                    src={
                                      cameraState1
                                        ? assets.UpArrowPressed
                                        : assets.UpArrow
                                    }
                                    alt=""
                                    onPointerDown={()=>{
                                      console.log("clicked")
                                    }}
                                    onPointerUp={()=>{
                                      console.log("Closed")
                                    }}
                                    onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState1(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState1(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                      if(animeStopStatus===false){
                                        timeOut(userId, false);
                                      }
                                      setSecondStep(false);
                                      setTimeoutStatus(true);
                                    }}
                                    lottieRef={animeRef2}
                                  
                                  />
                                   <button onMouseDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      // console.log(animeRef)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                          // // animeRef.current.pause()
                                        //  setAnimeStopStatus(false)
                                        //   animeRef.current.pause()
                                          setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                          
                                      // animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}> 
                                    <Lotties
                                      animationData={cameraState2?AllAnimation.rightPressedStatic:AllAnimation.rightStatic}
                                      loop={false}
                                        
                                    />
                                    </button>
                                  {/* <img
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
                                     setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                      console.log(animeRef2.current.setSpeed)
                                      // console.log(animeRef)
                                      console.log(animeRef2)

                                    }}
                                    onMouseUp={() => {
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                    onPointerDown={() => {
                                      console.log("second arrow left false");
                                      SecondArrowPress();
                                      setCameraState2(true);
                                          // // animeRef.current.pause()
                                        //  setAnimeStopStatus(false)
                                        //   animeRef.current.pause()
                                          setAnimeStopStatus(false)
                                          animeRef.current.pause()
                                          
                                      // animeRef.current.pause()
                                      console.log(animeRef.current.setSpeed)
                                      console.log(animeRef2.current.setSpeed)
                                      console.log(animeRef2)

                                    }}
                                   onPointerUp={(e) => {
                                      console.log(e,"its touchend")
                                      SecondArrowRelease();
                                      setCameraState2(false);
                                      // animeRef2.current.play()

                                    }}
                                  /> */}
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
                                  // setActive(false)
                                  setGamePlay(false);
                                  setGamePlayStatus(false);
                                  setGameStartStatus(false)
                                  // setUserJoined(false)
                                if(prizeDate==="PRIZE_WON"){
                                  console.log(prizeCount)
                                  console.log(prizeDate)
                                  setPlayAudio(music.Woohoo)
                                     addToCart();
                                    gameLeave();
                                    // socket.disconnect();
                                    setGamePlayStatus(false);
                                    // setGamePlay(false);
                                    setPlayAgain(false);
                                    setReloadStatus(false)
                                    navigate("/win-screen",{state:{game:GameData}});

                                }
                                else{
                                  setPlayAudio(music.Whoops);

                            // setReloadStatus(false)

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
                            animationData={AllAnimation.ReverseWait}
                            loop={false}
                          />
                        </button>
                      )
                    ) : playAgain ? (
                      <button
                        onClick={() => {
                          setWait(true);
                          setGamePlayStatus(true);
                        
                          setHideEverything(false)
                          // setReloadStatus(false)
                          setReloadStatus(true)
                          // setGamePlay(true);
                          setPlayAgain(false);
                          console.log(GameData.machine_code)
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
                            setPlayAudio(music.Woohoo);
                          }}
                          
                          onComplete={() => {
                            setReloadStatus(false)
                            localStorage.setItem("reload",false)
                            gameLeave(userId, false);
                            setGamePlay(false);
                            setPlayAgain(false);
                            navigate("/prizes",{state:{category:sendCategory}})

                          }}
                        />
                      </button>
                    ) : (
                      <button 
                      style={{
                      // pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||currentPrizeMove===true&&prizeId!==userId||prizeDate==="PRIZE_WON"&&prizeId!==userId? "none" : "visible",

                        // pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||game.prize_reset_status===true&&prizeResetStatus!=="RESET"&&prizeId!==userId||game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId ? "none" : "visible",
                        // pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||game.prize_reset_status===true&&prizeResetStatus!=="RESET"&&prizeId!==userId||game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId ? "none" : "visible",
                      }}
                        onClick={(e) => {
                          if(gameJoinCount<1){
                          gameJoin(e);
                          }
                          setGameJoinCount(gameJoinCount+1)
                        }}
                      >
                        <img src={assets.PlayImage} alt="" />
                      </button>
                    )}
                  </div>
                  <div
                    className={style.Report}
                    style={{
                     
                      pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||game.prize_reset_status===true&&prizeDate!=="PRIZE_WON"&&prizeId!==userId||game.price_move_status===true&&prizeId!==userId? "none" : "visible",
                    }}
                  >
                    <button
                      onClick={() => {
                        console.log("music clicked")
                        setPlayAudio(music.Chime);
                        setReportIssueCategories(true);
                      }}
                    >
                      <img src={assets.reportImage} alt="" />
                    </button>
                  </div>
                </div>
                <div
                  className={style.Right}
                  style={{                       pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||game.prize_reset_status===true&&prizeDate!=="PRIZE_WON"&&prizeId!==userId||game.price_move_status===true&&prizeId!==userId? "none" : "visible",
                }}
                  // style={{ pointerEvents: gamePlayStatus||currentPrizeMove===true&&prizeId===userId||game.prize_reset_status===true&&prizeResetStatus!=="RESET"&&prizeId!==userId||game.price_move_status===true&&prizeId!==userId||currentPrizeMove===true&&prizeId!==userId? "none" : "visible" }}
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
                    <button onClick={()=>{
                      setHowToPlayStatus(true)
                    }}>
                      <img src={assets.Guide} alt="" />
                    </button>
                  </div>
                </div>
              </div>
              :<div className={style.Controls}></div>}
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
