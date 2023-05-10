import React, { useEffect, useRef, useState } from "react";
import style from "./winScreen.module.css";
import winBg from "../../assests/Winner BG.png";
import { useLocation, useNavigate } from "react-router-dom";
import winImage from '../../assests/44A Try Playing for Real TEXT.png'
import { useDispatch } from "react-redux";
import { cartAction } from "../../actions/user";
import { music } from "../../assests/Musics/allMusic";
const WinScreen = ({pageUrl,setPageUrl,gameMusic, setGameMusic, gameSound, setGameSound}) => {
  const location = useLocation();
  const state = location.state;
  const data = state?.game;
  const navigate = useNavigate()
  console.log(data);
  console.log(window)
  const [linkStatus,setLinkStatus] = useState(false)
  console.log(data.category)
  useEffect(()=>{
    setTimeout(()=>{
      if(linkStatus===false){
        navigate("/prizes",{state:{category:data.category}})
      }
    },5000)
  })
  let inGame = localStorage.getItem("inGame");
  console.log(inGame);
  const audioRef = useRef();
  const audioRefHome = useRef();  
  let audioStatus = localStorage.getItem("sound");
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(false))
  );



  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
  
    // console.log(audioRefHome.current.play(), "from its function");
   
    audioRefHome.current.src = music.Menu;
    audioRefHome.current.play();
    // console.log(audioRefHome.current.volume, "from its function");
  }
  // useEffect(() => {
  //   console.log(gameSound === "true", "gameSound");
  //   console.log(typeof gameSound, "gameMusic");
  //   if (gameSound === "true" || gameSound === true) {
  //     console.log(audioRef.current.volume);
  //     audioRef.current.volume = 1;
  //     console.log("true for gameMusic");
  //     console.log(audioRef.current.volume);
  //   } else {
  //     audioRef.current.volume = 0;
  //     console.log(typeof gameMusic);
  //     console.log("not reached");
  //   }
  //   console.log(typeof setGameSound);
  // }, [gameSound]);

  useEffect(() => {
    if (gameMusic === "true" || gameMusic === true) {
      // console.log(audioRefHome.current.volume);
      // audioRefHome.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    if (gameSound === "true" || gameSound === true) {
      // console.log(audioRef.current.volume);
      // audioRef.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
    // console.log()
  }, []);
  
  useEffect(() => {
    console.log(gameMusic === "true", "gameSound");
    console.log(typeof gameMusic, "gameMusic");
    if (gameMusic === "true" || gameMusic === true) {
      // console.log(audioRefHome.current.volume);
      // audioRefHome.current.volume = 1;
      console.log("true for gameMusic");
      // console.log(audioRefHome.current.volume);
    //   playAudioBg();
    } else {
      // audioRefHome.current.volume = 0;
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
  }, [gameMusic]);
  useEffect(() => {
    if (gameMusic === "true" || gameMusic === true) {
      // console.log(audioRefHome.current.volume);
      // audioRefHome.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
   
    console.log(typeof gameMusic);
    // console.log()
  }, []);
async function playAudio(src) {
    console.log(audioStatus, "audioStatus");
    if (audioStatus === "true") {
      console.log("reached here");
      audioRef.current.volume = 1;
      audioRef.current.src = src;
      audioRef.current.play();
    } else {
      audioRef.current.volume = 0;
    }
  }

  async function audioEnded(src) {
    if (musicStatus === "true") {
      // audioRefHome.current.unmute()
      // audioRefHome.current.volume = 1;
      // audioRefHome.current.src = src;
      // audioRefHome.current.play();
    } else {
      // audioRefHome.current.volume = 0;
      // audioRefHome.current.mute()
    }
  }

  return (
    <div>
      <div className={style.Banner}>
        <div className={style.Background} onClick={()=>{
          setLinkStatus(true)
          navigate("/prizes",{state:{category:data.category}})
          window.location.reload()

        }}>
          <img src={winBg} alt="" />
        </div>
        {data&&data.price==="0"?
        
        <div className={style.FreeWinGame}>
          <img src={winImage} alt="" />
        </div>
      :
        <div className={style.WinGame}>
            <img src={data?.featured_image?.large} alt="" />
        </div>
        }
      
      </div>
    </div>
  );
};

export default WinScreen;
