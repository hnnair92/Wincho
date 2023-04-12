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
const Header = ({ gameMusic, setGameMusic, gameSound, setGameSound,setActive, active, setGamePlay, gamePlay }) => {
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
    console.log(active, "active from description");
  }, [active]);
  // useEffect(()=>{
  //   dispatch(cartAction())
  // },[])
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
    localStorage.removeItem("SaveShipping");
    navigate("/");
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

    return (
      <div className={style.mobileFullMenu}>
        <div className={style.Menu}>
          <ul>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    setId(menu.id);
                    // eslint-disable-next-line no-lone-blocks
                    playAudio(music.Click);
                    {
                      gamePlay === true && active === false
                        ? setActive(true)
                        : checkGameOn();
                      setToggle(false);
                      if (menu.Name === "Support") {
                        setToggle(false);
                        handleId(e);
                      }
                      if (menu.Name != "Support") {
                        navigate(`/${menu.url}`);
                      }
                    }
                  }}
                >
                  <p
                    className={
                      id === menu.id ? style.ActiveUrl : style.NormalUrl
                    }
                  >
                    {menu.Name}
                  </p>
                  {menu.Badge === true ? (
                    <span className={style.CartBadge}>
                      {cart && cart.length ? cart && cart.length : "0"}
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
              {
                gamePlay === true && active === false
                  ? setActive(true)
                  : setToggle(false);
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={style.Container}>
      <audio ref={audioRefHeader}></audio>
      <div className={style.MobileTopNav}>
        <div className={style.MLogo}>
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
            <button>
              <img src={plus} alt="" />
            </button>
          </div>
        </div>
      </div>
      {active ? (
        <div className={style.PopupContainer}>
          <div className={style.popup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              <p>Do you want to exit the game</p>
            </div>
            <div className={style.popupButton}>
              <button
                onClick={() => {
                  {
                    gamePlay === true && active === false
                      ? setActive(false)
                      : console.log("cancelled");
                  }
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  // {  gamePlay===true&&active===false?
                  //   setActive(true)
                  //   :
                  navigate("/prizes");
                  // callback(false)
                  setActive(false);
                  setGamePlay(false);
                  console.log("Exits");
                }}
              >
                OK
              </button>
              {/* <button
              to="/tickets"
              onClick={() => {
                setTopup(false);
              }}
            >
              <button>TOP UP</button>
            </button> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
                  handleLogout(e);
                }}
              >
                YES
              </button>
              <button
                onClick={() => {
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
        <div className={style.MobileMenu}>
          <div className={style.Menu}>
            {/* <HiMenu className={style.menuIcon}  onClick={()=>{
              {  gamePlay===true&&active===false?
                setActive(true)
                :
               
                setToggle(true)}
              }}/> */}
            <div className={style.HomeMenuIcons}>
              {MainMenu.map((MMenu) => {
                return (
                  <div className={style.BottomMenuIcon}>
                    <img
                      src={MMenu.icon}
                      alt=""
                      onClick={() => {
                        navigate(`/${MMenu.url}`);
                      }}
                    />
                    {MMenu.Badge === true ? (
                    <span className={style.CartBadge}>
                      {cart && cart.length ? cart && cart.length : "0"}
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
          <div className={style.HamBurgerMenu}>
            {setting ? (
              <div className={style.Settings}>
                <AiOutlineClose
                  className={style.closeIcon}
                  onClick={() => {
                    setId("");

                    {
                      gamePlay === true && active === false
                        ? setActive(true)
                        : setSetting(false);
                    }
                  }}
                />
                {/* {isUser? */}
                <ul>
                  {settingsMenu.map((menu) => {
                    return (
                      <div
                        className={style.MenuSection}
                        onClick={() => {
                          setId(menu.id);
                          {
                            gamePlay === true && active === false
                              ? setActive(true)
                              : setSetting(false);
                          }
                          if (
                            menu.Name === "Terms of Use" ||
                            menu.Name === "Privacy Policy"
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
                          if (menu.Name === "Logout") {
                            setPopup(true);
                          }
                          if (menu.Name === "Sound" || menu.Name === "Music") {
                            // navigate(``)
                            setSetting(true);

                            // navigate(`/${menu.url}`)
                          } else {
                            navigate(`/${menu.url}`);
                          }
                        }}
                      >
                        {/* if(menu.Name) */}
                        <p
                          className={
                            id === menu.id ? style.ActiveUrl : style.NormalUrl
                          }
                        >
                          {menu.Name === "Sound" ||
                          menu.Name === "Music" ||
                          menu.Name === "Logout" ||
                          menu.Name === "Login/Register"
                            ? ""
                            : menu.Name}
                        </p>
                        {menu.Badge === true ? (
                    <span className={style.CartBadge}>
                      {cart && cart.length ? cart && cart.length : "0"}
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
                        <p className={
                            id === menu.id ? style.ActiveUrl : style.NormalUrl
                          }>
                          {userId === null
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
      )}

      <div className={style.Header}>
        <div className={style.Logo}>
          <button
            onClick={() => {
              {
                gamePlay === true && active === false
                  ? setActive(true)
                  : setActive(false);
                navigate("/");
              }
            }}
          >
            <img src={logo} alt="" />
          </button>
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    // eslint-disable-next-line no-lone-blocks
                    setId(menu.id);
                    playAudio(music.Click);
                    {
                      gamePlay === true && leave === true
                        ? setLeave(false)
                        : checkGameOn();
                      setToggle(false);
                      if (menu.Name === "Support") {
                        setToggle(false);
                        handleId(e);
                      }
                      if (menu.Name != "Support") {
                        navigate(`/${menu.url}`);
                      }
                      // audioRefHeader.current.src = music.Click
                      // audioRefHeader.current.play()
                    }
                  }}
                >
                  {/* <audio ref={audioRefHeader}></audio> */}

                  <p
                    className={
                      id === menu.id ? style.ActiveUrl : style.NormalUrl
                    }
                  >
                    {menu.Name}
                  </p>
                  {menu.Badge === true ? (
                    <span className={style.CartBadge}>
                      {cart && cart.length ? cart && cart.length : "0"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </ul>
        </div>
        {userId!==null?
        <div className={style.Credits}>
          <div className={style.Ticket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.Points}>
            <p>{(user && user.point) || "0"}</p>
          </div>
          <div className={style.Plus}>
            <button>
              <img src={plus} alt="" />
            </button>
          </div>
        </div>
      :
      ""}
      {userId!==null?
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
              <div className={style.Settings}>
                <ul>
                  {settingsMenu.map((menu) => {
                    return (
                      <div
                        className={style.MenuSection}
                        onClick={() => {
                          setId(menu.id);
                          {
                            gamePlay === true && active === false
                              ? setActive(false)
                              : // ""
                                setSetting(false);
                          }
                          if (
                            menu.Name === "Terms of Use" ||
                            menu.Name === "Privacy Policy"
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
                          if (menu.Name === "Logout") {
                            setPopup(true);
                          }
                          if (menu.Name === "Sound" || menu.Name === "Music") {
                            // navigate(``)
                            setSetting(true);

                            // navigate(`/${menu.url}`)
                          } else {
                            navigate(`/${menu.url}`);
                          }
                        }}
                      >
                        {/* if(menu.Name) */}
                        
                        <p
                          className={
                            id === menu.id ? style.ActiveUrl : style.NormalUrl
                          }
                        >
                          {menu.Name === "Sound" ||
                          menu.Name === "Music" ||
                          menu.Name === "Logout" ||
                          menu.Name === "Login/Register"
                            ? ""
                            : menu.Name}
                        </p>
                        {menu.Badge === true ? (
                    <span className={style.CartBadge}>
                      {cart && cart.length ? cart && cart.length : "0"}
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
                        <p className={
                            id === menu.id ? style.ActiveUrl : style.NormalUrl
                          }>
                          {userId === null
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
