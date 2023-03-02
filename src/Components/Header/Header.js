import React, { useState } from "react";
import style from "./Header.module.css";
import logo from "../../assests/Wincha Icon.png";
import { FiMenu } from "react-icons/fi";
import ticket from "../../assests/Floating Tab Gold Ticket.png";
import plus from "../../assests/Header Add Value.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [setting, setSetting] = useState(false);
  const { user } = useSelector((state) => state.userData);
  const navigate = useNavigate();
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
  return (
    <div className={style.Container}>
      <div className={style.Header}>
        <div className={style.Logo}>
          <img src={logo} alt="" />
        </div>
        <div className={style.Menu}>
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/prizes">
              <li>Prizes</li>
            </Link>
            <li
              onClick={(e) => {
                handleId(e);
              }}
            >
              Support
            </li>
            {/* <li onClick={(e)=>{
              e.preventDefault()
              window.location.href = "/#support"
            }}>Support</li> */}
            <Link to="/cart">
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
                {user?
                <ul>
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <Link to="">
                    <li>Music</li>
                  </Link>
                  <Link to="">
                    <li>Sound</li>
                  </Link>
                  <Link to="/notification">
                    <li>Notifications</li>
                  </Link>
                  <Link to="/tickets">
                    <li>Cashier</li>
                  </Link>
                  <Link to="/faq">
                    {" "}
                    <li>FAQ</li>
                  </Link>
                  <Link to="">
                    <li>Terms of Use</li>
                  </Link>
                  <Link to="">
                    <li>Privacy Policy</li>
                  </Link>
                  <Link to="/logout" onClick={(e)=>{
                    handleLogout(e)
                  }}>
                    <li>Logout</li>
                  </Link>
                  {/* {user?<Link to="/logout"><li>Logout</li></Link>:<Link to="/login"><li>Login</li></Link>} */}
                </ul>:
                <ul>
                <Link to="">
                  <li>Music</li>
                </Link>
                <Link to="">
                  <li>Sound</li>
                </Link>
                <Link to="/tickets">
                  <li>Cashier</li>
                </Link>
                <Link to="/faq">
                  {" "}
                  <li>FAQ</li>
                </Link>
                <Link to="">
                  <li>Terms of Use</li>
                </Link>
                <Link to="">
                  <li>Privacy Policy</li>
                </Link>
                <Link to="/login">
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
