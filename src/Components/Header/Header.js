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
import historyTitle from '../../assests/History Title.png'
import bandaiLogo from "../../assests/Bandai Namco Logo.png";
import { MainMenu, settingsMenu } from "./Menu";
import { music } from "../../assests/Musics/allMusic";
import { baseUrl } from "../url";
// import { useSelector } from 'react-redux'
const Header = ({ userJoined,pageUrl,setPageUrl,gameMusic, setGameMusic, gameSound, setGameSound,setActive, active, setGamePlay, gamePlay }) => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [leave, setLeave] = useState(false);
  const [setting, setSetting] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  const userData = useSelector((state) => state.userData);
  const { user } = useSelector((state) => state.profile);
  // const [music, setMusic] = useState(true);
  // const isUser = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","")
  // const isUser = JSON.parse(localStorage.getItem("user"));
  const { configuration } = useSelector((state) => state.configuration);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [musicId, setMusicId] = useState("");
  const [history,setHistory] = useState([])
  const [historyPopup,setHistoryPopup] = useState(false)
  const [audioId, setAudioId] = useState("");
  const [sliderSction, setSliderAction] = useState(false);
  const { notification } = useSelector((state) => state.notification);
  let inGame = localStorage.getItem("inGame");
  // let userId = JSON.parse(localStorage.getItem("user"))||
  let userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
  // let userId = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","")
  console.log(inGame);
  const audioRef = useRef(null);
  const audioRefHome = useRef(null);  
  let audioStatus = localStorage.getItem("sound");
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(false))
  );


  async function getHistory(){
    await fetch(`${baseUrl}/cart/history`,{
      method:"POST",
      body:JSON.stringify({
        user_id:userId
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log(data)
      setHistory(data.data)
    })
  }
  useEffect(()=>{
    getHistory()
  },[])
  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
  
    // console.log(audioRefHome.current.play(), "from its function");
   
    // audioRefHome.current.src = music.Menu;
    // audioRefHome.current.play();
    // console.log(audioRefHome.current.volume, "from its function");
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
      // console.log(audioRefHome.current.volume);
      // audioRefHome.current.volume = 1;
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
    localStorage.removeItem("premium");
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
  useEffect(()=>{
    console.log(userId)
  },[])
  const MobileFunc = () => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }, []);
    useEffect(() => {
      console.log(id);
    }, [id]);
    useEffect(()=>{
      console.log(gamePlay)
    },[gamePlay])
    // useEffect(() => {
    //   console.log(active);
    // }, [active]);
  // useEffect(()=>{
  //   if(active===true&&setting===false){
  //     playAudio(music.Pop)
  //   }
  //   else if(active===true&&setting===true){
  //     playAudio(music.Chime)

  //   }
  //   console.log(setting)
  //   console.log(active)
  // },[setting,active])
  useEffect(()=>{
    console.log(userId)
    console.log(user?.username)
  })
    return (
      <div className={style.mobileFullMenu}>
        <div className={style.Menu}>
          <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    playAudio(music.Click)
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
             setSetting(false)
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
    <div className={style.Container}>
    {/* <div className={style.Container}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
      {setting?
      <div className={style.SettingsOverlay} onClick={()=>{
        setSetting(false)
      }}></div>
      
    :""}
    {historyPopup?<div className={style.ShowCartHistory}>
      <div className={style.cartHistoryOverlay} onClick={()=>{
        setHistoryPopup(false)
      }}>

      </div>
      <div className={style.CartHistory}>
        {/* <p className={style.CartTitle}>HISTORY</p> */}
        <div className={style.histoyImageDiv}>
        <img src={historyTitle} alt="" className={style.cartTitleImage}/>
        </div>
        {history.length<1?<p className={style.historyEmptyText}>history is empty</p>:""}
        <div className={style.CartProducts}>
          {history.length>0&&history!==null&history!==undefined&&history.map((item)=>{
            console.log(item)
            return(
          <div className={style.CartProduct}>
            <div className={style.CartImage}>
              <img src={item.featured_image.large} alt="" />
            </div>
            <div className={style.CartContent}>
              <p>{item.title}</p>
            </div>
          </div>

            )
          })}
        </div>
      </div>
    </div>
    :""}
    {isAddress? (
        <div className={` ${style.addressPopup}`}>
        <div className={style.Overlay} onClick={()=>{
            setIsAddress(false)
        }}>

        </div>
        <div className={style.popupSection}>
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
        </div>
      ) : (
        ""
      )}
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
                        playAudio(music.Click)
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
                          // handleId(e);
                          setIsAddress(true)
                          
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
          <div className={style.HamBurgerMenu} >
          {/* <div className={style.HamBurgerMenu}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
            {setting ? (
              <div className={style.Settings}>
                <AiOutlineClose
                  className={style.closeIcon}
                  onClick={() => {
                    setSetting(false)
                    setId("");

                    
                  }}
                />
                {/* {isUser? */}
                <ul>
                  {settingsMenu.map((menu) => {
                    return (
                      <div
                        className={style.MenuSection}
                        // style={{margin:menu.Name==="Logout"&&userId===null||menu.Name==="Logout"&&user?.username!==""||menu.Name==="Login/Register"&&userId!==null?"0":"15px 0px",pointerEvents:gamePlay===true&&menu.Name!=="Sound"||gamePlay===true&&menu.Name!=="Music"?"none":"visible"}}
                        style={{margin:menu.Name==="Logout"&&userId===null&&user?.username===""||menu.Name==="Logout"&&user?.username===""||menu.Name==="Login/Register"&&userId!==null&&user?.username===""?"0":"15px 0px",pointerEvents:gamePlay===true&&menu.Name!=="Sound"||gamePlay===true&&menu.Name!=="Music"?"none":"visible"}}
                
                        // style={{margin:menu.Name==="Logout"&&userId===null||menu.Name==="Login/Register"&&userId!==null?"0":"15px 0px"}}
                        // style={{margin:menu.Name==="Logout"&&userId===null?"0":"15px 0px",marginBottom:userId!==null&&menu.Name==="Logout"&&menu.Name!=="Logout"?"30px":"15px"}}
                        onClick={(e) => {
                          // if(menu.Name==="Logout"){
                    console.log(userId)
                    console.log(user?.username)
                  // }
              e.preventDefault()
              playAudio(music.Boing)
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
                          if(menu.Name==="History"){
                            setHistoryPopup(true)
                          }
                          if (menu.Name === "Sound" || menu.Name === "Music") {
                            // navigate(``)
                            setSetting(true);

                            // navigate(`/${menu.url}`)
                          } else if(menu.Name!=="Logout"&&menu.Name!=="History"&&gamePlay===false&&userJoined===false){
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
                          {userId === null&&user?.username!==""
                          // {userId === null&&user===null||user===undefined
                          // {userId === null&&userId.username===""||userId === undefined
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
      <div className={style.Settings} >
      {/* <div className={style.Settings}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
        <ul>
          {settingsMenu.map((menu) => {
            return (
              <div
                className={style.MenuSection}
                style={{margin:menu.Name==="Logout"&&userId===null&&user?.username===""||menu.Name==="Logout"&&user?.username===""||menu.Name==="Login/Register"&&userId!==null&&user?.username!==""?"0":"15px 0px",pointerEvents:gamePlay===true&&menu.Name!=="Sound"||gamePlay===true&&menu.Name!=="Music"?"none":"visible"}}
                onClick={(e) => {
                  if(menu.Name==="Logout"){
                    console.log(userId)
                    console.log(user?.username)
                  }
                  e.preventDefault()
              playAudio(music.Boing)

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
                  if(menu.Name==="History"){
                    setHistoryPopup(true)
                  }
                  if (menu.Name === "Sound" || menu.Name === "Music") {
                    // navigate(``)
                    setSetting(true);

                    // navigate(`/${menu.url}`)
                  } else if(menu.Name!=="Logout"&&menu.Name!=="History"&&gamePlay===false&&userJoined===false){
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
                  {userId === null&&user?.username!==""
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
      <audio ref={audioRef}></audio>
      <div className={style.MobileTopNav} style={{pointerEvents:gamePlay?"none":"visible"}}>
        <div className={style.MLogo}
        // onClick={(e) => {
        //     //  setActive(true)
        //      // }
        //            setPageUrl("/")
        //          // if(gamePlay===true){
        //        setActive(true)
        //      // }
        //         if(gamePlay===false&&userJoined===false){
        //           navigate("/");
        //         }
        //   }}
          >
          <img src={logo} alt=""   onClick={(e) => {
            console.log("clicked")
            console.log(gamePlay)
            console.log(userJoined)
            console.log(active)
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
 />
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
              // navigate("/tickets")
              setPageUrl("/tickets")
              {
                setActive(true)
                    setPageUrl("/tickets")
                setActive(true)
                 if(gamePlay===false&&userJoined===false){
                   navigate("/tickets");
                 }
              }
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

      <div className={style.Header} >
      {/* <div className={style.Header} style={{pointerEvents:gamePlay?"none":"visible"}}> */}
        <div className={style.Logo}>
          <button
            
          >
            <img src={logo} alt=""
          onClick={(e) => {
            console.log("clicked")
            console.log(gamePlay)
            console.log(userJoined)
            console.log(active)
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

          />
          </button>
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul style={{pointerEvents:gamePlay===true?"none":"visible"}}>
            {/* desktop main header */}
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    playAudio(music.Click)
                    // console.log(music)
                    setSetting(false)
                    
                  
                    setId(menu.id);
                   
                    // if(gamePlay===true){
                setActive(true)
              // }
                    setPageUrl(menu.url)
                    // playAudio(music.Click);
                   
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
        {userId !== null||user!==null||user!==undefined?
        <div className={style.Credits}>
          <div className={style.Ticket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.Points}>
            <p>{(user && user.point) || "0"}</p>
          </div>
          {/* <Link to="/tickets"> */}
          <div className={style.Plus}>
            <button onClick={()=>{
                setPageUrl("tickets")
                
    
                  setActive(true)
                // }
                      // setPageUrl("tickets")
                    // if(gamePlay===true){
                  setActive(true)
                // }
                   if(gamePlay===false&&userJoined===false){
                     navigate("/tickets");
                   }
            }}>
              <img src={plus} alt="" />
            </button>
          </div>
          {/* </Link> */}
        </div>
      :
      ""}
      {userId !== null &&user&&user.username!==""?
      // {userId !== null||user!==null||user!==undefined?
      // {userId!==null||userId!==""||userId!==undefined||user?.username!==""?
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
    }
      </div>
    </div>
  );
};

export default Header;
