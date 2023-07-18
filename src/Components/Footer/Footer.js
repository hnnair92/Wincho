import React, { useEffect, useState } from 'react'
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
import wpclogo from '../../assests/WPC logo WBA.png'
import { useSelector } from 'react-redux'
import playBtn from '../../assests/Asset 602-300ppi.png'
// import { Link, useNavigate } from 'react-router-dom';
import imageDiv from "../../assests/TEXTOff Tickets.png";
// import {bgImage} from './BgImage.js'
import { assets } from "../Description/assests";
// import { AboutBg } from './AboutImage';
import videoSrc from "../../assests/video/wincha.mp4";
import winchaIcons from "../../assests/Wincha HomePage Logo.png";
import { baseUrl } from "../url";
// import {} from 'react-icons/ai'
const Footer = ({
  userJoined,
  pageUrl,
  setPageUrl,
  gameMusic,
  setGameMusic,
  gameSound,
  setGameSound,
  setActive,
  active,
  setGamePlay,
  gamePlay,
}) => {
  const navigate = useNavigate();
  const [isAddress, setIsAddress] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const { configuration } = useSelector((state) => state.configuration);
  const handleId = (e, title) => {
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
  let pathname;
  console.log(window.location);
  const path = window.location.pathname;
  const splitPath = path.split("/");
  useEffect(() => {
    // if(window){
    console.log(
      gamePlay === false && userJoined === false && splitPath[1] !== "game"
    );
    pathname = splitPath[1];
    console.log(path);
    console.log(splitPath[1]);
    console.log(pathname);
    // }
  }, [window]);
  useEffect(() => {
    // if(active===true){
    //   setActive(false)
    // }
  }, [active]);
  useEffect(() => {
    console.log(gamePlay);
  }, [gamePlay]);
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  useEffect(() => {
    console.log(userJoined);
  }, [userJoined]);


  async function SupportTicket(e) {
   
    await fetch(`${baseUrl}/user/account/details`, {
     method: "POST",
     body: JSON.stringify({
       username: name,
       phone_number: PhoneNumber,
       email: email,
       message: message,
     }),
     headers: {
       "Content-Type": "application/json",
     },
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
     });
 }


  return (
    <div
      className={style.Container}
      style={{ pointerEvents: gamePlay ? "none" : "visible" }}
    >
      {isAddress ? (
        <div className={style.popup}>
          <div
            className={style.Overlay}
            onClick={() => {
              setIsAddress(false);
            }}
          ></div>
          <div className={style.popupSection}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              {/* <p>{vipData.vip_discription}</p> */}
              <form action="">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </form>
              {/* <p>fhf</p> */}
            </div>
            <div className={style.ReportPopupButton}>
              <button
                onClick={() => {
                  // setisAddressField(true);
                  // setIsAddressShown(true);
                  // setIsAddress(false);
                  setIsAddress(false);
                  //  setCount
                  SupportTicket();
                }}
              >
                SEND
              </button>
            </div>
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
                        setPageUrl("")
                        {

                          if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                              setPageUrl("")
                            // if(gamePlay===true){
                              if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                          if(gamePlay===false&&userJoined===false&&splitPath[1]!=="game"){
                            navigate("/");
                            console.log("reached")
                          }
                        }
                    }}>Home</li>
                    <li onClick={(e)=>{
                        // handleId(e,"about")
                        // navigate("/prizes")
                        setPageUrl("prizes")
                        {

                          if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                              setPageUrl("prizes")
                            // if(gamePlay===true){
                              if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                          if(gamePlay===false&&userJoined===false&&splitPath[1]!=="game"){
                          // if(gamePlay===false&&userJoined===false){
                            navigate("/prizes");
                          }
                        }
                    }}>Prizes</li>
                    <li onClick={(e)=>{
                      setPageUrl("prizes")
                        if(splitPath[1]!==""){
                          if(splitPath[1]==="game"){
                            setActive(true)
                            }
                            else{
                              setIsAddress(true)
                            }
                        }
                        else{
                        // handleId(e,"support")
                        // setPageUrl("/")
                        {
                        // }
                              // setPageUrl("/")
                            // if(gamePlay===true){
                          //     if(splitPath[1]==="game"){
                          // setActive(true)
                          //     }
                        // }
                        if(gamePlay===false&&userJoined===false&&splitPath[1]!=="game"){

                        handleId(e,"support")

                          }
                        }

                        }
                    }}>Support</li>
                    {/* <Link to="/tickets"><li>Store</li></Link> */}
                    
                    <li onClick={(e)=>{
                        // handleId(e,"support")
                        // navigate("/cart")
                        setPageUrl("cart")
                        {

                          if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                              setPageUrl("cart")
                            // if(gamePlay===true){
                              if(splitPath[1]==="game"){
                          setActive(true)
                              }
                        // }
                        if(gamePlay===false&&userJoined===false&&splitPath[1]!=="game"){

                            navigate("/cart");
                          }
                        }

                    }}>Basket</li>
                </ul>
            </div>
            <div className={style.Address}>
              <div className={style.FirstContent}>
              <p className={style.Title}>YOOHOO-- <br/>FOLLOW US</p>
              <div className={style.bandaiLogo}>
                    <img src={bandaiLogo} onClick={()=>{
                      // setPageUrl("bandai")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("bandai")
                        }
                        else{
                            window.open("http://www.bandainamco-am.co.uk/")
                        }
                    }} alt="" />
                </div>
              </div>
               
                <div className={style.SocialMedia} style={{pointerEvents:gamePlay?"none":"visible"}}>
                    {/* <FaFacebook/>
                    <AiOutlineInstagram/>
                    <AiFillTwitterCircle/> */}
                    <img src={facebook} alt="" onClick={()=>{
                      setPageUrl("facebook")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("facebook")
                        }
                        else{
                          window.open("https://www.facebook.com/WinchaOnline/")
                        }
                    }}/>
                    <img src={twitter} alt=""  onClick={()=>{
                      setPageUrl("twitter")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("twitter")
                        }
                        else{
                          window.open("https://twitter.com/winchaonline")
                        }
                    }}/>
                    <img src={instagram} alt=""  onClick={()=>{
                      setPageUrl("instagram")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        }
                        else{
                          window.open("https://www.instagram.com/winchaonline/")
                        }
                    }}/>
                    <img src={tiktok} alt=""  onClick={()=>{
                      setPageUrl("tiktok")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("tiktok")
                        }
                        else{
                          window.open("https://www.tiktok.com/@winchaonline")
                        }
                    }}/>
                    <img src={youtube} alt=""  onClick={()=>{
                      setPageUrl("youtube")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("youtube")
                        }
                        else{
                          window.open("https://youtube.com/@bandainamcoae")
                        }
                    }}/>

                </div>
                <div className={style.Copyright}>
                    <p>Wincha&reg;</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                <div className={style.TermsAndPrivacyText}>
                    {/* <Link to={`${configuration.privacy}`} target="_blank">Privacy Policy</Link> */}
                    <li onClick={()=>{
                      // `${configuration.privacy}`
                      // setPageUrl("youtube")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("terms")
                        }
                        else{
                          window.open(configuration.terms)
                        }
                    }} >Privacy Policy</li>
                    {/* <Link to={`${configuration.terms}`} target="_blank">Terms and Conditions</Link> */}
                    <li onClick={()=>{
                      // `${configuration.privacy}`
                      // setPageUrl("youtube")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("privacy")
                        }
                        else{
                          window.open(configuration.privacy)

                          // window.open("https://youtube.com/@bandainamcoae")
                        }
                    }}  >Terms and Conditions</li>
                </div>
                {/* <div className={style.bandaiLogo}>
                    <img src={bandaiLogo} alt="" />
                </div> */}
                <div className={style.wpclogo}>
                    <img src={wpclogo} alt="" onClick={()=>{
                      setPageUrl("weplay")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("weplay")
                        }
                        else{
                         window.open("http://www.weplaycreative.com/")
                        }
                    }} />
                </div>
                </div>
            </div>
            </div>
            
        </div>
        <div className={style.MFooter}>
        <div className={style.Address} >
                {/* <p className={style.Title}>YOOHOO-- <br/>FOLLOW US</p> */}
                <div className={style.SocialMedia} style={{pointerEvents:gamePlay?"none":"visible"}}>
                    {/* <FaFacebook/>
                    <AiOutlineInstagram/>
                    <AiFillTwitterCircle/> */}
            {/* <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={instagram} alt="" />
                    <img src={tiktok} alt="" />
                    <img src={youtube} alt="" /> */}
                      <img src={facebook} alt="" onClick={()=>{
                       setPageUrl("facebook")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("facebook")
                         }
                         else{
                           window.open("https://www.facebook.com/WinchaOnline/")
                         }
                    }}/>
                    <img src={twitter} alt=""  onClick={()=>{
                       setPageUrl("twitter")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("twitter")
                         }
                         else{
                           window.open("https://twitter.com/winchaonline")
                         }
                    }}/>
                    <img src={instagram} alt=""  onClick={()=>{
                       setPageUrl("instagram")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("instagram")

                         }
                         else{
                           window.open("https://www.instagram.com/winchaonline/")
                         }
                    }}/>
                    <img src={tiktok} alt=""  onClick={()=>{
                       setPageUrl("tiktok")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("tiktok")

                         }
                         else{
                           window.open("https://www.tiktok.com/@winchaonline")
                         }
                    }}/>
                    <img src={youtube} alt=""  onClick={()=>{
                       setPageUrl("youtube")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("youtube")

                         }
                         else{
                           window.open("https://youtube.com/@bandainamcoae")
                         }
                    }}/>

                </div>
                <div className={style.Copyright}>
                    <p>Wincha&reg;</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                <div className={style.TermsAndPrivacyText} >
                    {/* <Link to={`${configuration.privacy}`} target="_blank">Privacy Policy</Link>
                    <Link to={`${configuration.terms}`} target="_blank">Terms and Conditions</Link> */}
                    <li onClick={()=>{
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("terms")
                        }
                        else{
                          window.open(configuration.terms)
                        }
                    }} >Privacy Policy</li>
                    <li onClick={()=>{
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("privacy")
                        }
                        else{
                          window.open(configuration.privacy)
                        }
                    }}  >Terms and Conditions</li>
                </div>
                <div className={style.Mlogos}>
                <div className={style.MbandaiLogo}>
                    <img src={bandaiLogo}onClick={()=>{
                      setPageUrl("bandai")
                      if(splitPath[1]==="game"){
                        setActive(true)
                        setPageUrl("bandai")
                        }
                        else{
                            window.open("http://www.bandainamco-am.co.uk/")
                        }
                    }}
                     alt="" />
                </div>
                <div className={style.MWPCLogo}>
                    <img src={wpclogo} alt=""  onClick={()=>{
                       setPageUrl("weplay")
                       if(splitPath[1]==="game"){
                         setActive(true)
                         setPageUrl("wePlay")
                         }
                         else{
                          window.open("http://www.weplaycreative.com/")
                         }
                     
                    }}/>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;
