/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import style from "./Header.module.css";
import logo from "../../assests/Wincha Icon.png";
import { FiMenu } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import ticket from "../../assests/Floating Tab Gold Ticket.png";
import plus from "../../assests/Header Add Value.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { assets } from "../Description/assests";
import {
  cartAction,
  notificationAction,
  updateProfile,
} from "../../actions/user";
import bandaiLogo from "../../assests/Bandai Namco Logo.png";
import { MainMenu, settingsMenu } from "./Menu";
import { music } from "../../assests/Musics/allMusic";
// import { useSelector } from 'react-redux'
const Header = ({ userJoined,pageUrl,setPageUrl,gameMusic, setGameMusic, gameSound, setGameSound,setActive, active, setGamePlay, gamePlay }) => {
 
  let inGame = localStorage.getItem("inGame");
  console.log(inGame);
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
    //   playAudioBg();
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

