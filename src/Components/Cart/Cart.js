import React, { useEffect, useRef, useState } from "react";
import style from "./Cart.module.css";
import bg from "../../assests/Shipping Page BG.png";
import replay from "../../assests/Last Win Icon.png";
import share from "../../assests/Share Icon.png";
import ticket from "../../assests/Gold Ticket Standard Shipping.png";
import primeIcon from "../../assests/Wincha Clubhouse Option.png";
import ReactPlayer from "react-player";
import playBtn from "../../assests/PlayButton.png";
import { assets } from "../Description/assests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { AllAnimation } from "../../Animation/allAnimation";
import { MdClose, MdEmail, MdFacebook } from "react-icons/md";
import playVideo from "../../assests/PlayButton.png";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png";
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png";
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png";
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png";
import CloseImage from "../../assests/Artboard 48 X.png";
import Lower from "../../assests/Artboard 48 - Lower Image Split.png";
import Upper from "../../assests/Artboard 48 - Upper Image Split.png";
import { updateProfile } from "../../actions/user";
import {FaChevronDown} from 'react-icons/fa'
import { music } from "../../assests/Musics/allMusic";
import { baseUrl } from "../url";
// baseUrl
const Cart = ({ gameMusic,
  setGameMusic,
  gameSound,
  setGameSound,}) => {
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
  const dispatch = useDispatch();
  // const[prime,setPrime] = useState(true)
  const [cartData, setCartData] = useState([]);
  const [premiumPopup, setPremiumPopup] = useState(false);
  // const baseUrl = process.env.REACT_APP_BASEURL
  // const userId = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
  // const userId = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.setItem("user","");

  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.profile);
  let saved = localStorage.getItem("SaveShipping");
  const vidRef = useRef(null);
  const [shareId, setShareId] = useState("");
  const [shareIcons, setShareIcons] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  const [eGifting, setEGifting] = useState(true);
  const navigate = useNavigate();
  const [vipData, setVipData] = useState({});
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [url, setUrl] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [number, setNumber] = useState("");
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  // UseState
  const[allState,setAllState] = useState([])
  const[selectState,setSelectState] = useState(false)
  const [userCountry, setUserCountry] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const [isVipShown, setIsVipShown] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isAddressShown, setIsAddressShown] = useState(false);
  const [isBundleReminder, setIsBundleReminder] = useState(false);
  const [isReminderShown, setIsReminderShown] = useState(false);
  const [isTopup, setIsTopup] = useState(false);
  const [isTopupShown, setIsTopupShown] = useState(false);
  const [isAddressField, setisAddressField] = useState(false);
  const [isAddressFieldShown, setIsAddressFieldShown] = useState(false);
  const [vipMessage, setVipMessage] = useState([]);
  const [products,setProducts] = useState([])
  const [addressObj, setAddressObj] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const setPlayBack = () => {
    vidRef.current.playbackRate = 1.5;
  };

  const videoRef = useRef(null)
  const[errors,setError] = useState("")
    const[checkError,setCheckError] = useState(false)
  const [count, setCount] = useState(1);
  // End
  // useEffect(()=>{
  //   videoRef?.current?.playbackRate = 1.5;
  // },[videoRef,showVideo])
  const checkState=(state,e)=>{
    e.preventDefault()
    if(state.status===false){
        setCheckError(true)
        setState("")
        setSelectState(false)

    }
    else{
        setState(state)
        setSelectState(false)
    }
}
  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  const handlePauseVideo = () => {
    vidRef.current.pause();
  };
  const checkCounts = ()=>{
    const parsedPoint = user && parseInt(user.point);
    const parsedPrice =
      configuration &&
      parseInt(configuration.STANDARD_SHIPPING_PRICE);
    if (saved === "true") {
      console.log(typeof saved);
      // setCount(1)
    } else {
      console.log(typeof saved);
      return setCount(1);
    }
    if (user && user.vip === true) {
      return setCount(1);
      console.log(user && user.vip);
    } else {
      console.log(user && user.vip);
      setCount(2);
    }
    if (
      parsedPoint < parsedPrice &&
      user.vip === false
    ) {
      return setCount(2);
    } else if (
      parsedPoint > parsedPrice &&
      user.vip === false
    ) {
      // if(parsedPoint>parsedPrice){
      // if(user&&parseInt(user.point)<configuration&&parseInt(configuration.STANDARD_SHIPPING_PRICE)){
      setIsAddress(true);

      setCount(3);
      console.log("count jumbed 2");
      // }
    } else {
      setCount(1);
    }
    if (user && user.line1 === "") {
      return setCount(3);
    } else {
      setCount(4);
    }
    if (user && user.vip === true) {
      return setCount(1);
      console.log(user && user.vip);
    } 
    // else {
    //   console.log(user && user.vip);
    //   setCount(2);
    // }
  }
  useEffect(() => {
    checkCounts()
  }, [user, configuration]);
  useEffect(() => {
    console.log(vipMessage, "count from useEffect");
  }, [vipMessage]);
  useEffect(() => {
    console.log(isAddress, "address from useEffect");
    console.log(count, "count from useEffect");
  }, [isAddress]);
  async function fetchCart() {
    await fetch(`${baseUrl}/cart/collection`, {
      method: "POST",
      // mode:"no-cors",
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartData(data.data);
        setLoading(false);
        console.log(data);
        [...data.data].forEach((cart) => {
          setProducts(products=>[...products,{
            id:`${cart.id}`,
            is_Egifting:cart.is_Egifting,
            quantity:"1",
            cart_id:cart.cart_id
            
          }])
          if (cart.is_Egifting === false) {
            setEGifting(false);
            console.log(cart);
          }
        });
        // for(const cart of cardData){
        //     console.log(cart)
        // }
        // console.log(eGifting)
      });
  }
  useEffect(()=>{
    console.log(products)
  },[products])
  async function addAddress() {
    if (configuration.COUNTRY_CODE === "44") {
      setUserCountry("county");
    } else {
      setUserCountry("state");
    }
    const body = {
      id: userId,
      username: user.username,
      first_name: firstName,
      last_name: lastName,
      phone: number,
      addressline1: line1,
      addressline2: line2,
      city: city,
      county: state,
      zipcode: zipcode,
      coutrycode: configuration.COUNTRY_CODE,
      coutryname: configuration.COUNTRY_NAME,
    }
    if(configuration.COUNTRY_CODE==="1"){
      body = {
      id: userId,
      username: user.username,
      first_name: firstName,
      last_name: lastName,
      phone: `${number}`,
      addressline1: line1,
      addressline2: line2,
      city: city,
      state: state,
      zipcode: zipcode,
      coutrycode: configuration.COUNTRY_CODE,
      coutryname: configuration.COUNTRY_NAME,
      }
    }
  //   {
  //     "id":"632966a3276161e78911c3ca",
  //     "username":"Dora",
  //     "first_name":"Dora",
  //     "last_name":"S",
  //     "phone":"8089511826",
  //     "addressline1":"Line 1 ",
  //     "addressline2":"Line 2s",
  //     "city":"Test City ",
  //     "county":"testCounty",
  //     "zipcode":"PR40ET ",
  //     "coutrycode":"44",
  //     "coutryname":"UK"
  //  }
  console.log(body)
    await fetch(`${baseUrl}/user/shipping/details/update`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(updateProfile());
      }).catch((err)=>{
        console.log(err)
      })
  }
  async function createPayment(){
    await fetch(`${baseUrl}/points/create-checkout-session`, {
      method: "POST",
      body: JSON.stringify({
        mode: "payment",
        amount: parseFloat(configuration.VIP_SUBSCRIPTION) * 100,
        quantity: 1,
        currency: configuration.CURRENCY_CODE,
        product: "Vip",
        success_url: "http://localhost:3000/payment/success/?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/payment/cancel/?session_id={CHECKOUT_SESSION_ID}",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.open(`${data.data[0].url}`);
      });
  }
  function getVipDetails() {
    fetch(`${baseUrl}/user/vip/shipping/status`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVipData(data);
        // const message = data.data[0].vip_discription.split("\n");
        // setVipMessage(message);
        console.log(data);
        // console.log(data.data[0].vip_discription.split("\n"))
      });
  }
  async function numberValidation() {
    await fetch(`${baseUrl}/user/phonecode/check`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        number: `${configuration.COUNTRY_CODE}${number}`,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.status === true) {
          postCodeCheck();
        }
      });
  }
  async function postCodeCheck() {
    await fetch(`${baseUrl}/configurations/code/check`, {
      method: "POST",
      body: JSON.stringify({
        country: "UK",
        code: zipcode,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status==="True"){
          addAddress();
        }
        console.log(data);
      });
  }
  async function checkoutAPi() {
    const sendData = {
      address_1: user.addressline1,
        address_2: user.addressline2,
        city: user.city,
        company: "",
        country: configuration.COUNTRY_NAME,
        email: user.email,
        first_name: user.username,
        phone: user.phone,
        postcode: user.zipcode,
        products: products,
        state: user.state,
        user_id: userId,
    }
    await fetch(`${baseUrl}/cart/checkout`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(sendData)
        setProducts([])
        console.log(data.data[0])
        if(data.status==="True"){

          navigate("/order-confirmed");
        }
        console.log(data);
      }).catch((err)=>{
        console.log(err)
      })
  }
  // function get
  useEffect(() => {
    console.log(saved);
    fetchCart();
    getVipDetails();
    if (saved === null) {
      localStorage.setItem("SaveShipping", false);
    }
  }, []);
  function checkCount() {
    console.log("Checking count", count);
    if (saved === "true") {
      setCount(1);
    }
    if (vipData.status === false) {
      setCount(2);
    }
  }
  function Popup(url) {
    console.log(url);
    // videoRef?.current?.playbackRate = 1.5;
    return (
      <div
        className={showVideo ? style.LastWinPopup : style.hideVideopopup}
        onClick={() => {}}
      >
        <div
          className={style.VideoOverlay}
          onClick={() => {
            setShowVideo(false);
            setOnPlay(false);
          }}
        ></div>
        <div className={style.PlayIcon}>
          {onPlay === true ? (
            <button
              onClick={() => {
                setOnPlay(false);
                handlePauseVideo();
              }}
            >
              <img src={assets.PlayImage} alt="" />
            </button>
          ) : (
            <button
              onClick={() => {
                setOnPlay(true);
                handlePlayVideo();
              }}
            >
              <img src={playVideo} alt="" />
            </button>
          )}
        </div>
        <div className={style.VideoSection}>
          <MdClose
            onClick={() => {
              setShowVideo(false);
              setOnPlay(false);
            }}
          />
          {url === "" ? (
            <div className={style.VideoEmpty}>
              <p>Whoops! Video unavailable Please try again later.</p>
            </div>
          ) : (
            // <ReactPlayer
            // ref={videoRef2}
            //   url={url}
            //   width="100%"
            //   height="500px"
            //   playIcon={<button>Play</button>}
            //   playing={true}
            //   controls={true}
            //   />\
            <video autoPlay muted={true} ref={videoRef} onCanPlay={() => setPlayBack()}>
              <source src={url} type="video/mp4" />
            </video>
          )}
          {/* <video src=""></video> */}
          {/* light="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" */}
          {/* <video ref ={videoRef}>
                <source src={`${configuration.LAST_WIN_VIDEO}`} type="video/mp4"/>
            </video> */}
        </div>
      </div>
    );
  }
  function lowPoint() {
    const pointInt = parseInt(user.point);
    const priceInt = parseInt(configuration.STANDARD_SHIPPING_PRICE);
    if (pointInt < priceInt) {
      setIsTopup(true);
      // setCount()
    } else {
      setCount(3);
    }
  }

  return (
    <div className={style.Container}>
      <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
      {premiumPopup ? (
        <div className={style.clubHousePopup}>
          <div className={style.clubHouseOverlay} onClick={() => {
                  setPremiumPopup(false);
                }}>

          </div>
          <div className={style.ClubHouse}>
            <div className={style.TopImage}>
              <div
                className={style.clubHouseClose}
                onClick={() => {
                  setPremiumPopup(false);
                }}
              >
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
                <button onClick={()=>{
                  createPayment()
                }}>{`${configuration.CURRENCY_SYMBOL}${configuration.VIP_SUBSCRIPTION} / ${configuration.VIP_SUBSCRIPTION_PERIOD}`}</button>
              </div>
              <div className={style.CancelSubscription}>
                <p>Cancel any time</p>
              </div>
            </div>
            <div className={style.TermsAndPolicy}>
              <div
                className={style.Terms}
                onClick={() => {
                  window.open(`${configuration.terms}`, "_blank");
                }}
              >
                <p>Subscription Terms</p>
              </div>
              <div
                className={style.Policy}
                onClick={() => {
                  window.open(`${configuration.privacy}`, "_blank");
                }}
              >
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {showVideo ? (
        // <Popup/>
        <div
          className={showVideo ? style.LastWinPopup : style.hideVideopopup}
          onClick={() => {}}
        >
          <div
            className={style.VideoOverlay}
            onClick={() => {
              setShowVideo(false);
              setOnPlay(false);
            }}
          ></div>
          {/* <div className={style.PlayIcon}>
            {onPlay === true && url === "" ? (
              <button
                onClick={() => {
                  setOnPlay(false);
                  handlePauseVideo();
                }}
              >
                <img src={assets.PlayImage} alt="" />
              </button>
            ) : url === "" ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setOnPlay(true);
                  handlePlayVideo();
                }}
              >
                <img src={playVideo} alt="" />
              </button>
            )}
          </div> */}
          <div className={style.VideoSection}>
            <MdClose
              onClick={() => {
                setShowVideo(false);
                setOnPlay(false);
              }}
            />
            {url === "" ? (
              <div className={style.VideoEmpty}>
                <p>Whoops! Video unavailable Please try again later.</p>
              </div>
            ) : (
              // <ReactPlayer
              // ref={videoRef2}
              //   url={url}
              //   width="100%"
              //   height="500px"
              //   playIcon={<button>Play</button>}
              //   playing={true}
              //   controls={true}
              //   />\
              <video autoPlay muted={true}>
                <source src={url} type="video/mp4" />
              </video>
            )}
            {/* <video src=""></video> */}
            {/* light="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" */}
            {/* <video ref ={videoRef}>
                <source src={`${configuration.LAST_WIN_VIDEO}`} type="video/mp4"/>
            </video> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {isVip && isVipShown === false ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {/* <p>{vipData.vip_discription}</p> */}
            {/* <p>
              <div
                dangerouslySetInnerHTML={{
                  __html: vipData.data[0].vip_discription,
                }}
              ></div>
            </p> */}
            {vipMessage.map((text) => {
              console.log(text);
              return (
                <p className={text ? style.PopupTextContent : style.Blank}>{`${
                  text ? text : text === "" ? "Blank" : ""
                }`}</p>
              );
            })}
            <p></p>
            {/* <p>fhf</p> */}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                const parsedPoint = user && parseInt(user.point);
                const parsedPrice =
                  configuration &&
                  parseInt(configuration.STANDARD_SHIPPING_PRICE);
                // localStorage.setItem("saveShipping",true)\
                setIsVip(false);
                // setIsVipShown(true);
                setCount(2);
                if (parsedPoint > parsedPrice) {
                  setIsAddress(true);

                  setCount(4);
                  console.log("count jumbed 2");
                }
                if (user && user.addressline1 === "") {
                  setIsAddress(true);

                  setCount(3);
                  console.log("count jumbed 2");
                } else {
                  setCount(4);
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {isAddress && isAddressShown === false && user?.line1 === "" ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {/* <p>{vipData.vip_discription}</p> */}
            <p>Whoops! We need your shipping details</p>
            {/* <p>fhf</p> */}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                setisAddressField(true);
                setIsAddressShown(true);
                setIsAddress(false);
                //  setCount
              }}
            >
              ADD DETAILS
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {isBundleReminder === true ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>
              Woah there! Remember to bundle your prizes to save an shipping!
            </p>
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                localStorage.setItem("SaveShipping", "true");
                if (vipData.status === true) {
                  setCount(2);
                } else {
                  setCount(2);
                }
                // setIsReminderShown(true);
                setIsBundleReminder(false);
              }}
            >
              OK
            </button>
            {/* <button>CAMERA</button>
        <button>PAYMENT</button>
        <button>DELAY</button>
        <button>OTHER</button> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {isTopup && isTopupShown === false ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Woah there! You haven't got enough tickets!</p>
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                // localStorage.setItem("saveShipping",true)
                navigate("/tickets");
                // setIsLowPoint(false)
                setCount(3);
                setIsTopup(false);
              }}
            >
              TOP UP
            </button>
            {/* <button>CAMERA</button>
        <button>PAYMENT</button>
        <button>DELAY</button>
        <button>OTHER</button> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {isAddressField === true ? (
        // {isAddressField===true || isAddressFieldShown === false ? (
        <div className={style.Address}>
          <div className={style.AddressTitleOverlay} onClick={()=>{
            setisAddressField(false)
          }}></div>
          <form action="">
            <h1>Shipping Address</h1>
            <input
              type="text"
              name=""
              id=""
              value={firstName}
              placeholder="FIRST NAME"
              onChange={(e) => {
                setFirstName(e.target.value);
                //  line2 = e.target.value
              }}
            />
            <input
              type="text"
              name=""
              id=""
              value={lastName}
              placeholder="LAST NAME"
              onChange={(e) => {
                setLastName(e.target.value);
                //  line2 = e.target.value
              }}
            />
            <input
              type="text"
              name=""
              id=""
              value={line1}
              placeholder="LINE 1"
              onChange={(e) => {
                setLine1(e.target.value);
                //  line2 = e.target.value
              }}
            />
            <input
              type="text"
              name=""
              id=""
              value={line2}
              placeholder="LINE 2"
              onChange={(e) => {
                setLine2(e.target.value);
                //  line2 = e.target.value
              }}
            />
            <input
              type="text"
              name=""
              id=""
              value={number}
              placeholder="PHONE NUMBER"
              onChange={(e) => {
                setNumber(e.target.value);
                //  line2 = e.target.value
              }}
            />
            <input
              type="text"
              name=""
              id=""
              value={city}
              placeholder="CITY"
              onChange={(e) => {
                setCity(e.target.value);
                //  line2 = e.target.value
              }}
            />
            {user.coutrycode === "1" ? (
              // <input
              //   type="text"
              //   name=""
              //   id=""
              //   value={state}
              //   readOnly
              //   placeholder="STATE/PROVINCE"
              //   onChange={(e) => {
              //     setState(e.target.value);
              //     //  line2 = e.st.value
              //   }}
              // />
              <div className={`${style.input} ${style.selectInput}`}>

                    {state.state?<input type="text" readOnly value={state.state} className={style.StateSelect}/>:
                    <input type="text" readOnly className={style.StateSelectCenter} placeholder="SELECT STATE"/>}
                    {/* <input type="text" readOnly value={state.state||"Select a State"} className={state.state?style.StateSelectHide:style.StateSelect}/> */}
                    <FaChevronDown onClick={()=>{
                        selectState?
                            setSelectState(false):setSelectState(true)
                    }}/>
                    {selectState?
                    <div className={selectState?style.AllState:style.stateUp}>
                        
                    {allState.map((stateItem)=>{
                        return(
                            <input type="text" name="state" id="state" readOnly value={stateItem.state} onClick={(e)=>{
                                checkState(stateItem,e)
                            }}/>
                        )
                    })}
                </div>
                    :""}
                    
                </div>
            ) : (
              <input
                type="text"
                name=""
                id=""
                value={state}
                placeholder="COUNTY"
                onChange={(e) => {
                  setState(e.target.value);
                  //  line2 = e.target.value
                }}
              />
            )}
            {user.coutrycode === "44" ? (
              <input
                type="text"
                name=""
                id=""
                value={zipcode}
                placeholder="POSTCODE"
                onChange={(e) => {
                  setZipCode(e.target.value);
                  //  line2 = e.target.value
                }}
              />
            ) : (
              <input
                type="text"
                name=""
                id=""
                value={zipcode}
                placeholder="ZIP/POSTAL CODE"
                onChange={(e) => {
                  setZipCode(e.target.value);
                  //  line2 = e.target.value
                }}
              />
            )}
            <button
              type="submit"
              onClick={() => {
                setIsAddressFieldShown(true);
                setisAddressField(false);
                setAddressObj({
                  line1,
                  line2,
                  city,
                  state,
                  zipcode,
                });
                numberValidation();
                // setCount(4)
                console.log(addressObj);
              }}
              disabled={
                line1 === "" ||
                line2 === "" ||
                city === "" ||
                state === "" ||
                zipcode === ""
              }
            >
              CONFIRM
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      <div className={style.Cart}>
        <div className={style.Title}>
          <p>BASKET</p>
        </div>
        {/* {loading? */}

        <div className={style.Carts}>
          {loading ? (
            <div className={style.LoaderDiv}>
              <div className={style.LoaderAnime}>
                <Lottie animationData={AllAnimation.Loader} />
              </div>
            </div>
          ) : (
            cartData.map((cart, index) => {
              return (
                <div className={style.CartItem}>
                  <div className={style.Game}>
                    <div className={style.image}>
                      <img src={cart.featured_image.thumbnail} alt="" />
                    </div>
                    <div className={style.name}>
                      <p>{cart.title}</p>
                    </div>
                  </div>
                  <div className={style.Actions}>
                    <div className={style.replay}>
                      <img
                        src={replay}
                        alt=""
                        onClick={() => {
                          console.log(cart.game_share_url);
                          setShowVideo(true);
                          // setVideoUrl(cart.video_url);
                          setUrl(cart.game_share_url);
                        }}
                      />
                    </div>
                    <div className={style.share}>
                    {shareIcons && shareId === cart.id * index ? 
                    <div className={style.ShareOverlay} onClick={()=>{
                      setShareIcons(false)
                    }}></div>
                    :""}
                      {shareIcons && shareId === cart.id * index ? (
                        <div className={style.ShareDiv}>
                          <div className={style.ShareIcon}>
                            <MdFacebook />
                          </div>
                          <div className={style.ShareIcon}>
                            <AiOutlineInstagram />
                          </div>
                          <div className={style.ShareIcon}>
                            <TfiTwitter />
                          </div>
                          <div className={style.ShareIcon}>
                            <FaTiktok />
                          </div>
                          <div className={style.ShareIcon}>
                            <AiFillYoutube />
                          </div>
                          <div className={style.ShareIcon}>
                            <MdEmail />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <img
                        src={share}
                        alt=""
                        onClick={() => {
                          shareIcons
                            ? setShareIcons(false)
                            : setShareIcons(true);
                          setShareId(cart.id * index);
                        }}
                        // onMouseLeave={()=>{
                        //   setShareIcons(false)
                        // }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {eGifting && cartData.length > 0 ? (
          ""
        ) : (
          <div className={style.Shipping}>
            <div className={style.PrimeShipping}>
              <div
                className={style.shippingIcon}
                onClick={() => {
                  if(vipData.status === true &&
                vipData.data[0].vip_token === false){
                  setPremiumPopup(true)
                }
                  if (user&&user.vip === false) {
                    setPremiumPopup(true);
                  }
                }}
              >
                <img src={primeIcon} alt="" />
              </div>
              <div className={style.selection}>
                <div className={style.price}>
                  <p>Free</p>
                </div>
                {vipData.status === true &&
                vipData.data[0].vip_token === true ? (
                  <span
                    className={style.CircleActive}
                    onClick={() => {
                //   if(vipData.status === true &&
                // vipData.data[0].vip_token === false){
                //   setPremiumPopup(true)
                // }
                  if (user&&user.vip === false) {
                    setPremiumPopup(true);
                  }
                }}
                  ></span>
                ) : (
                  <span className={style.Circle} onClick={() => {
                     if (user&&user.vip === false) {
                    setPremiumPopup(true);
                  }
                  if(vipData.status === true &&
                    vipData.data[0].vip_token === false){
                      setPremiumPopup(true)
                    }
                      if (user&&user.vip === false) {
                        setPremiumPopup(true);
                      }
                  }}></span>
                )}
              </div>
            </div>
            <div className={style.FreeShipping}>
              <div className={style.shippingIcon}>
                <p>Standard Delivery</p>
              </div>
              <div className={style.selection}>
                <div className={style.ticket}>
                  <img src={ticket} alt="" />
                </div>
                <div className={style.price}>
                  <p>{configuration?.STANDARD_SHIPPING_PRICE}</p>
                </div>

                {vipData.status === false ? (
                  <span
                    className={style.CircleActive}
                    onClick={() => {
                      // setPrime(false);
                    }}
                  ></span>
                ) : vipData.status === true &&
                  vipData.data[0].vip_token === false ? (
                  <span
                    className={style.CircleActive}
                    onClick={() => {
                      // setPrime(false);
                    }}
                  ></span>
                ) : (
                  <span
                    className={style.Circle}
                    onClick={() => {
                      // setPrime(true);
                    }}
                  ></span>
                )}
              </div>
            </div>
          </div>
        )}
        {emptyCart ? (
          <div className={style.popup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              <p>
                Woah! You're cart is empty, <br />
                Play Some Games
              </p>
            </div>
            <div className={style.ReportPopupButton}>
              <button
                onClick={() => {
                  setEmptyCart(false);
                  setCount(4);
                }}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.DeliveryAddress}>
          <div className={style.AddressHeadSeciton}>
            <div className={style.AddressTitle}>
              <p>Delivery Address</p>
            </div>
            <div className={style.AddressEditBtn}>
              <button
                onClick={() => {
                  setIsAddressFieldShown(false);
                  console.log("Edited");
                  setisAddressField(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
          <div className={style.AddressSection}>
            <input
              type="text"
              placeholder="House"
              value={user ? user.username : "-"}
            />
            <input
              type="text"
              placeholder="Line 1"
              value={user ? user.addressline1 : "-"}
            />
            <input
              type="text"
              placeholder="Line 2"
              value={user ? user.addressline2 : "-"}
            />
            <input
              type="text"
              placeholder="City"
              value={user ? user.city : "-"}
            />
            <input
              type="text"
              placeholder="Country"
              value={user ? user.state : "-"}
            />
            <input
              type="text"
              placeholder="Postcode"
              value={user ? user.zipcode : "-"}
            />
          </div>
        </div>
        <div className={style.Checkout}>
          <button style={{filter:loading||user?.addressline1===""||count>4||cartData.length<=0?"grayScale(1)":"grayScale(0)",pointerEvents:count>4||cartData.length<=0||loading?"none":"visible"}}
            onClick={() => {
              const parsedPoint = user && parseInt(user.point);
              const parsedPrice =
                configuration &&
                parseInt(configuration.STANDARD_SHIPPING_PRICE);
              checkCount();
              console.log(count, "count");
              // console.log(typeof saved)
              console.log(saved, "isBundleReminder from t");
              console.log(isVipShown, "isVip from t");
              console.log(isAddressShown, "isAddress from t");

              if (saved === "false") {
                console.log(isBundleReminder, "isBundleReminder");
                setIsBundleReminder(true);
                console.log(isBundleReminder, "isBundleReminder");
                saved = localStorage.getItem("SaveShipping");
                if (parsedPoint < parsedPrice) {
                  setCount(3);
                  console.log("count jumbed 2");
                }
              }
              // if(count===1){
              //   console.log(isVip,"isVip")
              //   setIsVip(true)
              //   console.log(isVip,"isVip")
              // }
              // if(count===2){
              //   console.log(isAddress,"isAddress")
              //   setIsAddress(true);
              //   console.log(isAddress,"isAddress")
              // }
              // if(count===3){
              //   setEmptyCart(true);
              // }

              // else if(count===0){
              //   console.log(count,"count = 0");
              //   if(saved===false){
              //   setIsBundleReminder(true);
              //   }
              //   else{
              //     setCount(1);
              //   }

              // }
              else {
                console.log("false");
                // if(user&&parseInt(user.point)>configuration&&parseInt(configuration.STANDARD_SHIPPING_PRICE)&& vipData.status === false){
                //   setCount(3)
                //   console.log("count jumbed 2")
                // }
                if (count === 1) {
                  setCount(2);
                  if (vipData.status === true) {
                    setIsVip(true);
                    console.log(isVip, "isVip");
                  } else {
                    setCount(2);
                  }
                  if (parsedPoint < parsedPrice) {
                    setCount(3);
                    console.log("count jumbed 2");
                  } else {
                    console.log("reached here instead");
                  }
                }
                // else{

                // }
                // else if(count ===1&&vipData.status===false){
                //   setIsVipShown(true)
                //   lowPoint();
                // console.log(isBundleReminder,"isBundleReminder")
                // }
                if (count === 2) {
                  console.log("checking");
                  if (parsedPoint > parsedPrice) {
                    // if(user&&parseInt(user.point)<configuration&&parseInt(configuration.STANDARD_SHIPPING_PRICE)){
                    setIsAddress(true);

                    setCount(4);
                    console.log("count jumbed 2");
                  } else {
                    console.log(user && parseInt(user.point));
                    console.log(
                      configuration &&
                        parseInt(configuration.STANDARD_SHIPPING_PRICE)
                    );
                    console.log(parsedPoint > parsedPrice);
                    setCount(3);
                    lowPoint();
                    console.log(isBundleReminder, "isBundleReminder");
                  }
                  // continue
                }
                if (count === 3) {
                  setCount(4);
                  setIsAddress(true);
                  console.log(isAddress, "isAddress");
                }
                if (count === 4) {
                  setCount(5);
                  console.log("Checked out");
                  checkoutAPi();
                  // navigate("/order-confirmed");
                }
              }
            }}
            disabled={loading}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
