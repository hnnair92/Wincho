import React, { useEffect, useRef, useState } from "react";
import style from "./Games.module.css";
import Ticket from "../../assests/golden-ticket.png";
import info from "../../assests/info.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { configutation, getAllGames, getProductByCollection } from "../../actions/product";
import Loader from "../Loader/Loader";
import labelNew from "../../assests/New Banner.png";
import closeIcon from "../../assests/Search X.png";
import searchIcon from "../../assests/Search Icon.png";
import eye from "../../assests/Password Eye.png";
// import info from "../../assests/Information Icon.png";
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png"
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png"
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png"
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png"
import CloseImage from "../../assests/Artboard 48 X.png"
import Lower from "../../assests/Artboard 48 - Lower Image Split.png"
import Upper from "../../assests/Artboard 48 - Upper Image Split.png"
import {assets} from '../Description/assests'
import Lottie from 'lottie-react'
import { AllAnimation } from "../../Animation/allAnimation";
import { baseUrl } from "../url";
import { music } from "../../assests/Musics/allMusic";
import { updateProfile } from "../../actions/user";

const Games = ({ gameMusic,
  setGameMusic,
  gameSound,
  setGameSound,}) => {
 
  const audioRef = useRef(null);
  const audioRefHome = useRef(null);  
  let audioStatus = localStorage.getItem("sound");
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(false))
  );



  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
  
    console.log(audioRefHome.current.play(), "from its function");
   
    audioRefHome.current.src = music.Menu;
    audioRefHome.current.play();
    console.log(audioRefHome.current.volume, "from its function");
  }
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
    if (gameMusic === "true" || gameMusic === true) {
      console.log(audioRefHome.current.volume);
      audioRefHome.current.volume = 1;
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
      audioRefHome.current.volume = 1;
      audioRefHome.current.src = src;
      audioRefHome.current.play();
    } else {
      audioRefHome.current.volume = 0;
      // audioRefHome.current.mute()
    }
  }