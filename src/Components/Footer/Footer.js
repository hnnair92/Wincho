import React, { useState } from 'react'
import style from './Footer.module.css'
import Logo from '../../assests/Wincha Bird Footer.png'
import {FaFacebook} from 'react-icons/fa'
import {AiFillTwitterCircle,AiOutlineInstagram} from 'react-icons/ai'
import facebook from '../../assests/Facebook Icon.png'
import instagram from '../../assests/Instagram Icon.png'
import twitter from '../../assests/Twitter Icon.png'
import tiktok from '../../assests/TikTok Icon.png'
import youtube from '../../assests/YouTube Icon.png'
import { Link, useNavigate } from 'react-router-dom'
import bandaiLogo from '../../assests/Bandai Namco Logo.png'
import { useSelector } from 'react-redux'
import playBtn from '../../assests/Asset 602-300ppi.png'
// import { Link, useNavigate } from 'react-router-dom';
import imageDiv from '../../assests/TEXTOff Tickets.png'
// import {bgImage} from './BgImage.js'
import { assets } from '../Description/assests'
// import { AboutBg } from './AboutImage';
import videoSrc from '../../assests/video/wincha.mp4';
import winchaIcons from '../../assests/Wincha HomePage Logo.png';
// import {} from 'react-icons/ai'
const Footer = ({gamePlay,setGamePlay}) => {
    const navigate = useNavigate();
    const [isAddress, setIsAddress] = useState(false);
    const {configuration} = useSelector((state)=>state.configuration)
    const handleId = (e,title) => {
        e.preventDefault();
        const path = window.location.pathname;
        if (path === "/") {
          window.location.href = `#${title}`;
        } else {
          navigate("/");
          setTimeout(() => {
            window.location.href = `#${title}`;
          }, 100);
        }
      };
      console.log(window.location)
  return (
    <div className={style.Container} style={{pointerEvents:gamePlay?"none":"visible"}}>
      {isAddress? (
        <div className={style.popup}>
        <div className={style.Overlay} onClick={()=>{
            setIsAddress(false)
        }}>

        </div>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {/* <p>{vipData.vip_discription}</p> */}
            <form action="">
                <input type="text" placeholder='Name'/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Phone Number"/>
                <textarea name="" id="" cols="30" rows="10"  placeholder="Message"></textarea>
            </form>
            {/* <p>fhf</p> */}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                // setisAddressField(true);
                // setIsAddressShown(true);
                // setIsAddress(false);
                setIsAddress(false)
                //  setCount
              }}
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
        <div className={style.Footer}>
            <div className={style.Logo}>
                <img src={Logo} alt="" />
            </div>
            <div className={style.FooterDetails}>
            <div className={style.Menu}>
                <ul>
                <p className={style.Title}>LINKS</p>
                    <li onClick={(e)=>{
                        // handleId(e,"home")
                        navigate("/")
                    }}>Home</li>
                    <li onClick={(e)=>{
                        // handleId(e,"about")
                        navigate("/prizes")
                    }}>Prizes</li>
                    <li onClick={(e)=>{
                        if(window.location.pathname!=="/"){
                        setIsAddress(true)
                        }
                        else{
                        handleId(e,"support")

                        }
                    }}>Support</li>
                    {/* <Link to="/tickets"><li>Store</li></Link> */}
                    
                    <li onClick={(e)=>{
                        // handleId(e,"support")
                        navigate("/cart")

                    }}>Basket</li>
                </ul>
            </div>
            <div className={style.Address}>
                <p className={style.Title}>YOOHOO-- <br/>FOLLOW US</p>
                <div className={style.SocialMedia}>
                    {/* <FaFacebook/>
                    <AiOutlineInstagram/>
                    <AiFillTwitterCircle/> */}
                    <img src={facebook} alt="" onClick={()=>{
                        window.open("https://www.facebook.com/WinchaOnline/")
                    }}/>
                    <img src={twitter} alt=""  onClick={()=>{
                        window.open("https://twitter.com/winchaonline")
                    }}/>
                    <img src={instagram} alt=""  onClick={()=>{
                        window.open("https://www.instagram.com/winchaonline/")
                    }}/>
                    <img src={tiktok} alt=""  onClick={()=>{
                        window.open("https://www.tiktok.com/@winchaonline")
                    }}/>
                    <img src={youtube} alt=""  onClick={()=>{
                        window.open("https://youtube.com/@bandainamcoae")
                    }}/>

                </div>
                <div className={style.Copyright}>
                    <p>Wincha&reg;</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                <div className={style.TermsAndPrivacyText}>
                    <Link to={`${configuration.privacy}`} target="_blank">Privacy Policy</Link>
                    <Link to={`${configuration.terms}`} target="_blank">Terms and Conditions</Link>
                </div>
                <div className={style.bandaiLogo}>
                    <img src={bandaiLogo} alt="" />
                </div>
                </div>
            </div>
            </div>
            
        </div>
        <div className={style.MFooter}>
        <div className={style.Address}>
                {/* <p className={style.Title}>YOOHOO-- <br/>FOLLOW US</p> */}
                <div className={style.SocialMedia}>
                    {/* <FaFacebook/>
                    <AiOutlineInstagram/>
                    <AiFillTwitterCircle/> */}
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={instagram} alt="" />
                    <img src={tiktok} alt="" />
                    <img src={youtube} alt="" />

                </div>
                <div className={style.Copyright}>
                    <p>Wincha&reg;</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                <div className={style.TermsAndPrivacyText}>
                    <Link to={`${configuration.privacy}`} target="_blank">Privacy Policy</Link>
                    <Link to={`${configuration.terms}`} target="_blank">Terms and Conditions</Link>
                </div>
                <div className={style.MbandaiLogo}>
                    <img src={bandaiLogo} alt="" />
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer