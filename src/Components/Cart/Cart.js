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
import { FaChevronDown } from "react-icons/fa";
import { music } from "../../assests/Musics/allMusic";
import { baseUrl } from "../url";
const Cart = ({ gameMusic, setGameMusic, gameSound, setGameSound }) => {
  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify(false))
  );
  const audioRefHome = useRef(null);
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    console.log(gameMusic === 1, "gameSound");
    console.log(typeof gameMusic, "gameMusic");
    if (gameMusic === 1 || gameMusic === 1) {
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
    if (gameMusic === 1 || gameMusic === 1) {
      console.log(audioRefHome.current.volume);
      audioRefHome.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
  }, []);
  async function audioEnded(src) {
    if (musicStatus === "true") {
      audioRefHome.current.volume = 1;
      audioRefHome.current.src = src;
      audioRefHome.current.play();
    } else {
      audioRefHome.current.volume = 0;
    }
  }
  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
    console.log(audioRefHome.current.play(), "from its function");
    audioRefHome.current.src = music.Menu;
    audioRefHome.current.play();
    console.log(audioRefHome.current.volume, "from its function");
  }
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [premiumPopup, setPremiumPopup] = useState(false);
  const userId =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postcodetrue, setPostcodeTrue] = useState(false);
  const [phonenumber, setPhonenumber] = useState(false);
  const [allState, setAllState] = useState([]);
  const [selectState, setSelectState] = useState(false);
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
  const [products, setProducts] = useState([]);
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
  const videoRef = useRef(null);
  const [errors, setError] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [count, setCount] = useState(1);
  const checkStateExits = (state, e) => {
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
  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  const handlePauseVideo = () => {
    vidRef.current.pause();
  };
  const checkCounts = () => {
    const parsedPoint = user && parseInt(user.point);
    const parsedPrice =
      configuration && parseInt(configuration.STANDARD_SHIPPING_PRICE);
    if (saved === "true") {
      console.log(typeof saved);
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
    if (parsedPoint < parsedPrice && user.vip === false) {
      return setCount(2);
    } else if (parsedPoint > parsedPrice && user.vip === false) {
      setIsAddress(true);
      setCount(3);
      console.log("count jumbed 2");
    } else {
      setCount(1);
    }
    if (user && user.addressline1 === "") {
      return setCount(3);
    } else {
      setCount(4);
    }
    if (user && user.vip === true) {
      return setCount(1);
      console.log(user && user.vip);
    }
  };
  useEffect(() => {
    checkCounts();
  }, [user, configuration]);
  async function fetchCart() {
    await fetch(`${baseUrl}/cart/collection`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartData(data.data);
        setLoading(false);
        console.log(data);
        [...data.data].forEach((cart) => {
          setProducts((products) => [
            ...products,
            {
              id: `${cart.id}`,
              is_Egifting: cart.is_Egifting,
              quantity: "1",
              cart_id: cart.cart_id,
            },
          ]);
          if (cart.is_Egifting === false) {
            setEGifting(false);
            console.log(cart);
          }
        });
      });
  }
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
        console.log(data);
        setAllState(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    stateFetch();
  }, []);
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
      state: state,
      zipcode: zipcode,
      coutrycode: configuration.COUNTRY_CODE,
      coutryname: configuration.COUNTRY_NAME,
    };
    if (configuration.COUNTRY_CODE === "1") {
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
      };
    }
    await fetch(`${baseUrl}/user/shipping/details/update`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(body);
        console.log(data);
        dispatch(updateProfile());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function vipPayment() {
    const requestData = {
      mode: "payment",
      amount: parseFloat(configuration.VIP_SUBSCRIPTION).toFixed(2) * 100,
      quantity: 1,
      success_url: `${window.location.origin}/prizes`,
      cancel_url: `${window.location.origin}/cart/?session_id={CHECKOUT_SESSION_ID}`,
      // "currency":"inr",
      currency: configuration.CURRENCY_CODE,
      product: "vip",
      payment_mode: "vip",
      user_id: userId,
      credict_point: `${configuration.VIP_BONUS_POINT}`,
    };
    await fetch(`${baseUrl}/points/create-checkout-session`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.assign(`${data.data[0].url}`);
      });
  }
  function getVipDetails() {
    fetch(`${baseUrl}/user/vip/shipping/status`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVipData(data);
        const message = data.data[0].vip_discription.split("\n");
        setVipMessage(message);
        console.log(data);
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
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data[0].valid === true) {
          postCodeCheck();
        } else {
          setPhonenumber(true);
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
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "True") {
          addAddress();
        } else {
          setPostcodeTrue(true);
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
    };
    await fetch(`${baseUrl}/cart/checkout`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(sendData);
        setProducts([]);
        console.log(data.data[0]);
        if (data.status === "True") {
          navigate("/order-confirmed");
          dispatch(updateProfile());
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
            <video
              autoPlay
              muted={true}
              ref={videoRef}
              onCanPlay={() => setPlayBack()}
            >
              <source src={url} type="video/mp4" />
            </video>
          )}
          {}
          {}
        </div>
      </div>
    );
  }
  function lowPoint() {
    const pointInt = parseInt(user.point);
    const priceInt = parseInt(configuration.STANDARD_SHIPPING_PRICE);
    if (pointInt < priceInt) {
      setIsTopup(true);
    } else {
      setCount(3);
    }
  }
  return (
    <div className={style.Container}>
      <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
      {premiumPopup ? (
        <div className={style.clubHousePopup}>
          <div
            className={style.clubHouseOverlay}
            onClick={() => {
              setPremiumPopup(false);
            }}
          ></div>
          <div className={style.ClubHouse}>
            <div className={style.TopImage}>
              <div
                className={style.clubHouseClose}
                onClick={() => {
                  setPremiumPopup(false);
                }}
              >
                {}
                <img src={CloseImage} alt="" />
              </div>
              <img src={Upper} alt="" />
            </div>
            <div className={style.BottomContents}>
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
                <button
                  onClick={() => {
                    if (userId === null) {
                      return navigate("/login");
                    }
                    vipPayment();
                  }}
                >{`${configuration.CURRENCY_SYMBOL}${configuration.VIP_SUBSCRIPTION} / ${configuration.VIP_SUBSCRIPTION_PERIOD}`}</button>
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
              <video autoPlay muted={true}>
                <source src={url} type="video/mp4" />
              </video>
            )}
            {}
            {}
          </div>
        </div>
      ) : (
        ""
      )}
      {isVip  === true ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {vipMessage.map((text) => {
              console.log(text);
              return (
                <p className={text ? style.PopupTextContent : style.Blank}>{`${
                  text ? text : text === "" ? "Blank" : ""
                }`}</p>
              );
            })}
            <p></p>
            {}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                const parsedPoint = user && parseInt(user.point);
                const parsedPrice =
                  configuration &&
                  parseInt(configuration.STANDARD_SHIPPING_PRICE);
                setIsVip(false);
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
      {isAddress && isAddressShown === false && user&&user.addressline1 === "" ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {}
            <p>Whoops! We need your shipping details</p>
            {}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                setisAddressField(true);
                setIsAddressShown(true);
                setIsAddress(false);
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
              Woah there! Remember to bundle your prizes to save on shipping!
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
                setIsBundleReminder(false);
              }}
            >
              OK
            </button>
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
            <p>Woah there! You haven't got enough tickets</p>
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                navigate("/tickets");
                setCount(3);
                setIsTopup(false);
              }}
            >
              TOP UP
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {isAddressField === true&&userId!==null&&user&&user.username!=="" ? (
        <div className={style.Address}>
          <div
            className={style.AddressTitleOverlay}
            onClick={() => {
              // setisAddressField(false);
              // setSelectState(false);
            }}
          ></div>
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
              }}
            />
            {user.coutrycode === "1" ? (
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
                {}
                <FaChevronDown
                  className={style.Downarrow}
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
                            checkStateExits(stateItem, e);
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
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
      {checkError ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>State is not available for shipping</p>
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                setCheckError(false);
                setSelectState(true);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Cart}>
        <div className={style.Title}>
          <p>BASKET</p>
        </div>
        {}
        <div className={style.Carts}>
          {loading === false ? (
            userId !== null && user && user.username !== "" ? (
              cartData.length < 1 ? (
                <p className={style.CartEmptyText}>
                  {" "}
                  Your Basket is Currently Empty
                </p>
              ) : (
                ""
              )
            ) : (
              <p className={style.CartEmptyText}>
                {" "}
                Your Basket is Currently Empty
              </p>
            )
          ) : (
            ""
          )}
          {/* {cartData.length < 1 ? (
            <p className={style.CartEmptyText}>  Your Basket is Currently Empty” 
            
            </p>
          ) : (
            ""
          )} */}
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
                          setUrl(cart.game_share_url);
                        }}
                      />
                    </div>
                    <div className={style.share}>
                      {shareIcons && shareId === cart.id * index ? (
                        <div
                          className={style.ShareOverlay}
                          onClick={() => {
                            setShareIcons(false);
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                      {shareIcons && shareId === cart.id * index ? (
                        <div className={style.ShareDiv}>
                          <div className={style.ShareIcon}>
                            <MdFacebook
                              onClick={() => {
                                window.open("https://www.facebook.com/");
                              }}
                            />
                          </div>
                          <div className={style.ShareIcon}>
                            <AiOutlineInstagram
                              onClick={() => {
                                window.open("https://www.instagram.com/");
                              }}
                            />
                          </div>
                          <div className={style.ShareIcon}>
                            <TfiTwitter
                              onClick={() => {
                                window.open("https://twitter.com/home");
                              }}
                            />
                          </div>
                          <div className={style.ShareIcon}>
                            <FaTiktok
                              onClick={() => {
                                window.open("https://www.tiktok.com/about/");
                              }}
                            />
                          </div>
                          <div className={style.ShareIcon}>
                            <AiFillYoutube
                              onClick={() => {
                                window.open("https://www.youtube.com/");
                              }}
                            />
                          </div>
                          <div className={style.ShareIcon}>
                            <MdEmail
                              onClick={() => {
                                window.open(
                                  "https://mail.google.com/mail/u/0/#inbox?compose=new"
                                );
                              }}
                            />
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
                  if (
                    vipData.status === true &&
                    vipData.data[0].vip_token === false
                  ) {
                    setPremiumPopup(true);
                  }
                  if (user && user.vip === false) {
                    setPremiumPopup(true);
                  }
                }}
              >
                <img src={primeIcon} alt="" />
              </div>
              <div className={style.selection}>
                <div className={style.price}>
                  <p>FREE</p>
                </div>
                {vipData.status === true &&
                vipData.data[0].vip_token === true ? (
                  <span
                    className={style.CircleActive}
                    onClick={() => {
                      if (user && user.vip === false) {
                        setPremiumPopup(true);
                      }
                    }}
                  ></span>
                ) : (
                  <span
                    className={style.Circle}
                    onClick={() => {
                      if (userId === null) {
                        return navigate("/login");
                      }
                      if (user && user.vip === false) {
                        setPremiumPopup(true);
                      }
                      if (
                        vipData.status === true &&
                        vipData.data[0].vip_token === false
                      ) {
                        setPremiumPopup(true);
                      }
                      if (user && user.vip === false) {
                        setPremiumPopup(true);
                      }
                    }}
                  ></span>
                )}
              </div>
            </div>
            <div className={style.FreeShipping}>
              <div className={style.shippingIcon}>
                <p>Standard Shipping</p>
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
                    onClick={() => {}}
                  ></span>
                ) : vipData.status === true &&
                  vipData.data[0].vip_token === false ? (
                  <span
                    className={style.CircleActive}
                    onClick={() => {}}
                  ></span>
                ) : (
                  <span className={style.Circle} onClick={() => {}}></span>
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
              <p>Your Basket is Currently Empty</p>
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
        {phonenumber ? (
          <div className={style.postpopup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.phnpopupText}>
              <p>Please enter valid phonenumber </p>
            </div>
            <div className={style.popupbutton}>
              <button
                onClick={() => {
                  setPhonenumber(false);
                  setisAddressField(true);
                }}
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {postcodetrue ? (
          <div className={style.postpopup}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              <p>Postal code not matching</p>
            </div>
            <div className={style.popupbutton}>
              <button
                onClick={() => {
                  setPostcodeTrue(false);
                  setisAddressField(true);
                }}
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.Checkout}>
          <button
            style={{
              filter:
                loading ||
                count > 4 ||
                cartData.length <= 0 ||
                // user?.addressline1 === "" ||
                // user?.first_name === "" ||
                // user?.last_name === "" ||
                // user?.addressline1 === "" ||
                // user?.addressline2 === "" ||
                // user?.city === "" ||
                // user?.zipcode === "" ||
                // user?.first_name === "" ||
                count > 4 ||
                cartData.length <= 0
                  ? "grayScale(1)"
                  : "grayScale(0)",
              pointerEvents:
                count > 4 ||
                count > 4 ||
                cartData.length <= 0 ||
                // user?.addressline1 === "" ||
                // user?.first_name === "" ||
                // user?.last_name === "" ||
                // user?.addressline1 === "" ||
                // user?.addressline2 === "" ||
                // user?.city === "" ||
                // user?.zipcode === "" ||
                // user?.first_name === "" ||
                cartData.length <= 0 ||
                loading
                  ? "none"
                  : "visible",
            }}
            onClick={() => {
              const parsedPoint = user && parseInt(user.point);
              const parsedPrice =
                configuration &&
                parseInt(configuration.STANDARD_SHIPPING_PRICE);
              checkCount();
              console.log(count, "count");
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
              } else if (user && user.first_name === "") {
                setIsAddress(true);
              } else {
                console.log("false");
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
                if (count === 2) {
                  console.log("checking");
                  if (parsedPoint > parsedPrice) {
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
