import React, { useEffect } from "react";
import style from "./winScreen.module.css";
import winBg from "../../assests/Winner BG.png";
import { useLocation } from "react-router-dom";
import winImage from '../../assests/44A Try Playing for Real TEXT.png'
import { useDispatch } from "react-redux";
import { cartAction } from "../../actions/user";
const WinScreen = () => {
  const location = useLocation();
  const state = location.state;
  const data = state?.game;
  console.log(data);

  return (
    <div>
      <div className={style.Banner}>
        <div className={style.Background}>
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
