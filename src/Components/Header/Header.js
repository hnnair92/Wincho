/* eslint-disable no-lone-blocks */
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
const Header = ({setActive,active,setGamePlay,gamePlay}) => {
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
    console.log(active,"active from description")
  },[active])
  useEffect(()=>{
    inGame = localStorage.getItem('inGame')
    if(inGame===null||inGame===undefined){
      localStorage.setItem("inGame",false)
    }
  },[localStorage])
  useEffect(()=>{
    dispatch(updateProfile(userData.user))

  },[dispatch])
  useEffect(()=>{
    console.log(gamePlay,"gamePlay status")
    console.log(active,"active status")
  })
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
      //       <button  onClick={()=>{
              // {gamePlay===true?
              //   setActive(true)
              //   :
               
      //         console.log("cancelled");
              
      //       }}}>CANCEL</button>
      //       <button  onClick={()=>{
              // {gamePlay===true?
              //   setActive(true)
              //   :
               
      //         // callback(false)
      //         console.log("Exits");

      //       }}}>OK</button>
      //       {/* <button
      //         to="/tickets"
      //         onClick={() => {
      //           setTopup(false);
      //         }}
      //       >
      //         <button>TOP UP</button>
      //       </button> */}
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
            <button   onClick={()=>{


            }}><li>Home</li></button>
            {/* {inGame? */}
            <button onClick={()=>{
              // eslint-disable-next-line no-lone-blocks
              {gamePlay===true?
                setActive(true)
                :
               navigate("/prizes");
              //  
              checkGameOn()
              console.log("clicked Home")

              
              // setSetting(false)

            }}}><li>Prizes</li></button>
            {/* <button to="/"  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
              setToggle(false)
            }}}><li>Search</li></button> */}
            <button  onClick={(e)=>{
              setToggle(false)
              handleId(e)
            }}><li>Support</li></button>
            <button  onClick={()=>{
              // eslint-disable-next-line no-lone-blocks
              {gamePlay===true?
                setActive(true)
                :
                navigate("/cart");
               
              setToggle(false)
            }}}><li
            //  onMouseOver={()=>{
            //   console.log("entered")
            // }} onMouseLeave={()=>{
            //   console.log("leaved")
            // }}
            >Basket</li></button>
          </ul>
        </div>
        
        <div className={style.close}>
            <AiOutlineClose className={style.closeIcon}  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
              setToggle(false)
            }}}/>
        </div>
      </div>
    )
  }
   
  return (
    <div className={style.Container}>
      <div className={style.MobileBottomNav}>
        <ul>
          <li><img src="" alt="" /></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {active?<div className={style.PopupContainer}>
            <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Do you want to exit the game</p>
          </div>
          <div className={style.popupButton}>
            <button  onClick={()=>{
              {gamePlay===true?
                setActive(false)
                :
               
              console.log("cancelled");
              
            }}}>CANCEL</button>
            <button  onClick={()=>{
              // {gamePlay===true?
              //   setActive(true)
              //   :
               navigate("/prizes")
              // callback(false)
              setActive(false);
              setGamePlay(false);
              console.log("Exits");

            }}>OK</button>
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
              <HiMenu className={style.menuIcon}  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setToggle(true)}
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
                <AiOutlineClose className={style.closeIcon}  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}/>
                {isUser?
                <ul>
                  <button >
                    <li  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               navigate('/profile')
                setSetting(false)
              }}}>Profile</li>
                  </button>
                  <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                    <li>Music</li>
                  </button>
                  <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                    <li>Sound</li>
                  </button>
                  <button   onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/notification')
               
                setSetting(false)
              }}}>
                    <li>Notifications</li>
                  </button>
                  <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/tickets')
               
                setSetting(false)
              }}}>
                    <li>Cashier</li>
                  </button>
                  <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/faq')
               
                setSetting(false)
              }}}>
                    {/* {" "} */}
                    <li>FAQ</li>
                  </button>
                  <button to={`${configuration.terms}`}  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.terms}`)
                window.open(`${configuration.terms}`,'_blank')
               
                setSetting(false)
              }}}>
                    <li>Terms of Use</li>
                  </button>
                  <button to={`${configuration.policy}`}   onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.policy}`)
                window.open(`${configuration.policy}`,'_blank')

               
                setSetting(false)
              }}}>
                    <li>Privacy Policy</li>
                  </button>
                  <button    onClick={(e)=>{
                    setSetting(false)
                    setPopup(true)
                  }}>
                    <li>Logout</li>
                  </button>
                  {/* {user?<button to="/logout"><li>Logout</li></button>:<button to="/login"><li>Login</li></button>} */}
                </ul>:
                <ul>
                <button>
                  <li>Music</li>
                </button>
                <button>
                  <li>Sound</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/tickets')
               
                setSetting(false)
              }}}>
                  <li>Cashier</li>
                </button>
                <button   onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/faq')
               
                setSetting(false)
              }}}>
                  {/* {" "} */}
                  <li>FAQ</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.terms}`)
                window.open(`${configuration.terms}`,'_blank')

               
                setSetting(false)
              }}}>
                  <li>Terms of Use</li>
                </button>
                <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                window.open(`${configuration.policy}`,'_blank')
                // navigate()
               
                setSetting(false)
              }}}>
                  <li>Privacy Policy</li>
                </button>
                <button to="/login"  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/login')
               
                setSetting(false)
              }}}>
                  <li>Login/Register</li>
                </button>
                {/* <button to="/register">
                  <li>Sigin</li>
                </button> */}
                {/* {user?<button to="/logout"><li>Logout</li></button>:<button to="/login"><li>Login</li></button>} */}
              </ul>}
              </div>
            ) : (
              ""
            )}
          </div>
         
        </div>}
        
      <div className={style.Header}>
        <div className={style.Logo}>
        <button onClick={()=>{
          {gamePlay===true?
            setActive(true)
          
          :
            setActive(false);
            navigate("/")
          }
        }}><img src={logo} alt="" /></button>
          
        </div>
        <div className={style.bandaiLogo}>
          <img src={bandaiLogo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul>
            <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               navigate("/")
                setSetting(false)
              console.log("clicked Home")


            }}}>
              <li>Home</li>
            </button>
            {/* {inGame===false? */}
            <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              console.log("clicked Home")
              navigate("/prizes");

            }}}>
              <li>Prizes</li>
            </button>
            <li
              onClick={(e) => {
                {gamePlay===true?
                setActive(true)
                :
                handleId(e);
                setSetting(false)
                }
              }}
            >
              Support
            </li>
            {/* <li onClick={(e)=>{
              e.preventDefault()
              window.location.href = "/#support"
            }}}>Support</li> */}
            <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate("/cart");
                setSetting(false)

            }}}>
              <li>Basket</li>
            </button>
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
            <button>
              <img src={plus} alt="" />
            </button>
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
                  <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/profile')
               
                setSetting(false)
              }}}>
                    <li>Profile</li>
                  </button>
                  <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                    <li>Music</li>
                  </button>
                  <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                    <li>Sound</li>
                  </button>
                  <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/notification')
               
                setSetting(false)
              }}}>
                    <li>Notifications</li>
                  </button>
                  <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/tickets')
               
                setSetting(false)
              }}}>
                    <li>Cashier</li>
                  </button>
                  <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                navigate('/faq')
                setSetting(false)
              }}}>
                    {/* {" "} */}
                    <li>FAQ</li>
                  </button>
                  <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.terms}`)
                window.open(`${configuration.terms}`,'_blank')
               
                setSetting(false)
              }}}>
                    <li>Terms of Use</li>
                  </button>
                  <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.policy}`)
                window.open(`${configuration.policy}`,'_blank')

               
                setSetting(false)
              }}}>
                    <li>Privacy Policy</li>
                  </button>
                  <button    onClick={(e)=>{
                    {gamePlay===true?
                    setActive(true)
                    :
                    setSetting(false)
                    setPopup(true)
                    }
                  }}>
                    <li>Logout</li>
                  </button>
                  {/* {user?<button to="/logout"><li>Logout</li></button>:<button to="/login"><li>Login</li></button>} */}
                </ul>:
                <ul>
                <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                  <li>Music</li>
                </button>
                <button     onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
               
                setSetting(false)
              }}}>
                  <li>Sound</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/tickets')
               
                setSetting(false)
              }}}>
                  <li>Cashier</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate('/faq')
               
                setSetting(false)
              }}}>
                  {" "}
                  <li>FAQ</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.terms}`)
                window.open(`${configuration.terms}`,'_blank')
               
                setSetting(false)
              }}}>
                  <li>Terms of Use</li>
                </button>
                <button onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                // navigate(`${configuration.policy}`)
                window.open(`${configuration.policy}`,'_blank')

               
                setSetting(false)
              }}}>
                  <li>Privacy Policy</li>
                </button>
                <button  onClick={()=>{
              {gamePlay===true?
                setActive(true)
                :
                navigate("/login")
               
                setSetting(false)
              }}}>
                  <li>Login/Register</li>
                </button>
                {/* <button to="/register">
                  <li>Sigin</li>
                </button> */}
                {/* {user?<button to="/logout"><li>Logout</li></button>:<button to="/login"><li>Login</li></button>} */}
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
