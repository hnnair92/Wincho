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
        window.location.reload()
      }
    },5000)
  })
  let inGame = localStorage.getItem("inGame");
  console.log(inGame);
  
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
