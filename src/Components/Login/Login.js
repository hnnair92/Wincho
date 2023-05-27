import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import Banner from "../../assests/Wincha Image Asset.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, updateProfile } from "../../actions/user";
import eye from "../../assests/Password Eye.png";
import info from "../../assests/Information Icon.png";
import icon from "../../assests/Wincha Support Icon.png";
import { baseUrl } from "../url";
const Login = () => {
  // const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, authenticated } = useSelector((state) => state.profile);
  const { error } = useSelector((state) => state.userData);
  // const userId = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"))

  const [type, setType] = useState(true);
  const [passIcon, setPassIcon] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [passError, setPassError] = useState({});
  useEffect(()=>{
    if(user&&user.username!==""){
      navigate("/")
    }else {
      navigate("/login");
    }
  },[user])
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(updateProfile(userId));
    }
    if (localStorage.getItem("user")) {
      navigate("/");
    } else {
      navigate("/login");
    }
    console.log(user)
  }, [dispatch, userId]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    const data = {
      username: username,
      password: password,
    };
    e.preventDefault();
    dispatch(loginAction(data));
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/user/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
                    "access-token":`${token}`
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail("");
        setPassError(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.Container}>
      {passIcon ? (
        <div className={style.popup}>
          <div className={style.image}>
            <img src={icon} alt="" />
          </div>
          <div className={style.content}>
            <ul>
            <p>Password must include:</p>
              <li>8-20 Characters</li>
              <li>At least 1 capital letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
              <li>No spaces</li>
            </ul>
          </div>
          <div className={style.action}>
            <button
              onClick={(e) => {
                setPassIcon(false);
                // forgotPass?forgotPassword(e):setPassIcon(false)
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : forgotPass ? (
        <div className={style.popup}>
          <div className={style.image}>
            <img src={icon} alt="" />
          </div>
          <div className={style.content}>
            <div className={style.forgotEmail}>
              <p>Enter your account email to receive a password reset</p>
              <div className={style.forgotInput}>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter Email"
                />
              </div>
              <p className={style.PasswordError}>
                {passError.status
                  ? "Reset Link has been sent to the mail"
                  : passError.status === false
                  ? "User does not exist"
                  : ""}
              </p>
            </div>
          </div>
          <div className={style.Forgotaction}>
            <button
              onClick={(e) => {
                setForgotPass(false);
              }}
            >
              CANCEL
            </button>
            <button
              onClick={(e) => {
                forgotPassword(e);
              }}
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={style.Login}>
        <div className={style.Right}>
          <form action="" className={style.form} onSubmit={handleLogin}>
            {error && error.status === "False" ? (
              <p className={style.loginError}>invalid Credentials</p>
            ) : (
              ""
            )}
            <div className={style.EmailInput}>
              {/* <label htmlFor="Username">Username</label> */}
              <input
                type="text"
                name=""
                id="Username"
                value={username}
                className={style.email}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={style.email}>
              <div className={style.info}>
                <img
                  src={info}
                  alt=""
                  onClick={() => {
                    setPassIcon(true);
                  }}
                />
              </div>
              {/* <label htmlFor="password">Password</label> */}
              <input
                type={type ? "password" : "text"}
                name=""
                id="password"
                className={style.passwordInput}
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className={style.eye}>
                <img
                  src={eye}
                  alt=""
                  onClick={() => {
                    type ? setType(false) : setType(true);
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className={style.ForgotPassword}
              onClick={(e) => {
                setForgotPass(true);
                // setPassIcon(true)
              }}
            >
              I've forgotten my password?
            </button>
            <div className={style.Btns}>
              <button type="submit" className={style.LoginBtn}>
                SIGN IN
              </button>
              <Link to="/register">
                <button className={style.RegisterBtn}>REGISTER</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
