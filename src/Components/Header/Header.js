import React, { useState,useEffect } from "react";
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
import {assets} from '../Description/assests'
import { updateProfile } from "../../actions/user";
import bandaiLogo from '../../assests/Bandai Namco Logo.png'

// import { useSelector } from 'react-redux'
const Header = () => {
  const dispatch = useDispatch()
  const[popup,setPopup]=useState(false)
  const [leave,setLeave] = useState(false)
  const [setting, setSetting] = useState(false);
  const userData = useSelector((state) => state.userData);
  const {user} = useSelector((state) => state.profile);
  const isUser = JSON.parse(localStorage.getItem("user"))
  const { configuration } = useSelector((state) => state.configuration);
  const navigate = useNavigate();
  let inGame = localStorage.getItem("inGame")
  console.log(inGame)
  useEffect(()=>{
    inGame = localStorage.getItem('inGame')
    if(inGame===null||inGame===undefined){
      localStorage.setItem("inGame",false)
    }
  },[localStorage])
  useEffect(()=>{
    dispatch(updateProfile(userData.user))

  },[dispatch])
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
  const handleLogout =(e)=>{
    e.preventDefault()
    localStorage.removeItem("user")
    navigate("/")
    window.location.reload()
  }
  function checkGameOn(){
  inGame = localStorage.getItem("inGame")

    if(inGame===true){
      // return(
      //   <div className={style.PopupContainer}>
      //       <div className={style.popup}>
      //     <div className={style.popupImage}>
      //       <img src={assets.winchaPopup} alt="" />
      //     </div>
      //     <div className={style.popupText}>
      //       <p>Woah there you haven't got enough tickets</p>
      //     </div>
      //     <div className={style.popupButton}>
      //       <button onClick={()=>{
      //         console.log("cancelled");
              
      //       }}>CANCEL</button>
      //       <button onClick={()=>{
      //         // callback(false)
      //         console.log("Exits");

      //       }}>OK</button>
      //       {/* <Link
      //         to="/tickets"
      //         onClick={() => {
      //           setTopup(false);
      //         }}
      //       >
      //         <button>TOP UP</button>
      //       </Link> */}
      //     </div>
      //   </div>
      //   </div>
      // )
      setLeave(true)
    }
    else{
      setLeave(false)
    }
   }
  const[toggle,setToggle] = useState(false)
  const MobileFunc=()=>{
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return ()=> document.body.style.overflow = 'unset';
   }, []);
   
    return(
      <div className={style.mobileFullMenu}>
      <div className={style.Menu}>
          <ul>
            <Link to="/" onClick={()=>{
              checkGameOn()
              console.log("clicked Home")

              
              // setSetting(false)

            }}><li>Home</li></Link>
            {/* {inGame? */}
            <Link to="/prizes" onClick={()=>{
              checkGameOn()
              console.log("clicked Home")

              
              // setSetting(false)

            }}><li>Prizes</li></Link>
            {/* <Link to="/" onClick={()=>{
              setToggle(false)
            }}><li>Search</li></Link> */}
            <Link to="/" onClick={(e)=>{
              setToggle(false)
              handleId(e)
            }}><li>Support</li></Link>
            <Link to="/cart" onClick={()=>{
              setToggle(false)
            }}><li
            //  onMouseOver={()=>{
            //   console.log("entered")
            // }} onMouseLeave={()=>{
            //   console.log("leaved")
            // }}
            >Basket</li></Link>
          </ul>
        </div>
        
        <div className={style.close}>
            <AiOutlineClose className={style.closeIcon} onClick={()=>{
              setToggle(false)
            }}/>
        </div>
      </div>
    )
  }
   
  return (
    <div className={style.Container}>
      {leave?<div className={style.PopupContainer}>
            <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Woah there you haven't got enough tickets</p>
          </div>
          <div className={style.popupButton}>
            <button onClick={()=>{
              console.log("cancelled");
              
            }}>CANCEL</button>
            <button onClick={()=>{
              // callback(false)
              console.log("Exits");

            }}>OK</button>
            {/* <Link
              to="/tickets"
              onClick={() => {
                setTopup(false);
              }}
            >
              <button>TOP UP</button>
            </Link> */}
          </div>
        </div>
        </div>:""}
    {popup?
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
                  handleLogout(e)
              }}
            >
              YES
            </button>
            <button
              onClick={() => {
                  setPopup(false)
              }}
            >
              NO
            </button>
        
      </div>
    </div>
    </div>:
    ""}
      {toggle? 
          
          <MobileFunc/>:<div className={style.MobileMenu}>
          <div className={style.Menu}>
              <HiMenu className={style.menuIcon} onClick={()=>{
                setToggle(true)
              }}/>
              {/* <p>GAME</p> */}
              {/* <img src={Logo} alt="" /> */}
          </div>
          <div className={style.HamBurgerMenu}>
            <MdOutlineSettings
              onClick={() => {
                // setSetting(true)
                setting ? setSetting(false) : setSetting(true);
              }}
            />
            {setting ? (
              <div className={style.Settings}>
                <AiOutlineClose className={style.closeIcon} onClick={()=>{
                setSetting(false)
              }}/>
                {isUser?
                <ul>
                  <Link to="/profile" >
                    <li onClick={()=>{
                setSetting(false)
              }}>Profile</li>
                  </Link>
                  <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Music</li>
                  </Link>
                  <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Sound</li>
                  </Link>
                  <Link to="/notification" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Notifications</li>
                  </Link>
                  <Link to="/tickets" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Cashier</li>
                  </Link>
                  <Link to="/faq" onClick={()=>{
                setSetting(false)
              }}>
                    {" "}
                    <li>FAQ</li>
                  </Link>
                  <Link to={`${configuration.terms}`} onClick={()=>{
                setSetting(false)
              }}>
                    <li>Terms of Use</li>
                  </Link>
                  <Link to={`${configuration.policy}`}  onClick={()=>{
                setSetting(false)
              }}>
                    <li>Privacy Policy</li>
                  </Link>
                  <Link to="" onClick={(e)=>{
                    setSetting(false)
                    setPopup(true)
                  }}>
                    <li>Logout</li>
                  </Link>
                  {/* {user?<Link to="/logout"><li>Logout</li></Link>:<Link to="/login"><li>Login</li></Link>} */}
                </ul>:
                <ul>
                <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Music</li>
                </Link>
                <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Sound</li>
                </Link>
                <Link to="/tickets" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Cashier</li>
                </Link>
                <Link to="/faq" onClick={()=>{
                setSetting(false)
              }}>
                  {" "}
                  <li>FAQ</li>
                </Link>
                <Link to={`${configuration.terms}`} onClick={()=>{
                setSetting(false)
              }}>
                  <li>Terms of Use</li>
                </Link>
                <Link to={`${configuration.policy}`} onClick={()=>{
                setSetting(false)
              }}>
                  <li>Privacy Policy</li>
                </Link>
                <Link to="/login" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Login/Register</li>
                </Link>
                {/* <Link to="/register">
                  <li>Sigin</li>
                </Link> */}
                {/* {user?<Link to="/logout"><li>Logout</li></Link>:<Link to="/login"><li>Login</li></Link>} */}
              </ul>}
              </div>
            ) : (
              ""
            )}
          </div>
         
        </div>}
        
      <div className={style.Header}>
        <div className={style.Logo}>
        <Link to="/"><img src={logo} alt="" /></Link>
          
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul>
            <Link to="/" onClick={()=>{
                setSetting(false)
              console.log("clicked Home")


            }}>
              <li>Home</li>
            </Link>
            {/* {inGame===false? */}
            <Link to="/prizes" onClick={()=>{
                setSetting(false)
              console.log("clicked Home")


            }}>
              <li>Prizes</li>
            </Link>
            <li
              onClick={(e) => {
                handleId(e);
                setSetting(false)
              }}
            >
              Support
            </li>
            {/* <li onClick={(e)=>{
              e.preventDefault()
              window.location.href = "/#support"
            }}>Support</li> */}
            <Link to="/cart" onClick={()=>{
                setSetting(false)

            }}>
              <li>Basket</li>
            </Link>
          </ul>
        </div>
        <div className={style.Credits}>
          <div className={style.Ticket}>
            <img src={ticket} alt="" />
          </div>
          <div className={style.Points}>
            <p>{user&&user.point||"0"}</p>
          </div>
          <div className={style.Plus}>
            <Link to="/tickets">
              <img src={plus} alt="" />
            </Link>
          </div>
        </div>
        <div className={style.Profile}>
          <p>{user&&user.username||"username"}</p>
          <div className={style.HamBurgerMenu}>
            <FiMenu
              onClick={() => {
                // setSetting(true)
                setting ? setSetting(false) : setSetting(true);
              }}
            />
            {setting ? (
              <div className={style.Settings}>
                {isUser?
                <ul>
                  <Link to="/profile" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Profile</li>
                  </Link>
                  <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Music</li>
                  </Link>
                  <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Sound</li>
                  </Link>
                  <Link to="/notification" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Notifications</li>
                  </Link>
                  <Link to="/tickets" onClick={()=>{
                setSetting(false)
              }}>
                    <li>Cashier</li>
                  </Link>
                  <Link to="/faq" onClick={()=>{
                setSetting(false)
              }}>
                    {" "}
                    <li>FAQ</li>
                  </Link>
                  <Link to={`${configuration.terms}`} onClick={()=>{
                setSetting(false)
              }}>
                    <li>Terms of Use</li>
                  </Link>
                  <Link to={`${configuration.policy}`}  onClick={()=>{
                setSetting(false)
              }}>
                    <li>Privacy Policy</li>
                  </Link>
                  <Link to="" onClick={(e)=>{
                    setSetting(false)
                    setPopup(true)
                  }}>
                    <li>Logout</li>
                  </Link>
                  {/* {user?<Link to="/logout"><li>Logout</li></Link>:<Link to="/login"><li>Login</li></Link>} */}
                </ul>:
                <ul>
                <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Music</li>
                </Link>
                <Link to="" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Sound</li>
                </Link>
                <Link to="/tickets" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Cashier</li>
                </Link>
                <Link to="/faq" onClick={()=>{
                setSetting(false)
              }}>
                  {" "}
                  <li>FAQ</li>
                </Link>
                <Link to={`${configuration.terms}`} onClick={()=>{
                setSetting(false)
              }}>
                  <li>Terms of Use</li>
                </Link>
                <Link to={`${configuration.policy}`}  onClick={()=>{
                setSetting(false)
              }}>
                  <li>Privacy Policy</li>
                </Link>
                <Link to="/login" onClick={()=>{
                setSetting(false)
              }}>
                  <li>Login/Register</li>
                </Link>
                {/* <Link to="/register">
                  <li>Sigin</li>
                </Link> */}
                {/* {user?<Link to="/logout"><li>Logout</li></Link>:<Link to="/login"><li>Login</li></Link>} */}
              </ul>}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
