import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Header.module.css'
import appStore from '../../assests/pngwing.com (4).png'
import ticket from '../../assests/golden-ticket.png'
import penguin from '../../assests/penguin.png'
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux'
import Logo from '../../assests/Wincha Icon.png'
const Header = () => {
  const {user,authenticated,loading} = useSelector((state)=>state.userData)
  const[toggle,setToggle] = useState(false)
  console.log("header data",user)
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
              setToggle(false)
            }}><li>Home</li></Link>
            <Link to="/" onClick={()=>{
              setToggle(false)
            }}><li>Prizes</li></Link>
            <Link to="/" onClick={()=>{
              setToggle(false)
            }}><li>Search</li></Link>
            <Link to="/" onClick={()=>{
              setToggle(false)
            }}><li>Support</li></Link>
            <Link to="/" onClick={()=>{
              setToggle(false)
            }}><li>Basket</li></Link>
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
    <Fragment>
      <div className={style.Container}>

        {toggle? <MobileFunc/>:<div className={style.MobileMenu}>
        <div className={style.Menu}>
            <HiMenu className={style.menuIcon} onClick={()=>{
              setToggle(true)
            }}/>
            {/* <p>GAME</p> */}
            {/* <img src={Logo} alt="" /> */}
        </div>
        <div className={style.Credits}>
        <div className={style.ticket}>
              <img src={ticket} alt="" />
            </div>
            <p className={style.creditsPrice}>{user&&user.point}</p>
        </div>
      </div>}
      
      {/* : */}
      <div className={style.Header}>
        <div className={style.Logo}>
            <div className={style.LogoImg}>
              <img src={Logo} alt="" />
              {/* <p>W</p> */}
            </div>
            <div className={style.PlaystoreIcon}>
              <img src={appStore} alt="" />
            </div>
        </div>
        <div className={style.Menu}>
          <ul>
            {/* {menus.map((menu)=>{
                return(
                  <Link path={`${menu.path}`}>{menu.title}</Link>
                )
            })} */}
            <Link to="/"><li>Home</li></Link>
            <Link to="/"><li>Prizes</li></Link>
            <Link to="/"><li>Search</li></Link>
            <Link to="/"><li>Support</li></Link>
            <Link to="/"><li>Basket</li></Link>
          </ul>
        </div>
        {authenticated?<div className={style.UserLogged}>
        
        <div className={style.Credits}>
          <div className={style.ticket}>
            <img src={ticket} alt="" />
          </div>
          <p className={style.creditsPrice}>{user&&user.point}</p>
        </div>
        <div className={style.Profile}>
          <img src={penguin} alt="" />
          <p>{user&&user.username}</p>
        </div>
      </div>:<div className={style.User}>
        <div className={style.Profile}>
          <img src={penguin} alt="" />
          <Link to="/login">Login</Link>
        </div>
      </div>}
        {/* <div className={style.User}>
        
          <div className={style.Credits}>
            <div className={style.ticket}>
              <img src={ticket} alt="" />
            </div>
            <p className={style.creditsPrice}>{user&&user.point}</p>
          </div>
          <div className={style.Profile}>
            <img src={penguin} alt="" />
            <p>{user&&user.username}</p>
          </div>
        </div> */}
      </div>
      {/* } */}
      </div>
        
       
    </Fragment>
    
  )
}

export default Header