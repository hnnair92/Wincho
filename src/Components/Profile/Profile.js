import React, { useEffect, useRef, useState } from "react";
import { MdArrowRight, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import profile from "../../assests/Wincha Profile Icon.png";
import style from "./Profile.module.css";
import rightArrow from "../../assests/Enter Edit Arrow.png";
import shippingInfo from "../../assests/Subscription Info Icon.png";
import myDetailsBlue from "../../assests/My Details Selected Tab.png";
import shippingGray from "../../assests/Shipping Unselected Tab.png";
import myDetailsGray from "../../assests/My Details Unselected Tab.png";
import shippingBlue from "../../assests/Shipping Selected Tab.png";
import { configutation } from "../../actions/product";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../Description/assests";
import eye from "../../assests/Password Eye.png";
import info from "../../assests/Information Icon.png";
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png"
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png"
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png"
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png"
import CloseImage from "../../assests/Artboard 48 X.png"
import Lower from "../../assests/Artboard 48 - Lower Image Split.png"
import Upper from "../../assests/Artboard 48 - Upper Image Split.png"
import Lottie from "lottie-react";
import { AllAnimation } from "../../Animation/allAnimation";
import { music } from "../../assests/Musics/allMusic";
import { baseUrl } from "../url";
const Profile = ({ gameMusic,
  setGameMusic,
  gameSound,
  setGameSound,}) => {
    const navigate = useNavigate()
      const [musicStatus, setMusicStatus] = useState(
          localStorage.getItem("music")
            ? localStorage.getItem("music")
            : localStorage.setItem("music", JSON.stringify(false))
        );
const audioRefHome = useRef(null);
useEffect(() => {
  console.log(gameMusic === "true", "gameSound");
  console.log(typeof gameMusic, "gameMusic");
  if (gameMusic === "true" || gameMusic === true) {
    console.log(audioRefHome.current.volume);
    audioRefHome.current.volume = 1;
    console.log("true for gameMusic");
    console.log(audioRefHome.current.volume);
    playAudioBg();
  } else {
    audioRefHome.current.volume = 0;
    console.log(typeof gameMusic);
    console.log("not reached");
  }
  console.log(typeof gameMusic);
}, [gameMusic]);
useEffect(() => {
  if (gameMusic === "true" || gameMusic === true) {
    console.log(audioRefHome.current.volume);
    audioRefHome.current.volume = 1;
    playAudioBg();
  } else {
    console.log(typeof gameMusic);
    console.log("not reached");
  }
 
  console.log(typeof gameMusic);
  // console.log()
}, []);
async function audioEnded(src) {
  if (musicStatus === "true") {
    // audioRefHome.current.unmute()
    audioRefHome.current.volume = 1;
    audioRefHome.current.src = src;
    audioRefHome.current.play();
  } else {
    audioRefHome.current.volume = 0;
    // audioRefHome.current.mute()
  }
}
async function playAudioBg() {
  console.log(musicStatus, "musicStatus");
  // if(musicStatus==="true"){
  console.log(audioRefHome.current.play(), "from its function");
  // audioRefHome.current.volume=1;
  audioRefHome.current.src = music.Menu;
  audioRefHome.current.play();
  console.log(audioRefHome.current.volume, "from its function");

  // }
  // else{
  //   audioRefHome.current.volume = 0;

  // }
}
  // const baseUrl = "https://uat.wincha-online.com"
// const baseUrl = "https://uat.wincha-online.com"

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [premiumPopup, setPremiumPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [subscription, setSubscription] = useState("");
  const [birthday, setBirthday] = useState("");
  const [myDetails, setmyDetails] = useState(true);
  const { user } = useSelector((state) => state.profile);
  const { configuration } = useSelector((state) => state.configuration);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [Deactivate, setDeactivate] = useState(false);
  const [resendEmail, setResendEmail] = useState(user && user.profile_status===false?true:false);
  const [message, setMessage] = useState(false);
  const [type, setType] = useState(true);
  // const userId = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
  const [passIcon, setPassIcon] = useState(false);
  const [checkMail, setCheckMail] = useState(false);
  const resendLocal = localStorage.getItem("resend")

  async function deactivateAccount() {
    await fetch(`${baseUrl}/game/issue/report`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        machineID: "", // send it empty
        productID: "", // send it empty
        title: "deactivation",
        content: message, // reason of deactivation
        source: "web",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setVipData(data);
        console.log(data);
        // e.preventDefault();
        // console.log(window.location.pathname.split("/"))
        // navigate("/");

        // 
        localStorage.removeItem("user");
        localStorage.removeItem("SaveShipping");
        localStorage.removeItem("times");
        window.location.reload();
        // 

        // navigate("/")

      });
  }
  
  useEffect(() => {
    if (user) {
      // const date = user.dob.split("-");
      // console.log(date)
      setUsername(user.username);
      setEmail(user.email);
      // setPassword()
      // setBirthday(`${date[2]}-${date[1]}-${date[0]}`)
      setBirthday(user.dob);
      // console.log(birthday)
      setSubscription(user.vip ? "Yes" : "No");
    }
  });
  // useEffect(() => {
  //   if (user && user.profile_status === false) {
  //     setResendEmail(true);
  //   }
  // }, []);
  useEffect(()=>{
    console.log(resendLocal,"resendLocal")
    // const resendLocal = localStorage.getItem("resend")
    if(resendLocal===true){
      setResendEmail(false)
      setCheckMail(true)
    }
  },[resendLocal,user])
  const [loading,setLoading] = useState(false)
  async function resendEmailApi(){
    setLoading(true)
    await fetch(`${baseUrl}/user/verification/resend`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("resend",true)
        setLoading(false)
        setResendEmail(false)
        setCheckMail(true)
      });
  }
  async function updatePasswordFunc(e){
    e.preventDefault()
    await fetch(`${baseUrl}/user/profile/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: userId,
        username:user.username,
        password:password,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem("resend",true)
        // setLoading(false)
        // setResendEmail(false)
        // setCheckMail(true)
        console.log(data)
      });
  }
  return (
    <div className={style.Container}>
      <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
      <div className={style.Profile} onClick={()=>{
        console.log(resendLocal)
        console.log(user && user.profile_status===false&&checkMail===false&&resendLocal===false||resendLocal===undefined,"chekcing intense")
        if(resendLocal===true){
          setResendEmail(false)

          setCheckMail(true)
        }
        if(user && user.profile_status===false&&checkMail===false&&resendLocal!==true){
          setResendEmail(true)
        console.log(resendLocal,"true")

        }
        else{
          setResendEmail(false)

        }
       
      }}>
    {premiumPopup?
      <div className={style.clubHousePopup}>
      <div className={style.OverlayBg} onClick={()=>{
            setPremiumPopup(false)
        }}>

        </div>
        <div className={style.ClubHouse}>
            <div className={style.TopImage}>
          <div className={style.clubHouseClose} onClick={()=>{
            setPremiumPopup(false)
          }}>
            {/* <MdClose/> */}
            <img src={CloseImage} alt="" />
          </div>
              <img src={Upper} alt="" />
            </div>
            <div className={style.BottomContents}>
              {/* <div className={style.LowerImg}>
                <img src={Lower} alt="" />
              </div> */}
              <div className={style.BonusPoints}>
                  <div className={style.Bonus}>
                    <p>{configuration.VIP_BONUS_POINT}W</p>
                  </div>
                  <div className={style.BonusText}>
                    <p>Sign Up Bonus!</p>
                  </div>
              </div>
              <div className={style.benefits}>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={ShippingSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={BundleSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={NotificationSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={FreeplaySection} alt="" />

                  </div>
                  
                </div>
              </div>
              <div className={style.SubscribeButton}>
                <button>{`${configuration.CURRENCY_SYMBOL}${configuration.VIP_SUBSCRIPTION} / ${configuration.VIP_SUBSCRIPTION_PERIOD}`}</button>
              </div>
              <div className={style.CancelSubscription}>
                <p>Cancel any time</p>
              </div>
            </div>
            <div className={style.TermsAndPolicy}>
              <div className={style.Terms} onClick={()=>{
                window.open(
                  `${ configuration.terms}`,
                  "_blank"
                );
              }}>
                <p>Subscription Terms</p>
              </div>
              <div className={style.Policy} onClick={()=>{
                window.open(
                  `${ configuration.privacy}`,
                  "_blank"
                );
              }}>
                <p>Privacy Policy</p>
              </div>
            </div>
        </div>

      </div>
      
      :""}
        {passIcon ? (
          <div className={style.Passpopup}>
          <div className={style.OverlayBg} onClick={()=>{
            setPassIcon(false)
        }}>

        </div>
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
        ) : (
          ""
        )}
       
        {updatePassword ? (
          <div className={style.AddressSection}>
          <div className={style.OverlayBg} onClick={()=>{
            setUpdatePassword(false)
        }}>

        </div>
            <div className={style.AddressTitle}></div>
            <form action="">
              {/* <h1>Shipping Address</h1> */}
              <input
                type="text"
                name=""
                id=""
                // value={line1}
                readOnly
                value={user.username}
                placeholder="USERNAME"
                onChange={(e) => {
                  // setLine1(e.target.value);
                  //  line2 = e.target.value
                }}
              />

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
              <input
                type="text"
                name=""
                id=""
                // value={number}
                placeholder="REPEAT NEW PASSWORD"
                onChange={(e) => {
                  // setNumber(e.target.value)
                  //  line2 = e.target.value
                }}
              />
              <input
                type="email"
                name=""
                id=""
                // value={city}
                value={user.email}
                readOnly

                placeholder="EMAIL"
                onChange={(e) => {
                  // setCity(e.target.value)
                  //  line2 = e.target.value
                }}
              />

              <button
                type="submit"
                onClick={(e) => {
                  // setIsAddressFieldShown(true);
                  // setisAddressField(false);
                  // setAddressObj({
                  //   line1,
                  //   line2,
                  //   city,
                  //   state,
                  //   zipcode
                  // })
                  // numberValidation()
                  // setCount(4)
                  // console.log(addressObj);
                  updatePasswordFunc(e)
                }}
                // disabled={ line1===""|| line2===""|| city===""|| state===""|| zipcode===""}
              >
                CONFIRM
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        {Deactivate ? (
          <div className={style.DeactivatePopup}>
            <div className={style.DeacOverlayBg} onClick={()=>{
            setDeactivate(false)
        }}>

        </div>
          <div className={style.popup}>
          
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.ReportPopupButtonCategory}>
              <button>DEACTIVATE</button>
            </div>
            <div className={style.popupInput}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="If you can please tell us why you're leaving"
              ></textarea>
            </div>
            <div className={style.popupSubmit}>
              <button
                onClick={() => {
                  // sendReport();
                  deactivateAccount()
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
        {resendEmail ? (
          <div className={style.popup}>
          <div className={style.popupOverlay} onClick={()=>{
             if(resendLocal===true){
              setResendEmail(false)
    
              setCheckMail(true)
            }
            // setResendEmail(false)
          }}></div>
          <div className={style.popupContent}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              <p>Awaiting player verification</p>
            </div>
            <div className={style.popupButton}>
              <div
                // to="/tickets"
                onClick={() => {
                  // setResendEmail(false);
                  // resendEmailApi()
                }}
              >
                <button  onClick={() => {

                  // setResendEmail(false);
                  resendEmailApi();
                }}>RESEND EMAIL</button>
              </div>
            </div>
          </div>
          {/* {loading?
          <Lottie animationData={AllAnimation.Loader}/>
          :""} */}
          </div>
        ) : (
          ""
        )}
        {checkMail ? (
          <div className={style.popup}>
          <div className={style.popupOverlay} onClick={()=>{
            // setResendEmail(false)
          }}></div>
          <div className={style.popupContent}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              <p>Please check your mail and refresh the page</p>
            </div>
            <div className={style.popupButton}>
              <div
                // to="/tickets"
                onClick={() => {
                  // setResendEmail(false);
                  // resendEmailApi()
                }}
              >
                {/* <button  onClick={() => {
                  resendEmailApi();
                }}>RESEND EMAIL</button> */}
              </div>
            </div>
          </div>
          {/* {loading?
          <Lottie animationData={AllAnimation.Loader}/>
          :""} */}
          </div>
        ) : (
          ""
        )}
        <div className={style.ProfileContent}>
          <div className={style.ProfileImage}>
            <img src={profile} alt="" />
          </div>
          <div className={style.ProfileAction}>
            {/* <div className={style.AllBtns}>
            <button className={style.btn2}>SHIPPING</button>
            <button className={style.btn1}>MY DETAILS</button>
          </div> */}
            {/* <button className={style.ProfileBtn}>PROFILE</button>
            <button className={style.history}>HISTORY</button>
            <button className={style.Faq}>FAQ</button> */}
            <button
              className={style.Deactivate}
              onClick={() => {
                setDeactivate(true);
              }}
            >
              DEACTIVATE ACCOUNT
            </button>
          </div>
        </div>
        <div className={style.FullDetails}>
          <div className={style.TabBtns}>
            {/* mydetails */}

            {myDetails === false ? (
              <img
                src={myDetailsGray}
                alt=""
                className={myDetails ? style.TabBtnActiveImg : style.TabImg}
                onClick={() => {
                  setmyDetails(false);
                  console.log("from mydetails", myDetails);
                }}
              />
            ) : (
              <img
                src={myDetailsBlue}
                alt=""
                className={myDetails ? style.TabBtnActiveImg : style.TabImg}
                onClick={() => {
                  setmyDetails(false);
                  console.log("from mydetails", myDetails);
                }}
              />
            )}
            {/* shipping */}
            {myDetails === false ? (
              <img
                src={shippingBlue}
                alt=""
                className={myDetails ? style.TabImg : style.TabBtnActiveImg}
                onClick={() => {
                  setmyDetails(true);
                  console.log("from shipping", myDetails);
                }}
              />
            ) : (
              <img
                src={shippingGray}
                alt=""
                className={myDetails ? style.TabImg : style.TabBtnActiveImg}
                onClick={() => {
                  setmyDetails(true);
                  console.log("from shipping", myDetails);
                }}
              />
            )}
          </div>

          <div className={style.TabSection}>
            {myDetails === false ? (
              <div className={style.Shipping}>
                <div className={style.Phone}>
                  <div className={style.title}>
                    <p>Phone Number</p>
                  </div>
                  <div className={style.InputSection}>
                    <input className={style.phoneInputSection}
                      type="text"
                      value={user?.phone}
                      placeholder="Please Enter"
                    />
                    <img src={rightArrow} alt="" />
                  </div>
                </div>
                <div className={style.Address}>
                  <div className={style.title}>
                    <p>Shipping</p>
                  </div>
                  <div className={style.InputSection}>
                    {/* <input
                      type="text"
                      value={user?.username || ""}
                      readOnly
                      placeholder="Username"
                    /> */}
                    <input
                      type="text"
                      value={user?.addressline1 || ""}
                      readOnly
                      placeholder="Line1"
                    />
                    <input
                      type="text"
                      value={user?.addressline2 || ""}
                      readOnly
                      placeholder="Line2"
                    />
                    <input
                      type="text"
                      value={user?.city || ""}
                      readOnly
                      placeholder="City"
                    />
                    {user && user.coutryname === "UK" ? (
                      <input
                        type="text"
                        value={user?.county || ""}
                        readOnly
                        placeholder="County"
                      />
                    ) : user && user.coutryname === "USA" ? (
                      <input
                        type="text"
                        value={user?.county || ""}
                        readOnly
                        placeholder="State"
                      />
                    ) : (
                      ""
                    )}
                    {/* <input type="text"  value={user?.county||""}readOnly placeholder="Country"/> */}
                    {user && user.coutryname === "UK" ? (
                      <input
                        type="text"
                        value={user?.zipcode || ""}
                        readOnly
                        placeholder="Postcode"
                      />
                    ) : user && user.coutryname === "USA" ? (
                      <input
                        type="text"
                        value={user?.zipcode || ""}
                        readOnly
                        placeholder="Zip Code"
                      />
                    ) : (
                      ""
                    )}
                    {/* <input type="text" value={user?.zipcode||""}readOnly placeholder="Zipcode"/> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.myDetails}>
                <div className={style.Username}>
                  <div className={style.title}>
                    <p>Username</p>
                  </div>
                  <div className={style.InputSection}>
                    <input
                      type="text"
                      value={username}
                      readOnly
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div className={style.Birthday}>
                  <div className={style.title}>
                    <p>Birthday</p>
                  </div>
                  <div className={style.InputSection}>
                    <input
                      type="text"
                      value={birthday}
                      readOnly
                      placeholder="DD/MM/YYY"
                    />
                    {/* <input type="date" value={birthday} onChange/> */}
                  </div>
                </div>
                <div className={style.EmailAddress}>
                  <div className={style.title}>
                    <p>Email Address</p>
                  </div>
                  <div className={style.InputSection}>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      placeholder="YourName@gmail.com"
                    />
                    {/* <input type="email" value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }}/> */}
                  </div>
                </div>
                <div className={style.Password}>
                  <div className={style.title}>
                    <p>Password</p>
                  </div>
                  <div className={style.InputSection}>
                    <input
                      type="text"
                      value="***********"
                      readOnly
                      placeholder="Your Password"
                    />
                    {/* <MdOutlineKeyboardArrowRight/> */}
                    <img
                      src={rightArrow}
                      alt=""
                      onClick={() => {
                        setUpdatePassword(true);
                      }}
                    />

                    {/* <input type="password" value={password} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/> */}
                  </div>
                </div>
                <div className={style.Subscription}>
                  <div className={style.title}>
                    <p>Subscription</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={subscription} readOnly />
                    <img src={shippingInfo} alt="" onClick={()=>{
                      setPremiumPopup(true)
                    }}/>
                    {/* <input type="text" value={subscription} onChange={(e)=>{
                                setSubscription(e.target.value)
                            }}/> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
