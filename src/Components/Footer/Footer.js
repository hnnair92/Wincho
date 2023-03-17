import React from 'react'
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
// import {} from 'react-icons/ai'
const Footer = () => {
    const navigate = useNavigate();
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
  return (
    <div className={style.Container}>
        <div className={style.Footer}>
            <div className={style.Logo}>
                <img src={Logo} alt="" />
            </div>
            <div className={style.FooterDetails}>
            <div className={style.Menu}>
                <ul>
                <p className={style.Title}>LINKS</p>
                    <li onClick={(e)=>{
                        handleId(e,"home")
                    }}>Home</li>
                    <li onClick={(e)=>{
                        handleId(e,"about")
                    }}>About</li>
                    <li onClick={(e)=>{
                        handleId(e,"watch")
                    }}>Watch</li>
                    <Link to="/tickets"><li>Store</li></Link>
                    
                    <li onClick={(e)=>{
                        handleId(e,"support")
                    }}>Support</li>
                </ul>
            </div>
            <div className={style.Address}>
                <p className={style.Title}>YOOHOO-- <br/>FOLLOW US</p>
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
                    <p>Wincha</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                    <p>Privacy Policy</p>
                    <p>Terms and Conditions</p>
                </div>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Footer