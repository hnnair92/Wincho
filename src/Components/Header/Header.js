/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import style from "./Header.module.css";
import logo from "../../assests/Wincha Icon.png";
import { FiMenu } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import ticket from "../../assests/Floating Tab Gold Ticket.png";
import plus from "../../assests/Header Add Value.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { assets } from "../Description/assests";
import {
  cartAction,
  notificationAction,
  updateProfile,
} from "../../actions/user";
import historyTitle from "../../assests/History Title.png";
import bandaiLogo from "../../assests/Bandai Namco Logo.png";
import { MainMenu, settingsMenu } from "./Menu";
import { music } from "../../assests/Musics/allMusic";
import { baseUrl } from "../url";
import { socket } from "../../socket";
import Cookie from "../Cookie/Cookie";
import PlaySound from "../Audio/PlaySound";
// import { useSelector } from 'react-redux'
const Header = ({
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
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [leave, setLeave] = useState(false);
  const [playAudio, setPlayAudio] = useState("");
  const [exitPopup, setExitPopup] = useState(false);
  const [kickout, setKickout] = useState(false);
  const [setting, setSetting] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [notificationbubble, setNotificationBubble] = useState(true);
  const userData = useSelector((state) => state.userData);
  const { user } = useSelector((state) => state.profile);
  const urlState = window.location;
  // const [music, setMusic] = useState(true);
  // const isUser = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","")
  // const isUser = JSON.parse(localStorage.getItem("user"));
  const { configuration } = useSelector((state) => state.configuration);
  const { game } = useSelector((state) => state.gameEntry);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [musicId, setMusicId] = useState("");
  const [history, setHistory] = useState([]);
  const [historyPopup, setHistoryPopup] = useState(false);
  const [audioId, setAudioId] = useState("");
  const [sliderSction, setSliderAction] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const { notification } = useSelector((state) => state.notification);
  let inGame = localStorage.getItem("inGame");
  const placeId = urlState.pathname.split("/");
  console.log(urlState);
  console.log(placeId[1]);
  // let userId = JSON.parse(localStorage.getItem("user"))||
  const token = JSON.parse(localStorage.getItem("token"));

  let userId =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  // let userId = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","")
  console.log(inGame);
  
  async function getHistory() {
    await fetch(`${baseUrl}/cart/history`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "history data");
        setHistory(data.data);
      });
  }
  useEffect(() => {
    if(userId){
      getHistory();
    }
  }, [urlState, dispatch, window, active,userId]);



  

  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
  if(userId){
    dispatch(updateProfile(userData.user));
    dispatch(cartAction());
    dispatch(notificationAction());

  }
  }, [dispatch, window, active,userId]);
  useEffect(() => {
    console.log(gamePlay, "gamePlay status");
    console.log(active, "active status");
    console.log(window.innerWidth);
    console.log(window.outerHeight);
  }, []);
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
  const MhandleId = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    if (path === "/") {
      window.location.href = "#supports";
    } else {
      navigate("/");
      setTimeout(() => {
        window.location.href = "#supports";
      }, 100);
    }
  };
  console.log(window.location.pathname.split("/")[1]);

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
 
  const handleTabClosing = async (event) => {
    // removePlayerFromGame()
    // console.log("exiting")\
    await gameLeave(userId, false);
    // console.log(closing)
    // if(reloadStatus===true){

    // event.preventDefault();
    // event.returnValue ='';
    // }
    // setExitPopupOpen(true);
  };
  const alertUser = (event: any) => {
    // if(reloadStatus===true){

    console.log(event);
    // gameLeave()
    event.preventDefault();
    // }

    event.returnValue = "";
    // alert("helo")
  };
  async function gameLeave() {
    const checkTime = JSON.parse(localStorage.getItem("timeoutState")) || false;
    await fetch(`${baseUrl}/game/leave`, {
      method: "POST",
      body: JSON.stringify({
        machineCode: game.machineCode,
        playerID: userId,
        timeout_status: checkTime,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(id);
          // setReloadStatus(false)
          localStorage.setItem("reload", false);
          // window.removeEventListener("beforeunload", handleTabClosing);
          window.removeEventListener("beforeunload", alertUser);
          window.removeEventListener("unload", handleTabClosing);
          // if (User === userId) {
          socket.disconnect();
          setTimeout(() => {
            socket.connect({ forceNew: true });
            socket.on("connect", () => {});
            socket.emit(
              JSON.stringify({
                user_id: userId,
                socket_id: socket.id,
                machineCode: game.machine_code,
              })
            );
          }, 1000);
          // setTimeoutStatus(false);
          localStorage.setItem("userJoined", JSON.stringify(false));
          // if(timeoutStatus===true){
          navigate("/prizes", { state: { category: "" } });
          setHistoryPopup(true);
          if (checkTime === false) {
            // window.location.reload();
          }
          localStorage.setItem("timeoutState", JSON.stringify(false));

          // }
        }
        // }
      );
  }

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

  const MobileFunc = () => {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }, []);
    useEffect(() => {
      console.log(id);
    }, [id]);
    useEffect(() => {
      console.log(user);
    });
    // useEffect(() => {
    //   console.log(active);
    // }, [active]);
    // useEffect(()=>{
    //   if(active===true&&setting===false){
    //     setPlayAudio(music.Pop)
    //   }
    //   else if(active===true&&setting===true){
    //     setPlayAudio(music.Chime)

    //   }
    //   console.log(setting)
    //   console.log(active)
    // },[setting,active])
    useEffect(() => {
      console.log(userId);
      console.log(user?.username);
    });

    return (
      <div className={style.mobileFullMenu}>
        <div className={style.Menu}>
          <ul style={{ pointerEvents: gamePlay === true ? "none" : "visible" }}>
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    setPlayAudio(music.Click);
                    setSetting(false);
                    setNotificationBubble(true);
                    setHistoryPopup(false);
                    setId(menu.id);
                    // eslint-disable-next-line no-lone-blocks
                    // setPlayAudio(music.Click);

                    checkGameOn();
                    setToggle(false);
                    // if(gamePlay===true){
                    if (placeId[1] === "game") {
                      setActive(true);
                    }
                    // }
                    setPageUrl(menu.url);
                    setPlayAudio(music.Click);

                    checkGameOn();
                    setToggle(false);
                    if (
                      menu.Name === "Support" &&
                      gamePlay === false &&
                      userJoined === false
                    ) {
                      // setToggle(false);
                      // handleId(e);
                      if (window.location.pathname.split("/")[1] === "") {
                        handleId(e);
                        console.log("home");
                      } else {
                        setToggle(false);
                        setIsAddress(true);
                      }
                    }

                    if (
                      menu.Name != "Support" &&
                      gamePlay === false &&
                      userJoined === false &&
                      placeId[1] !== "game"
                    ) {
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
                      menu.Name.toLowerCase() ===
                        window.location.pathname.split("/")[1] ||
                      (menu.Name === "Home" &&
                        window.location.pathname.split("/")[1] === "") ||
                      (menu.Name === "Support" &&
                        window.location.pathname.split("/")[2] === "support") ||
                      (menu.Name === "Basket" &&
                        window.location.pathname.split("/")[1] === "cart") ||
                      (menu.Name === "Cashier" &&
                        window.location.pathname.split("/")[1] === "tickets")
                        ? style.ActiveUrl
                        : style.NormalUrl
                    }
                  >
                    {menu.Name}
                  </p>
                  {menu.Badge === true &&
                  menu.item === "Basket" &&
                  notification &&
                  notification.basket_item_count > 0 &&
                  notification !== undefined ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.basket_item_count
                        ? notification && notification.basket_item_count
                        : "0"} */}
                    </span>
                  ) : (
                    ""
                  )}
                  {menu.Badge === true &&
                  menu.item === "Notifications" &&
                  notification &&
                  notification.notification_count > 0 &&
                  notification !== undefined ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.basket_item_count
                        ? notification && notification.notification_count
                        : "0"} */}
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
              setSetting(false);
              notificationbubble
                ? setNotificationBubble(false)
                : setNotificationBubble(true);
              if (gamePlay === true) {
                if (placeId[1] === "game") {
                  setActive(true);
                }
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={style.Container}>
      <Cookie />
      {/* <div className={style.Container}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
      {setting ? (
        <div
          className={style.SettingsOverlay}
          onClick={() => {
            setSetting(false);
            setNotificationBubble(true);
          }}
        ></div>
      ) : (
        ""
      )}
      {historyPopup ? (
        <div className={style.ShowCartHistory}>
          <div
            className={style.cartHistoryOverlay}
            onClick={() => {
              setHistoryPopup(false);
            }}
          ></div>
          <div className={style.CartHistory}>
            {/* <p className={style.CartTitle}>HISTORY</p> */}
            <div className={style.histoyImageDiv}>
              <img src={historyTitle} alt="" className={style.cartTitleImage} />
            </div>
            {history.length < 1 ? (
              <p className={style.historyEmptyText}>History is Empty</p>
            ) : (
              <div className={style.CartProducts}>
                {history !== undefined &&
                  history !== null &&
                  history.length > 0 &&
                  history.map((item) => {
                    console.log(item);
                    return (
                      <div className={style.CartProduct}>
                        <div className={style.CartImage}>
                          <img src={item.featured_image.large} alt="" />
                        </div>
                        <div className={style.CartContent}>
                          <p>{item.title}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {kickout === true && placeId[1] === "game" ? (
        <div className={style.kickoutPopupAll}>
          <div className={style.KickoutOverlay}></div>
          <div className={style.kickoutPopup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.KickoutMessage}>
              <p>Are you sure you want to leave this game? </p>
            </div>

            <div className={style.KickoutBtn}>
              <button
                onClick={() => {
                  gameLeave(userId, false);

                  // window.location.reload()
                  navigate("/prizes", { state: { category: "free" } });
                  setHistoryPopup(true);
                  setKickout(false);

                  // EntryRequest.replay = true;
                  // dispatch(gameEntry(EntryRequest));
                }}
              >
                {" "}
                YES
              </button>

              <button
                onClick={() => {
                  setKickout(false);
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
      {isAddress ? (
        <div className={` ${style.addressPopup}`}>
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
      <div
        className={style.MobileMenu}
        style={{ pointerEvents: gamePlay ? "none" : "visible" }}
      >
        <div className={style.Menu}>
          <div className={style.HomeMenuIcons}>
            {MainMenu.map((MMenu) => {
              return (
                <div className={style.BottomMenuIcon}>
                  <img
                    src={MMenu.icon}
                    alt=""
                    onClick={(e) => {
                      console.log(window.location.pathname.split("/")[1]);

                      setPlayAudio(music.Click);
                      setSetting(false);
                      setNotificationBubble(true);
                      setIsAddress(false);
                      setHistoryPopup(false);
                      // if(gamePlay===true){
                      if (placeId[1] === "game") {
                        setActive(true);
                      }
                      // }
                      setPageUrl(MMenu.url);
                      setPlayAudio(music.Click);

                      checkGameOn();
                      setToggle(false);
                      if (
                        MMenu.Name === "Support" &&
                        gamePlay === false &&
                        userJoined === false
                      ) {
                        console.log(window.location.pathname.split("/"));
                        console.log(
                          window.location.pathname.split("/")[1] === ""
                        );
                        if (window.location.pathname.split("/")[1] === "") {
                          MhandleId(e);
                          console.log("home");
                        } else {
                          if (
                            window.location.pathname.split("/")[1] === "game"
                          ) {
                            setActive(true);
                          } else {
                            if (isAddress == true) {
                              setIsAddress(false);
                            } else {
                              setToggle(false);
                              setIsAddress(true);
                            }
                          }
                        }
                      }

                      if (
                        MMenu.Name !== "Support" &&
                        gamePlay === false &&
                        userJoined === false &&
                        placeId[1] !== "game"
                      ) {
                        navigate(`/${MMenu.url}`);
                      }
                    }}
                  />
                  {MMenu.Badge === true &&
                  notification &&
                  notification.basket_item_count > 0 &&
                  notification !== undefined &&
                  MMenu.Name === "Basket" ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.basket_item_count
                        ? notification && notification.basket_item_count
                        : "0"} */}
                    </span>
                  ) : (
                    ""
                  )}
                  {MMenu.Badge === true &&
                  notification &&
                  notification.notification_count > 0 &&
                  MMenu.Name === "Notifications" &&
                  notification !== undefined ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.notification_count
                        ? notification && notification.notification_count
                        : "0"} */}
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
                setHistoryPopup(false)
                notificationbubble
                  ? setNotificationBubble(false)
                  : setNotificationBubble(true);
                setIsAddress(false);
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
        {notificationbubble &&
        notification &&
        notification.notification_count > 0 &&
        notification !== undefined ? (
          <span className={style.notificationBadge}>
            {/* {notification && notification.notification_count
              ? notification && notification.notification_count
              : "0"} */}
          </span>
        ) : (
          ""
        )}
        <div className={style.HamBurgerMenu}>
          {/* <div className={style.HamBurgerMenu}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
          {setting ? (
            <div className={style.Settings}>
              <AiOutlineClose
                className={style.closeIcon}
                onClick={() => {
                  setSetting(false);
                  notificationbubble
                    ? setNotificationBubble(false)
                    : setNotificationBubble(true);
                  setId("");
                }}
              />
              {/* {isUser? */}
              <ul>
                {settingsMenu.map((menu) => {
                  console.log(menu.Name === "Logout" && userId === null)
              {/* console.log("hello") */}
              {/* console.log('====================================');
              console.log(userId);
              console.log(user&&user.username);
              console.log(user&&user.username.length);
              console.log('====================================');
              console.log(menu.Name === "Logout" && userId === undefined)
              console.log(menu.Name === "Logout" && user&&user.username.length===0) 
              console.log(menu.Name === "Login/Register" && userId !== null) 
              console.log(menu.Name === "Login/Register" && userId !== undefined)
              console.log(menu.Name === "Login/Register"&&user&&user.username.length===0) */}
                  return (
                    <div
                      className={style.MenuSection}
                      // style={{margin:menu.Name==="Logout"&&userId===null||menu.Name==="Logout"&&user?.username!==""||menu.Name==="Login/Register"&&userId!==null?"0":"15px 0px",pointerEvents:gamePlay===true&&menu.Name!=="Sound"||gamePlay===true&&menu.Name!=="Music"?"none":"visible"}}
                      style={{
                        margin:
                        (menu.Name === "Logout" && userId === null) ||
                      (menu.Name === "Logout" && userId === undefined) ||
                      (menu.Name === "Logout" &&user&&user.username.length===0) ||
                      // (menu.Name === "Login/Register" && userId === null) ||
                      // (menu.Name === "Login/Register" && userId === undefined)||
                      ( (menu.Name === "Login/Register"&&user&&user.username!=="")&&
                      (menu.Name === "Login/Register"&&user&&user.username!==undefined))
                            ? "0px"
                            : "12px 0px",
                        pointerEvents:
                          (gamePlay === true && menu.Name !== "Sound") ||
                          (gamePlay === true && menu.Name !== "Music")
                            ? "none"
                            : "visible",
                      }}
                      // style={{margin:menu.Name==="Logout"&&userId===null||menu.Name==="Login/Register"&&userId!==null?"0":"15px 0px"}}
                      // style={{margin:menu.Name==="Logout"&&userId===null?"0":"15px 0px",marginBottom:userId!==null&&menu.Name==="Logout"&&menu.Name!=="Logout"?"30px":"15px"}}
                      onClick={(e) => {
                        // if(menu.Name==="Logout"){
                        console.log(userId);
                        console.log(user?.username);
                        // }
                        e.preventDefault();
                        setPlayAudio(music.Boing);
                        setSetting(false);
                        setNotificationBubble(true);
                        // if(gamePlay===true){
                        // }
                        // setPageUrl(menu.url)

                        // navigate(`/${MMenu.url}`);
                        //   if (MMenu.Name === "Support"&&gamePlay===false) {
                        //   setToggle(false);
                        //   handleId(e);
                        // }

                        // if (MMenu.Name != "Support"&&gamePlay===false) {
                        //   navigate(`/${MMenu.url}`);
                        // }

                        if(menu.Name !== "History"&&menu.Name!=="Sound"&&menu.Name!=="Music") {
                          if (placeId[1] === "game") {
                            setActive(true);
                          }
                          setPageUrl(menu.url);
                        }
                        setId(menu.id);
                        if (menu.Name === "History") {
                          console.log(placeId[1]);

                          // setKickout(true)
                          if (placeId[1] === "game") {
                            // setActive(true)
                            if (userJoined === true) {
                              // gameLeave(userId,false)
                              // setExitPopup(true)
                              setKickout(true);
                            } else {
                              setKickout(true);
                            }
                            // navigate("/prizes",{state:{category:""}})
                            // setHistoryPopup(true)
                          } else {
                            setHistoryPopup(true);
                          }
                        }
                        if (
                          (menu.Name === "Terms of Use" &&
                            gamePlay === false &&
                            userJoined === false) ||
                          (menu.Name === "Privacy Policy" &&
                            gamePlay === false &&
                            userJoined === false)
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
                        } else if (
                          menu.Name !== "Logout" &&
                          menu.Name !== "History" &&
                          gamePlay === false &&
                          userJoined === false &&
                          placeId[1] !== "game"
                        ) {
                          navigate(`/${menu.url}`);
                        }
                        if (
                          menu.Name === "Logout" &&
                          gamePlay === false &&
                          userJoined === false
                        ) {
                          e.preventDefault();
                          navigate(`${window.location.pathname}`);
                          setPopup(true);
                        }
                      }}
                    >
                      {/* if(menu.Name) */}

                      <p
                        className={
                          menu.Name.toLowerCase() ===
                            window.location.pathname.split("/")[1] ||
                          (menu.Name === "Home" &&
                            window.location.pathname.split("/")[1] === "") ||
                          (menu.Name === "Support" &&
                            window.location.pathname.split("/")[2] ===
                              "support") ||
                          (menu.Name === "Basket" &&
                            window.location.pathname.split("/")[1] ===
                              "cart") ||
                          (menu.Name === "Cashier" &&
                            window.location.pathname.split("/")[1] ===
                              "tickets")
                            ? style.ActiveUrl
                            : style.NormalUrl
                        }
                      >
                        {menu.Name === "Sound" ||
                        menu.Name === "Music" ||
                        menu.Name === "Logout" ||
                        menu.Name === "Login/Register"
                          ? ""
                          : menu.Name}
                      </p>
                      {menu.Badge === true &&
                      menu.Name === "Basket" &&
                      notification &&
                      notification.basket_item_count > 0 &&
                      notification !== undefined ? (
                        <span className={style.CartBadge}>
                          {/* {notification && notification.basket_item_count
                            ? notification && notification.basket_item_count
                            : "0"} */}
                        </span>
                      ) : (
                        ""
                      )}
                      {menu.Badge === true &&
                      menu.Name === "Notifications" &&
                      notification &&
                      notification.notification_count > 0 &&
                      notification !== undefined ? (
                        <span className={style.NotificationCount}>
                          {/* {notification && notification.notification_count
                            ? notification && notification.notification_count
                            : "0"} */}
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
                              gameMusic === 1 || gameMusic === "1"
                                ? style.ActiveSlider
                                : style.Slider
                            }
                            onClick={() => {
                              setMusicId(menu.id);
                              gameMusic === 1|| gameMusic === "1"
                                ? setGameMusic(0)
                                : setGameMusic(1);
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
                                gameMusic === 1 || gameMusic === "1"
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
                              gameSound === 1 || gameSound === 1
                                ? style.ActiveSlider
                                : style.Slider
                            }
                            onClick={() => {
                              setAudioId(menu.id);
                              gameSound === 1
                                ? setGameSound(0)
                                : setGameSound(1);
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
                                gameSound === 1 || gameSound === "1"
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
                          menu.Name.toLowerCase() ===
                            window.location.pathname.split("/")[1] ||
                          (menu.Name === "Home" &&
                            window.location.pathname.split("/")[1] === "") ||
                          (menu.Name === "Support" &&
                            window.location.pathname.split("/")[2] ===
                              "support") ||
                          (menu.Name === "Basket" &&
                            window.location.pathname.split("/")[1] ===
                              "cart") ||
                          (menu.Name === "Cashier" &&
                            window.location.pathname.split("/")[1] ===
                              "tickets")
                            ? style.ActiveUrl
                            : style.NormalUrl
                        }
                      >
                        {userId === null || (user && user.username === "")
                          ? // {userId === null&&user===null||user===undefined
                            // {userId === null&&userId.username===""||userId === undefined
                            menu.Name === "Login/Register"
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
      {setting ? (
        <div className={style.Settings}>
          {/* <div className={style.Settings}  style={{pointerEvents:gamePlay?"none":"visible"}}> */}
          <ul>
            {settingsMenu.map((menu) => {
              {/* console.log(menu.Name === "Logout" && userId === null) */}
              {/* console.log("hello") */}
              {/* console.log('====================================');
              console.log(userId);
              console.log(user&&user.username);
              console.log(user&&user.username.length);
              console.log('====================================');
              console.log(menu.Name === "Logout" && userId === undefined)
              console.log(menu.Name === "Logout" && user&&user.username.length===0) 
              console.log(menu.Name === "Login/Register" && userId !== null) 
              console.log(menu.Name === "Login/Register" && userId !== undefined)
              console.log(menu.Name === "Login/Register"&&user&&user.username.length===0) */}
              
              return (
                <div
                  className={style.MenuSection}
                  style={{
                    margin:
                      (menu.Name === "Logout" && userId === null) ||
                      (menu.Name === "Logout" && userId === undefined) ||
                      (menu.Name === "Logout" && user&&user.username === "") ||
                      // (menu.Name === "Login/Register" && userId !== null) ||
                      // (menu.Name === "Login/Register" && userId !== undefined)||
                     ( (menu.Name === "Login/Register"&&user&&user.username!=="")&&
                      (menu.Name === "Login/Register"&&user&&user.username!==undefined))
                        ? "0px"
                        : "15px 0px",
                    pointerEvents:
                      (gamePlay === true && menu.Name !== "Sound") ||
                      (gamePlay === true && menu.Name !== "Music")
                        ? "none"
                        : "visible",
                  }}
                  // style={{margin:menu.Name==="Logout"&&userId===null||menu.Name==="Logout"&&user?.username===""||menu.Name==="Logout"&&user?.username===""||menu.Name==="Login/Register"&&userId!==null||menu.Name==="Login/Register"&&user?.username!==""?"0":"15px 0px",pointerEvents:gamePlay===true&&menu.Name!=="Sound"||gamePlay===true&&menu.Name!=="Music"?"none":"visible"}}
                  onClick={(e) => {
                    if (menu.Name === "Logout") {
                      console.log(userId);
                      console.log(user?.username);
                    }
                    e.preventDefault();
                    setPlayAudio(music.Boing);

                    setSetting(false);
                    setNotificationBubble(true);
                    // if(gamePlay===true){
                    // setActive(true)
                    // }

                    // setId(menu.id);
                    // {
                    //   gamePlay === true && active === false
                    //     ? setActive(false)
                    //     : // ""
                    //       setSetting(false);
                    // }
                    if (menu.Name !== "History"&&menu.Name!=="Sound"&&menu.Name!=="Music") {
                      if (placeId[1] === "game") {
                        setActive(true);
                      }
                      setPageUrl(menu.url);
                    }
                    setId(menu.id);

                    if (
                      (menu.Name === "Terms of Use" &&
                        gamePlay === false &&
                        userJoined === false) ||
                      (menu.Name === "Privacy Policy" &&
                        gamePlay === false &&
                        userJoined === false)
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

                    // setHistoryPopup(true)
                    if (menu.Name === "History") {
                      console.log(placeId[1]);

                      // setKickout(true)
                      if (placeId[1] === "game") {
                        // setActive(true)
                        if (userJoined === true && active === true) {
                          setKickout(true);
                          // gameLeave(userId,false)
                        } else {
                          // navigate("/prizes",{state:{category:""}})
                          // setHistoryPopup(true)
                          setKickout(true);
                        }
                      } else {
                        setHistoryPopup(true);
                      }
                    }
                    if (menu.Name === "Sound" || menu.Name === "Music") {
                      // navigate(``)
                      setSetting(true);

                      // navigate(`/${menu.url}`)
                    } else if (
                      menu.Name !== "Logout" &&
                      menu.Name !== "History" &&
                      gamePlay === false &&
                      userJoined === false &&
                      placeId[1] !== "game"
                    ) {
                      navigate(`/${menu.url}`);
                    }
                    if (
                      menu.Name === "Logout" &&
                      gamePlay === false &&
                      userJoined === false
                    ) {
                      e.preventDefault();
                      navigate(`${window.location.pathname}`);
                      setPopup(true);
                    }
                  }}
                >
                  {/* if(menu.Name) */}

                  <p
                    className={
                      menu.Name.toLowerCase() ===
                        window.location.pathname.split("/")[1] ||
                      (menu.Name === "Home" &&
                        window.location.pathname.split("/")[1] === "") ||
                      (menu.Name === "Support" &&
                        window.location.pathname.split("/")[2] === "support") ||
                      (menu.Name === "Basket" &&
                        window.location.pathname.split("/")[1] === "cart") ||
                      (menu.Name === "Cashier" &&
                        window.location.pathname.split("/")[1] === "tickets")
                        ? style.ActiveUrl
                        : style.NormalUrl
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
                  {menu.Badge === true &&
                  menu.Name === "Basket" &&
                  notification &&
                  notification.basket_item_count > 0 &&
                  notification !== undefined ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.basket_item_count
                        ? notification && notification.basket_item_count
                        : "0"} */}
                    </span>
                  ) : (
                    ""
                  )}
                  {menu.Badge === true &&
                  menu.Name === "Notifications" &&
                  notification &&
                  notification.notification_count > 0 &&
                  notification !== undefined ? (
                    <span className={style.NotificationCount}>
                      {/* {notification && notification.notification_count
                        ? notification && notification.notification_count
                        : "0"} */}
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
                          gameMusic === 1 || gameMusic === 1
                            ? style.ActiveSlider
                            : style.Slider
                        }
                        onClick={() => {
                          setMusicId(menu.id);
                          gameMusic === 1
                            ? setGameMusic(0)
                            : setGameMusic(1);
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
                            gameMusic === 1 || gameMusic === "1"
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
                          gameSound === 1 || gameSound ===" 1"
                            ? style.ActiveSlider
                            : style.Slider
                        }
                        onClick={() => {
                          setAudioId(menu.id);
                          gameSound === 1 || gameSound ===" 1"
                            ? setGameSound(0)
                            : setGameSound(1);
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
                            gameSound === 1 || gameSound === "1"
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
                      menu.Name.toLowerCase() ===
                        window.location.pathname.split("/")[1] ||
                      (menu.Name === "Home" &&
                        window.location.pathname.split("/")[1] === "") ||
                      (menu.Name === "Support" &&
                        window.location.pathname.split("/")[2] === "support") ||
                      (menu.Name === "Basket" &&
                        window.location.pathname.split("/")[1] === "cart") ||
                      (menu.Name === "Cashier" &&
                        window.location.pathname.split("/")[1] === "tickets")
                        ? style.ActiveUrl
                        : style.NormalUrl
                    }
                  >
                    {userId === null || (user && user.username === "")
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
      {/* <audio ref={audioRef}></audio> */}
      {playAudio?
      <PlaySound setPlayAudio={setPlayAudio} src={playAudio} gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound}/>
    :""}
      <div
        className={style.MobileTopNav}
        style={{ pointerEvents: gamePlay ? "none" : "visible" }}
      >
        <div
          className={style.MLogo}
          style={{zIndex:setting===true&&"0"}}
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
          <img
            src={logo}
            alt=""
            onClick={(e) => {
              console.log("clicked");
              console.log(gamePlay);
              console.log(userJoined);
              console.log(active);
              e.preventDefault();
              //
              setPageUrl("");
              {
                if (placeId[1] === "game") {
                  setActive(true);
                }
                // }
                setPageUrl("");
                // if(gamePlay===true){
                if (placeId[1] === "game") {
                  setActive(true);
                }
                // }
                if (
                  gamePlay === false &&
                  userJoined === false &&
                  placeId[1] !== "game"
                ) {
                  navigate("/");
                }
              }
            }}
          />
        </div>
        <div className={style.MBandaiLogo}>
          <img src={bandaiLogo} alt=""  onClick={()=>{
            window.open("http://www.bandainamco-am.co.uk/")
          }}/>
        </div>
        <div className={style.MCredits}>
          <div className={style.MTicket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.MPoints}>
            <p>{(user && user.point) || "0"}</p>
          </div>
          <div className={style.MPlus}>
            <button
              onClick={() => {
                // navigate("/tickets")
                setPageUrl("/tickets");
                {
                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  setPageUrl("/tickets");
                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  if (
                    gamePlay === false &&
                    userJoined === false &&
                    placeId[1] !== "game"
                  ) {
                    navigate("/tickets");
                    setPlayAudio(music.Click);
                  }
                }
              }}
            >
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
                  e.preventDefault();

                  handleLogout(e);
                }}
              >
                YES
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();

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
      {toggle ? <MobileFunc /> : ""}

      <div className={style.Header}>
        {/* <div className={style.Header} style={{pointerEvents:gamePlay?"none":"visible"}}> */}
        <div className={style.Logo}>
          <button>
            <img
              src={logo}
              alt=""
              onClick={(e) => {
                console.log("clicked");
                console.log(gamePlay);
                console.log(userJoined);
                console.log(active);
                e.preventDefault();
                //
                setPageUrl("");
                {
                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  // }
                  setPageUrl("");
                  // if(gamePlay===true){
                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  // }
                  if (
                    gamePlay === false &&
                    userJoined === false &&
                    placeId[1] !== "game"
                  ) {
                    navigate("/");
                  }
                }
              }}
            />
          </button>
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" onClick={()=>{
            window.open("http://www.bandainamco-am.co.uk/")
          }}/>
        </div>
        <div className={style.Menu}>
          <ul style={{ pointerEvents: gamePlay === true ? "none" : "visible" }}>
            {/* desktop main header */}
            {MainMenu.map((menu) => {
              return (
                <div
                  className={style.MenuSection}
                  onClick={(e) => {
                    setPlayAudio(music.Click);
                    // console.log(music)
                    setSetting(false);
                    setNotificationBubble(true);
                    setId(menu.id);

                    // if(gamePlay===true){
                    if (placeId[1] === "game") {
                      setActive(true);
                    }
                    // }
                    setPageUrl(menu.url);
                    // playAudio(music.Click);

                    checkGameOn();
                    setToggle(false);
                    if (
                      menu.Name === "Support" &&
                      gamePlay === false &&
                      userJoined === false
                    ) {
                      if (window.location.pathname.split("/")[1] === "") {
                        handleId(e);
                        console.log("home");
                      } else {
                        if (window.location.pathname.split("/")[1] === "game"){
                          setActive(true);
                        }
                        else{
                          setToggle(false);
                          setIsAddress(true);
                        }
                       
                      }
                    }

                    if (
                      menu.Name != "Support" &&
                      gamePlay === false &&
                      userJoined === false &&
                      placeId[1] !== "game"
                    ) {
                      navigate(`/${menu.url}`);
                    }
                  }}
                >
                  <p
                    className={
                      menu.Name.toLowerCase() ===
                        window.location.pathname.split("/")[1] ||
                      (menu.Name === "Home" &&
                        window.location.pathname.split("/")[1] === "") ||
                      (menu.Name === "Support" &&
                        window.location.pathname.split("/")[2] === "support") ||
                      (menu.Name === "Basket" &&
                        window.location.pathname.split("/")[1] === "cart") ||
                      (menu.Name === "Cashier" &&
                        window.location.pathname.split("/")[1] === "tickets")
                        ? style.ActiveUrl
                        : style.NormalUrl
                    }
                  >
                    {menu.Name}
                  </p>
                  {menu.Badge === true &&
                  menu.Name === "Basket" &&
                  notification !== undefined &&
                  notification &&
                  notification.basket_item_count > 0 ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.basket_item_count
                        ? notification && notification.basket_item_count
                        : "0"} */}
                    </span>
                  ) : (
                    ""
                  )}
                  {menu.Badge === true &&
                  menu.Name === "Notifications" &&
                  notification &&
                  notification.notification_count > 0 &&
                  notification !== undefined ? (
                    <span className={style.CartBadge}>
                      {/* {notification && notification.notification_count
                        ? notification && notification.notification_count
                        : "0"} */}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </ul>
        </div>
        {userId !== null || user !== null || user !== undefined ? (
          <div className={style.Credits}>
            <div className={style.Ticket}>
              <img src={ticket} alt="" />
            </div>
            <div className={style.Points}>
              <p>{(user && user.point) || "0"}</p>
            </div>
            {/* <Link to="/tickets"> */}
            <div className={style.Plus}>
              <button
                onClick={() => {
                  setPageUrl("tickets");

                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  // }
                  // setPageUrl("tickets")
                  // if(gamePlay===true){
                  if (placeId[1] === "game") {
                    setActive(true);
                  }
                  // }
                  if (
                    gamePlay === false &&
                    userJoined === false &&
                    placeId[1] !== "game"
                  ) {
                    navigate("/tickets");
                  }
                }}
              >
                <img src={plus} alt="" />
              </button>
            </div>
            {/* </Link> */}
          </div>
        ) : (
          ""
        )}
        {userId !== null && user && user.username !== "" ? (
          // {userId !== null||user!==null||user!==undefined?
          // {userId!==null||userId!==""||userId!==undefined||user?.username!==""?
          <div className={style.Profile}>
            <p className={style.Username}>
              {(user && user.username) || "username"}
            </p>
            <div className={style.HamBurgerMenu}>
              {notificationbubble &&
              notification &&
              notification.notification_count > 0 &&
              notification !== undefined ? (
                <span className={style.notificationBadge}>
                  {/* {notification && notification.notification_count
                    ? notification && notification.notification_count
                    : "0"} */}
                </span>
              ) : (
                ""
              )}
              <FiMenu
                onClick={() => {
                  // setSetting(true)
                  setting ? setSetting(false) : setSetting(true);
                  notificationbubble
                    ? setNotificationBubble(false)
                    : setNotificationBubble(true);
                }}
              />
              {setting ? "" : ""}
            </div>
          </div>
        ) : (
          <div className={style.Profile}>
            <p
              className={style.LoginRegister}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </p>
            <p
              className={style.LoginRegister}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </p>
            <div className={style.HamBurgerMenu}>
              <FiMenu
                onClick={() => {
                  // setSetting(true)
                  setting ? setSetting(false) : setSetting(true);
                }}
              />
              {setting ? "" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
