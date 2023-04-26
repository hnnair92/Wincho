import React, { useEffect, useState } from "react";
import style from "./winScreen.module.css";
import winBg from "../../assests/Winner BG.png";
import { useLocation, useNavigate } from "react-router-dom";
import winImage from '../../assests/44A Try Playing for Real TEXT.png'
import { useDispatch } from "react-redux";
import { cartAction } from "../../actions/user";
const WinScreen = () => {
  const location = useLocation();
  const state = location.state;
  const data = state?.game;
  const navigate = useNavigate()
  console.log(data);
  const [linkStatus,setLinkStatus] = useState(false)
  console.log(data.category)
  useEffect(()=>{
    setTimeout(()=>{
      if(linkStatus===false){
        navigate("/prizes",{state:{category:data.category}})
      }
    },5000)
  })
  return (
    <div>
      <div className={style.Banner}>
        <div className={style.Background} onClick={()=>{
          setLinkStatus(true)
          navigate("/prizes",{state:{category:data.category}})

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
