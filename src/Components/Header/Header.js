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
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [leave, setLeave] = useState(false);
  const [setting, setSetting] = useState(false);
  const userData = useSelector((state) => state.userData);
  const { user } = useSelector((state) => state.profile);
  const [music, setMusic] = useState(true);
  const isUser = JSON.parse(localStorage.getItem("user"));
  const { configuration } = useSelector((state) => state.configuration);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [musicId, setMusicId] = useState("");
  const [audioId, setAudioId] = useState("");
  const [sliderSction, setSliderAction] = useState(false);
  const { notification } = useSelector((state) => state.notification);
  let inGame = localStorage.getItem("inGame");
  let userId = localStorage.getItem("user");
  console.log(inGame);
  const audioRefHeader = useRef(null);
  async function playAudio(src) {
    console.log(src);
    audioRefHeader.current.src = src;
    audioRefHeader.current.play();
  }
  useEffect(() => {
    if (setting === true) {
      playAudio(music.Click);
    }
  }, [setting]);
  useEffect(() => {
    console.log(active, "active from header");
  }, [active]);
  // useEffect(()=>{
  //   dispatch(cartAction())
  // },[])
  useEffect(()=>{
    console.log(notification)
    // if(notification){
    // console.log(notification,"from useEffect")
    // dispatch(updateProfile(userData.user));
    // dispatch(cartAction());
    // dispatch(notificationAction());
  // }
},[notification,user])
  useEffect(()=>{
    console.log(gameSound,"gameSound")
    console.log(gameMusic,"gameMusic")
  },[gameMusic,gameSound])
  useEffect(() => {
    inGame = localStorage.getItem("inGame");
    if (inGame === null || inGame === undefined) {
      localStorage.setItem("inGame", false);
    }
  }, [localStorage]);
  async function playAudio(src) {
    console.log(src);
    audioRefHeader.current.src = src;
    audioRefHeader.current.play();
  }
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(updateProfile(userData.user));
    dispatch(cartAction());
    dispatch(notificationAction());
  }, [dispatch]);
  useEffect(() => {
    console.log(gamePlay, "gamePlay status");
    console.log(active, "active status");
    console.log(window.innerWidth)
    console.log(window.outerHeight)
  },[]);
  const handleId = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    if (path === "/") {
      window.location.href = "#support";
    } else {
      navigate("/");
      setTimeout(() => {
        window.location.href = "#support";
      }, 100);
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    // console.log(window.location.pathname.split("/"))
    localStorage.removeItem("SaveShipping");
    localStorage.removeItem("times");
    // navigate("/");
    window.location.reload();
  };
  function checkGameOn() {
    inGame = localStorage.getItem("inGame");

    if (inGame === true) {
      setLeave(true);
    } else {
      setLeave(false);
    }
  }
  const [toggle, setToggle] = useState(false);
  const MobileFunc = () => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }, []);
    useEffect(() => {
      console.log(id);
    }, [id]);
    // useEffect(() => {
    //   console.log(active);
    // }, [active]);
  
    return (
      <div className={style.mobileFullMenu}>
        <div className={style.Menu}>
          <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    setSetting(false)

                    setId(menu.id);
                    // eslint-disable-next-line no-lone-blocks
                    // playAudio(music.Click);
                    
                         checkGameOn();
                      setToggle(false);
                       // if(gamePlay===true){
                setActive(true)
                // }
                      setPageUrl(menu.url)
                      playAudio(music.Click);
                     
                          checkGameOn();
                        setToggle(false);
                        if (menu.Name === "Support"&&gamePlay===false&&userJoined===false) {
                          setToggle(false);
                          handleId(e);
                        }
  
                        if (menu.Name != "Support"&&gamePlay===false&&userJoined===false) {
                          navigate(`/${menu.url}`);
                        }
                      // if (menu.Name != "Support") {
                      //   navigate(`/${menu.url}`);
                      // }
                    // }
                  }}
                >
                  
                  <p
                          className={
                            menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                          }
                        >
                    {menu.Name}
                  </p>
                  {menu.Badge === true&&menu.item==="Basket"&&notification && notification.basket_item_count>0&&notification!==undefined ? (
                    <span className={style.CartBadge}>
                      {notification && notification.basket_item_count ? notification && notification.basket_item_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                  {menu.Badge === true&&menu.item==="Notifications"&&notification && notification.notification_count>0 &&notification!==undefined ? (
                    <span className={style.CartBadge}>
                      {notification && notification.basket_item_count ? notification && notification.notification_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </ul>
        </div>

        <div className={style.close}>
          <AiOutlineClose
            className={style.closeIcon}
            onClick={() => {
             
              if(gamePlay===true){
                setActive(true)
              }
            
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={style.Container}  style={{pointerEvents:gamePlay?"none":"visible"}}>
      {setting?
      <div className={style.SettingsOverlay} onClick={()=>{
        setSetting(false)
      }}></div>
      
    :""}
     <div className={style.MobileMenu}  style={{pointerEvents:gamePlay?"none":"visible"}}>
          <div className={style.Menu}>
         
            <div className={style.HomeMenuIcons}>
              {MainMenu.map((MMenu) => {
                return (
                  <div className={style.BottomMenuIcon}>
                    <img
                      src={MMenu.icon}
                      alt=""
                      onClick={(e) => {
                    setSetting(false)
                       // if(gamePlay===true){
                setActive(true)
                // }
                      setPageUrl(MMenu.url)
                      playAudio(music.Click);
                     
                          checkGameOn();
                        setToggle(false);
                        if (MMenu.Name === "Support"&&gamePlay===false&&userJoined===false) {
                          setToggle(false);
                          handleId(e);
                        }
  
                        if (MMenu.Name != "Support"&&gamePlay===false&&userJoined===false) {
                          navigate(`/${MMenu.url}`);
                        }
                      }}

                    />
                    {MMenu.Badge === true &&notification && notification.basket_item_count>0&&notification!==undefined&&MMenu.Name==="Basket"?(
                    <span className={style.CartBadge}>
                      {notification && notification.basket_item_count ? notification && notification.basket_item_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                    {MMenu.Badge === true &&notification && notification.notification_count>0&&MMenu.Name==="Notifications"&&notification!==undefined?(
                    <span className={style.CartBadge}>
                      {notification && notification.notification_count ? notification && notification.notification_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                  </div>
                );
              })}
              <HiMenu
                onClick={() => {
                  // setSetting(true)
                  setting ? setSetting(false) : setSetting(true);
                }}
              />
              {/* <div className={style.BottomMenuIcon}>
                  <img src={} alt="" />
                </div>
                <div className={style.BottomMenuIcon}>
                  <img src={} alt="" />
                </div>
                <div className={style.BottomMenuIcon}>
                  <img src={} alt="" />
                </div> */}
            </div>
          </div>
          <div className={style.HamBurgerMenu}  style={{pointerEvents:gamePlay?"none":"visible"}}>
            {setting ? (
              <div className={style.Settings}>
                <AiOutlineClose
                  className={style.closeIcon}
                  onClick={() => {
                    setId("");

                    
                  }}
                />
                {/* {isUser? */}
                <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
                  {settingsMenu.map((menu) => {
                    return (
                      <div
                        className={style.MenuSection}
                        onClick={(e) => {
              e.preventDefault()
              setSetting(false)
              // if(gamePlay===true){
                // }
                setPageUrl(menu.url)
                
                
                // navigate(`/${MMenu.url}`);
                //   if (MMenu.Name === "Support"&&gamePlay===false) {
                  //   setToggle(false);
                  //   handleId(e);
                  // }
                  
                  // if (MMenu.Name != "Support"&&gamePlay===false) {
                    //   navigate(`/${MMenu.url}`);
                    // }
                    
                    
                    setActive(true)
                          setId(menu.id);
                         
                          if (
                            menu.Name === "Terms of Use" &&gamePlay===false&&userJoined===false||
                            menu.Name === "Privacy Policy"&&gamePlay===false&&userJoined===false
                          ) {
                            window.open(
                              `${
                                menu.Name === "Terms of Use"
                                  ? configuration.terms
                                  : menu.Name === "Privacy Policy"
                                  ? configuration.privacy
                                  : ""
                              }`,
                              "_blank"
                            );
                          }
                          if (menu.Name === "Sound" || menu.Name === "Music") {
                            // navigate(``)
                            setSetting(true);

                            // navigate(`/${menu.url}`)
                          } else if(menu.Name!=="Logout"&&gamePlay===false&&userJoined===false){
                            navigate(`/${menu.url}`);
                          }
                          if (menu.Name === "Logout"&&gamePlay===false&&userJoined===false) {
                            e.preventDefault()
                            navigate(`${window.location.pathname}`)
                            setPopup(true);
                          }
                        }}
                      >
                        {/* if(menu.Name) */}
                        
                  <p
                          className={
                            menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                          }
                        >
                          {menu.Name === "Sound" ||
                          menu.Name === "Music" ||
                          menu.Name === "Logout" ||
                          menu.Name === "Login/Register"
                            ? ""
                            : menu.Name}
                        </p>
                        {menu.Badge === true&&menu.Name==="Basket"&&notification && notification.basket_item_count>0&&notification!==undefined ? (
                    <span className={style.CartBadge}>
                      {notification && notification.basket_item_count ? notification && notification.basket_item_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                        {menu.Badge === true&&menu.Name==="Notifications"&&notification && notification.notification_count>0 &&notification!==undefined ? (
                    <span className={style.CartBadge}>
                      {notification && notification.notification_count ? notification && notification.notification_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                        {/* <p className={id===menu.id&&menu.name!="Logout"&&menu.name!="Login/Register"?style.ActiveUrl:style.NormalUrl}>{menu.Name}</p> */}
                        {menu.Name === "Music" ? (
                          <div className={style.Music}>
                          <li>Music</li>
                          <div
                            className={
                              gameMusic === true||gameMusic==="true"
                                ? style.ActiveSlider
                                : style.Slider
                            }
                            onClick={() => {
                              setMusicId(menu.id);
                              gameMusic===true?setGameMusic(false):setGameMusic(true)
                              // sliderSction
                              //   ? setSliderAction(false)
                              //   : setSliderAction(true);
                              // if (sliderSction === true) {
                              // setGameSound(false)

                              //   localStorage.setItem(
                              //     "music",
                              //     JSON.stringify(false)
                              //   );
                              // } else {
                              // setGameSound(true)

                              //   localStorage.setItem(
                              //     "music",
                              //     JSON.stringify(true)
                              //   );
                              // }
                            }}
                          >
                            <div
                              className={
                                gameMusic === true||gameMusic==="true"
                                  ? style.ActiveSliderBtn
                                  : style.SliderBtn
                              }
                            ></div>
                          </div>
                        </div>
                        ) : (
                          ""
                        )}
                        {menu.Name === "Sound" ? (
                           <div className={style.Sound}>
                           <li>Sound</li>
                           <div
                             className={
                               gameSound === true||gameSound==="true"
                                 ? style.ActiveSlider
                                 : style.Slider
                             }
                             onClick={() => {
                               setAudioId(menu.id);
                               gameSound===true?setGameSound(false):setGameSound(true)
                               // sliderSction
                               //   ? setSliderAction(false)
                               //   : setSliderAction(true);
                               // if (sliderSction === true) {
                               // setGameSound(false)

                               //   localStorage.setItem(
                               //     "sound",
                               //     JSON.stringify(false)
                               //   );
                               // } else {
                               // setGameSound(true)

                               //   localStorage.setItem(
                               //     "sound",
                               //     JSON.stringify(true)
                                 
                               //   );
                               // }
                             }}
                           >
                             <div
                               className={
                                 gameSound === true||gameSound==="true"
                                   ? style.ActiveSliderBtn
                                   : style.SliderBtn
                               }
                             ></div>
                           </div>
                         </div>
                        ) : (
                          ""
                        )}
                        
                  <p
                          className={
                            menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                          }
                        >
                          {userId === null&&user?.username===""
                            ? menu.Name === "Login/Register"
                              ? menu.Name
                              : ""
                            : menu.Name === "Logout"
                            ? menu.Name
                            : ""}
                        </p>
                      </div>
                    );
                  })}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      {setting?
      <div className={style.Settings}  style={{pointerEvents:gamePlay?"none":"visible"}}>
        <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
          {settingsMenu.map((menu) => {
            return (
              <div
                className={style.MenuSection}
                onClick={(e) => {
                  e.preventDefault()
                  setSetting(false)
                  // if(gamePlay===true){
                  // setActive(true)
                  // }
                  setPageUrl(menu.url)

                  // setId(menu.id);
                  // {
                  //   gamePlay === true && active === false
                  //     ? setActive(false)
                  //     : // ""
                  //       setSetting(false);
                  // }
                  setActive(true)
                  setId(menu.id);
                 
                  if (
                    menu.Name === "Terms of Use" &&gamePlay===false&&userJoined===false||
                    menu.Name === "Privacy Policy"&&gamePlay===false&&userJoined===false
                  ) {
                    window.open(
                      `${
                        menu.Name === "Terms of Use"
                          ? configuration.terms
                          : menu.Name === "Privacy Policy"
                          ? configuration.privacy
                          : ""
                      }`,
                      "_blank"
                    );
                  }
                  if (menu.Name === "Sound" || menu.Name === "Music") {
                    // navigate(``)
                    setSetting(true);

                    // navigate(`/${menu.url}`)
                  } else if(menu.Name!=="Logout"&&gamePlay===false&&userJoined===false){
                    navigate(`/${menu.url}`);
                  }
                  if (menu.Name === "Logout"&&gamePlay===false&&userJoined===false) {
                    e.preventDefault()
                    navigate(`${window.location.pathname}`)
                    setPopup(true);
                  }
                }}
              >
                {/* if(menu.Name) */}
                
                
          <p
                  className={
                    menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                  }
                >
                {/* <p
                  className={
                    id === menu.id ? style.ActiveUrl : style.NormalUrl
                  }
                > */}
                  {menu.Name === "Sound" ||
                  menu.Name === "Music" ||
                  menu.Name === "Logout" ||
                  menu.Name === "Login/Register"
                    ? ""
                    : menu.Name}
                </p>
                {menu.Badge === true&&menu.Name==="Basket"&&notification && notification.basket_item_count>0&&notification!==undefined ? (
            <span className={style.CartBadge}>
              {notification && notification.basket_item_count ? notification && notification.basket_item_count : "0"}
            </span>
          ) : (
            ""
          )}
                {menu.Badge === true&&menu.Name==="Notifications" &&notification && notification.notification_count>0 &&notification!==undefined ? (
            <span className={style.CartBadge}>
              {notification && notification.notification_count ? notification && notification.notification_count : "0"}
            </span>
          ) : (
            ""
          )}
                {/* {userId===null?<p className={id===menu.id?style.ActiveUrl:style.NormalUrl> menu.Name==="Login/Register"?menu.Name:menu.Name==="Logout"?menu.Name?menu.Name:""</p>} */}
                {/* // :<p className={id===menu.id?style.ActiveUrl:style.NormalUrl}>{menu.Name==="Logout"?menu.Name:""}</p>} */}
                {/* {userId===null?menu.Name==="Login/Register"?<p className={id===menu.id?style.ActiveUrl:style.NormalUrl}>{menu.Name}</p>:"":menu.Name==="Login/Register"?<p className={id===menu.id?style.ActiveUrl:style.NormalUrl}>{menu.Name}</p>:""} */}
                {menu.Name === "Music" ? (
                  <div className={style.Music}>
                    <li>Music</li>
                    <div
                      className={
                        gameMusic === true||gameMusic==="true"
                          ? style.ActiveSlider
                          : style.Slider
                      }
                      onClick={() => {
                        setMusicId(menu.id);
                        gameMusic===true?setGameMusic(false):setGameMusic(true)
                        // sliderSction
                        //   ? setSliderAction(false)
                        //   : setSliderAction(true);
                        // if (sliderSction === true) {
                        // setGameSound(false)

                        //   localStorage.setItem(
                        //     "music",
                        //     JSON.stringify(false)
                        //   );
                        // } else {
                        // setGameSound(true)

                        //   localStorage.setItem(
                        //     "music",
                        //     JSON.stringify(true)
                        //   );
                        // }
                      }}
                    >
                      <div
                        className={
                          gameMusic === true||gameMusic==="true"
                            ? style.ActiveSliderBtn
                            : style.SliderBtn
                        }
                      ></div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {menu.Name === "Sound" ? (
                  <div className={style.Sound}>
                    <li>Sound</li>
                    <div
                      className={
                        gameSound === true||gameSound==="true"
                          ? style.ActiveSlider
                          : style.Slider
                      }
                      onClick={() => {
                        setAudioId(menu.id);
                        gameSound===true?setGameSound(false):setGameSound(true)
                        // sliderSction
                        //   ? setSliderAction(false)
                        //   : setSliderAction(true);
                        // if (sliderSction === true) {
                        // setGameSound(false)

                        //   localStorage.setItem(
                        //     "sound",
                        //     JSON.stringify(false)
                        //   );
                        // } else {
                        // setGameSound(true)

                        //   localStorage.setItem(
                        //     "sound",
                        //     JSON.stringify(true)
                          
                        //   );
                        // }
                      }}
                    >
                      <div
                        className={
                          gameSound === true||gameSound==="true"
                            ? style.ActiveSliderBtn
                            : style.SliderBtn
                        }
                      ></div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                
          <p
                  className={
                    menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                  }
                >
                  {userId === null&&user?.username===""
                    ? menu.Name === "Login/Register"
                      ? menu.Name
                      : ""
                    : menu.Name === "Logout"
                    ? menu.Name
                    : ""}
                </p>
              </div>
            );
          })}
        </ul>
      </div>:""
      }
      <audio ref={audioRefHeader}></audio>
      <div className={style.MobileTopNav} style={{pointerEvents:gamePlay?"none":"visible"}}>
        <div className={style.MLogo}onClick={(e) => {
            //  setActive(true)
             // }
                   setPageUrl("/")
                 // if(gamePlay===true){
               setActive(true)
             // }
                if(gamePlay===false&&userJoined===false){
                  navigate("/");
                }
          }}>
          <img src={logo} alt="" />
        </div>
        <div className={style.MBandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.MCredits}>
          <div className={style.MTicket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.MPoints}>
            <p>{(user && user.point) || "0"}</p>
          </div>
          <div className={style.MPlus}>
            <button onClick={()=>{
              navigate("/tickets")
            }}>
              <img src={plus} alt="" />
            </button>
          </div>
        </div>
      </div>
     
      {popup ? (
        <div className={style.Section}>
          <div className={style.popup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              {/* <p>{vipData.vip_discription}</p> */}
              <p>Are you sure you want to logout?</p>
              {/* <p>fhf</p> */}
            </div>
            <div className={style.ReportPopupButton}>
              <button
                onClick={(e) => {
              e.preventDefault()

                  handleLogout(e);
                }}
              >
                YES
              </button>
              <button
                onClick={(e) => {
              e.preventDefault()

                  setPopup(false);
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {toggle ? (
        <MobileFunc />
      ) : (
       
        ""
      )}

      <div className={style.Header} style={{pointerEvents:gamePlay?"none":"visible"}}>
        <div className={style.Logo}>
          <button
            onClick={(e) => {
              e.preventDefault()
              //
            setPageUrl("/")
              {

                setActive(true)
              // }
                    setPageUrl("/")
                  // if(gamePlay===true){
                setActive(true)
              // }
                 if(gamePlay===false&&userJoined===false){
                   navigate("/");
                 }
              }
            }}
          >
            <img src={logo} alt=""
        

          />
          </button>
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    setSetting(false)
                    
                  
                    setId(menu.id);
                   
                    // if(gamePlay===true){
                setActive(true)
              // }
                    setPageUrl(menu.url)
                    playAudio(music.Click);
                   
                        checkGameOn();
                      setToggle(false);
                      if (menu.Name === "Support"&&gamePlay===false&&userJoined===false) {
                        setToggle(false);
                        handleId(e);
                      }

                      if (menu.Name != "Support"&&gamePlay===false&&userJoined===false) {
                        navigate(`/${menu.url}`);
                      }
                    
                  }}
                >
                  

                  <p
                          className={
                            menu.Name.toLowerCase() === window.location.pathname.split("/")[1]||menu.Name==="Home"&&window.location.pathname.split("/")[1]===""||menu.Name==="Support"&&window.location.pathname.split("/")[2]==="support"||menu.Name==="Basket"&&window.location.pathname.split("/")[1]==="cart"||menu.Name==="Cashier"&&window.location.pathname.split("/")[1]==="tickets"? style.ActiveUrl : style.NormalUrl
                          }
                        >
                    {menu.Name}
                  </p>
                  {menu.Badge === true&&menu.Name==="Basket"&&notification!==undefined&&notification&&notification.basket_item_count>0? (
                    <span className={style.CartBadge}>
                      {notification && notification.basket_item_count ? notification && notification.basket_item_count : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                  {menu.Badge === true&&menu.Name==="Notifications" &&notification && notification.notification_count>0 &&notification!==undefined ? (
            <span className={style.CartBadge}>
              {notification && notification.notification_count ? notification && notification.notification_count : "0"}
            </span>
          ) : (
            ""
          )}
                 
                </div>
              );
            })}
          </ul>
        </div>
        {userId!==null&&user?.username!==""?
        <div className={style.Credits}>
          <div className={style.Ticket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.Points}>
            <p>{(user && user.point) || "0"}</p>
          </div>
          <Link to="/tickets">
          <div className={style.Plus}>
            <button onClick={()=>{
              navigate("/tickets")
            }}>
              <img src={plus} alt="" />
            </button>
          </div>
          </Link>
        </div>
      :
      ""}
      {userId!==null&&user?.username!==""?
        <div className={style.Profile}>
          <p className={style.Username}>
            {(user && user.username) || "username"}
          </p>
          <div className={style.HamBurgerMenu}>
            <FiMenu
              onClick={() => {
                // setSetting(true)
                setting ? setSetting(false) : setSetting(true);
              }}
            />
            {setting ? (
              ""
            ) : (
              ""
            )}
          </div>
        </div>
      
    :
    <div className={style.Profile}>
          <p className={style.LoginRegister} onClick={()=>{
            navigate("/login")
          }}>
           Sign In
          </p>
          <p className={style.LoginRegister} onClick={()=>{
            navigate("/register")
          }}>
           Register
          </p>
          
        </div>
    }
      </div>
    </div>
  );
};

export default Header;
