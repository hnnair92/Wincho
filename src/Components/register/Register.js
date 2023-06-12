import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { registerAction, updateProfile } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../assests/Password Eye.png";
import tick from "../../assests/Green Tick.png";
import wincha from "../../assests/Wincha Pop-Up Icon.png";
import Select from "react-select";
import { FaChevronDown } from "react-icons/fa";
import info from "../../assests/Information Icon.png";
import { configutation } from "../../actions/product";
import { baseUrl } from "../url";
const Register = () => {
  const [errors, setError] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [password, setPassword] = useState("");
  // const[error,setError] = useState(true)
  const [location, setLocation] = useState("");
  // const baseUrl = "https://uat.wincha-online.com"
  // const baseUrl = "https://uat.wincha-online.com"
  const [terms, setTerms] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  // const[showPassword,setShowPassword] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"));

  const [email, setEmail] = useState("");
  const { configuration } = useSelector((state) => state.configuration);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameExist, setUsernameExist] = useState("");
  const [eligible, setEligible] = useState(true);
  const [date, setDate] = useState("");
  const [state, setState] = useState("Select a State");
  const [allState, setAllState] = useState([]);
  const [selectState, setSelectState] = useState(false);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user");
  useEffect(() => {
    dispatch(configutation());
  }, [dispatch]);
  const fetchLocation = async () => {
    await fetch(`https://pro.ip-api.com/json/?key=cHngsdONXseEb0x`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        // if(data.)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // const response  = await data.json()
    // console.log(response)
  };
  const stateFetch = () => {
    fetch(`${baseUrl}/configurations/state/collections`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllState(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchLocation();
    stateFetch();

    // const response  = data.json()
    // console.log(response)
  }, []);
  const checkNumbers = (str) => {
    return /\d/.test(str);
  };
  useEffect(() => {
    const check = checkNumbers(password);
    console.log(check);
    if (check === false) {
      setError("No Numbers Found");
    } else {
      setError("");
    }
    console.log(errors);
  }, [password]);
  const navigate = useNavigate();
  const { user, authenticated } = useSelector((state) => state.profile);
  const { error } = useSelector((state) => state.userData);
  useEffect(() => {
    // if(userId!==null&&user&&user.username!==""){
    //     dispatch(updateProfile(userId))
    //     navigate("/")
    // }
    // if(userId!==null){
    // }
  }, [userId, dispatch, user]);
  useEffect(() => {
    if (user && user.username !== "") {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(updateProfile(userId));
    }
    if (localStorage.getItem("user")) {
      navigate("/");
    } else {
      navigate("/register");
    }
    console.log(user);
  }, [dispatch, userId]);
  // const[chec]
  useEffect(() => {
    console.log(state);
  }, [state]);
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("reached");
    checkUsername();
    console.log("register username state", usernameExist);
    const data = {
      username: username,
      email: email,
      password: password,
      dob: date,
      country: location.country,
      state: state.state,
      countrycode: configuration.COUNTRY_CODE,
      countryname: configuration.COUNTRY_NAME,
      user_type: "common_user",
    };
    console.log(data);
    console.log(configuration);
    if (eligible === true && password === confirmPassword) {
      dispatch(registerAction(data));
    }
  };
  const checkUsername = async () => {
    console.log(usernameExist.length);
    fetch(`${baseUrl}/user/username/check`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsernameExist(data.status);
      });
  };
  let dateArray = [];
  const handleDate = (e) => {
    const selDate = e.target.value;
    dateArray = selDate.split("-");
    const CurYear = new Date().getFullYear();
    console.log(dateArray);
    if (dateArray[0] <= CurYear - 12) {
      setCheckError(false);
      setEligible(true);

      // popup()
    } else {
      // setDate("")
      setCheckError(true);
      setEligible(false);
    }
    setDate(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
  };
  const popup = (error) => {
    return (
      <div className={style.Popup}>
        <div className={style.Contents}>
          <div className={style.image}>
            <img src={wincha} alt="" />
          </div>
          <div className={style.PopupText}>
            <p>{error}</p>
          </div>
          <div className={style.Actions}>
            <div className={style.accept}>
              <button
                onClick={() => {
                  setCheckError(false);
                }}
              >
                OK
              </button>
            </div>
            <div className={style.Terms}>
              <button>TERMS</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  console.log(allState);
  const checkState = (state, e) => {
    e.preventDefault();
    if (state.status === false) {
      setCheckError(true);
      setState("");
      setSelectState(false);
    } else {
      setState(state);
      setSelectState(false);
    }
  };
  const [passIcon, setPassIcon] = useState(false);
  return (
    <div className={style.Container}>
      {checkError ? (
        <div className={style.Popup}>
          <div className={style.Contents}>
            <div className={style.image}>
              <img src={wincha} alt="" />
            </div>
            <div className={style.PopupText}>
              {/* {eligible?<p>Sorry you're not eligible to play! </p>:} */}
              <p>Sorry you're not eligible to play! </p>
            </div>
            <div className={style.Actions}>
              <div className={style.accept}>
                <button
                  onClick={() => {
                    console.log("clicked");
                    setCheckError(false);
                  }}
                >
                  OK
                </button>
              </div>
              <div
                className={style.Terms}
                onClick={() => {
                  window.open(`${configuration.terms}`, "_Blank");
                }}
              >
                <button>TERMS</button>
              </div>
            </div>
          </div>
        </div>
      ) : passIcon ? (
        <div className={style.popup}>
          <div className={style.image}>
            <img src={wincha} alt="" />
          </div>
          <div className={style.content}>
            <ul>
              <li>8-20 Characters</li>
              <li>At least 1 capital letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
              <li>No spaces</li>
            </ul>
          </div>
          <div className={style.action}>
            <button
              onClick={() => {
                setPassIcon(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={style.Register}>
        <form
          className={style.form}
          onSubmit={handleRegister}
          autocomplete="off"
        >
          <input
            type="text"
            placeholder="username"
            required
            className={style.input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {username.length < 1 && username !== "" ? (
            <p className={style.AgeRestrict}>
              Username should be greater than 1
            </p>
          ) : username.length > 20 ? (
            <p className={style.AgeRestrict}>Username Should be below 20</p>
          ) : (
            ""
          )}
          <label htmlFor="">Date of Birth</label>

          <input
            type="date"
            placeholder="DOB"
            required
            name=""
            id=""
            className={date ? style.DataInput : style.hideDate}
            onChange={(e) => {
              handleDate(e);
              console.log(e.target.value);
            }}
          />
          {location?.countryCode === "US" ? (
            <>
              <label htmlFor="">Select a State</label>
              <div className={`${style.input} ${style.selectInput}`}>
                {state.state ? (
                  <input
                    type="text"
                    readOnly
                    value={state.state}
                    className={style.StateSelect}
                  />
                ) : (
                  <input
                    type="text"
                    readOnly
                    className={style.StateSelectCenter}
                    placeholder="SELECT STATE"
                  />
                )}
                {/* <input type="text" readOnly value={state.state||"Select a State"} className={state.state?style.StateSelectHide:style.StateSelect}/> */}
                <FaChevronDown
                  onClick={() => {
                    selectState ? setSelectState(false) : setSelectState(true);
                  }}
                />
                {selectState ? (
                  <div className={selectState ? style.AllState : style.stateUp}>
                    {allState.map((stateItem) => {
                      return (
                        <input
                          type="text"
                          name="state"
                          id="state"
                          readOnly
                          value={stateItem.state}
                          onClick={(e) => {
                            checkState(stateItem, e);
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
          {/* // :""} */}

          {/* {eligible&&checkError?"":popup("Sorry you're not eligible to play!")} */}
          {/* {eligible?"":<p className={style.AgeRestrict}>Age below 12 is not allowed</p>} */}
          {/* <div className={style.checkUser}>{usernameExist.length>0&&usernameExist==="True"?"":usernameExist.length>0&&usernameExist==="False"?<p className={style.userInvaild}>{error&&error.description}</p>:""}</div> */}
          <div className={style.password}>
            <div className={style.info}>
              <img
                src={info}
                alt=""
                onClick={() => {
                  setPassIcon(true);
                }}
              />
            </div>
            <input
              type={passwordType}
              required
              placeholder="password"
              value={password}
              className={style.input}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(
                  "lenght",
                  password.length > 7 && password.length < 15
                );
              }}
            />
            {passwordType === "text" ? (
              <img
                className={style.eyeIcon}
                src={eye}
                onClick={() => {
                  setPasswordType("password");
                }}
              />
            ) : (
              <img
                className={style.eyeIcon}
                src={eye}
                onClick={() => {
                  setPasswordType("text");
                }}
              />
            )}
          </div>
          {password.length < 8 && password !== "" ? (
            <p className={style.AgeRestrict}>
              Password Should be More than 8 Letter
            </p>
          ) : password && password.length > 15 && password !== "" ? (
            <p className={style.AgeRestrict}>
              Password Should be Less than 15 Letters
            </p>
          ) : /\d/.test(password) === false && password !== "" ? (
            <p className={style.AgeRestrict}>
              Password Should Contain a Number
            </p>
          ) : /[A-Z]/.test(password) === false && password !== "" ? (
            <p className={style.AgeRestrict}>
              Password Should Contain a UpperCase
            </p>
          ) : (
            ""
          )}
          {/* {password.length<8&&password.length>15?<p>Enter Password More than 8 Words</p>:""} */}
          {/* {new String(password).length<8&&new String(password).length>15?<p>Enter Password More than 8 Words</p>:""} */}
          <div className={style.password}>
            <input
              type="password"
              required
              placeholder="repeat password"
              className={style.input}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            {/* {passwordType==="text"?<AiFillEyeInvisible className={style.eyeIcon} onClick={()=>{
                        setPasswordType("password")
                    }}/>:<AiFillEye className={style.eyeIcon} onClick={()=>{
                        setPasswordType("text")
                    }}/>} */}
          </div>
          <div className={style.CheckPassword}>
            {password === confirmPassword ? (
              ""
            ) : (
              <p className={style.AgeRestrict}>Password not matching</p>
            )}
          </div>
          <input
            type="email"
            required
            placeholder="email"
            value={email}
            className={style.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className={style.Terms}>
            {/* <input type="checkbox" name="" id="" onChange={(e)=>{
                        setTerms(e.target.checked)
                    }}/> */}
            <div className={style.CheckBox}>
              <img
                src={tick}
                alt=""
                onClick={() => {
                  terms ? setTerms(false) : setTerms(true);
                }}
                className={terms ? style.checked : style.NotChecked}
              />
            </div>
            <p>
              I have read and agree to the{" "}
              <Link
                onClick={() => {
                  window.open(`${configuration.terms}`, "_Blank");
                }}
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                onClick={() => {
                  window.open(`${configuration.privacy}`, "_Blank");
                }}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {/* <button type="submit" className={style.formBtn}>Confirm</button> */}
          {eligible &&
          terms === true &&
          password === confirmPassword &&
          password.length > 7 &&
          password.length < 15 &&
          /\d/.test(password) &&
          /[A-Z]/.test(password) &&
          username.length > 1 &&
          username.length < 20 ? (
            <button type="submit" className={style.formBtn}>
              Confirm
            </button>
          ) : (
            <button type="submit" className={style.btnDisabled} disabled>
              Confirm
            </button>
          )}

          <div className={style.checkUser}>
            {error && error.status === "False" ? (
              <p className={style.userInvaild}>{error && error.description}</p>
            ) : (
              ""
            )}
          </div>
          {/* <div className={style.checkUser}>{usernameExist.length>0&&usernameExist==="True"?"":usernameExist.length>0&&usernameExist==="False"?<p className={style.userInvaild}>{error&&error.description}</p>:""}</div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
