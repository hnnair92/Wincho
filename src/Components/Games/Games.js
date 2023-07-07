import React, { useEffect, useRef, useState } from "react";
import style from "./Games.module.css";
import Ticket from "../../assests/golden-ticket.png";
import info from "../../assests/info.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  configutation,
  getAllGames,
  getProductByCollection,
} from "../../actions/product";
import Loader from "../Loader/Loader";
import labelNew from "../../assests/New Banner.png";
import closeIcon from "../../assests/Search X.png";
import searchIcon from "../../assests/Search Icon.png";
import eye from "../../assests/Password Eye.png";
// import info from "../../assests/Information Icon.png";
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png";
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png";
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png";
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png";
import CloseImage from "../../assests/Artboard 48 X.png";
import Lower from "../../assests/Artboard 48 - Lower Image Split.png";
import Upper from "../../assests/Artboard 48 - Upper Image Split.png";
import { assets } from "../Description/assests";
import Lottie from "lottie-react";
import { AllAnimation } from "../../Animation/allAnimation";
import { baseUrl } from "../url";
import { music } from "../../assests/Musics/allMusic";
import { registerAction, updateProfile } from "../../actions/user";
import NewLoader from "../NewLoader/NewLoader";


const Games = ({ gameMusic, setGameMusic, gameSound, setGameSound }) => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;
  const audioRef = useRef(null);
  const [startTouchData,setStartTouchData] = useState({})
  const [endTouchData,setEndTouchData] = useState({})
  const [moveTouchData,setMoveTouchData] = useState([])
  const token = JSON.parse(localStorage.getItem("token"));
  const buttonRef = useRef(null)
  const button2Ref = useRef(null)
  let audioStatus = localStorage.getItem("sound");
  //   const baseUrl = "https://uat.wincha-online.com"
  // // const baseUrl = "https://uat.wincha-online.com";
  const { configuration } = useSelector((state) => state.configuration);

  const [musicStatus, setMusicStatus] = useState(
    localStorage.getItem("music")
      ? localStorage.getItem("music")
      : localStorage.setItem("music", JSON.stringify("false"))
  );
  const [termsVersion, setTermsVersion] = useState(false);
  const [verifyEmail, setVerifyMails] = useState(false); // const [verifyEmail,setVerifyMails] = useState(localStorage.getItem("verfiedEmail")?localStorage.getItem("verfiedEmail"):localStorage.setItem("verfiedEmail",JSON.stringify(true)))
  let { products, loading } = useSelector((state) => state.collectionProducts);
  const [popup, setPopup] = useState(false);
  const audioRefHome = useRef(null);
  const [resendEmail, setResendEmail] = useState(false);
  const [gameData, setGameData] = useState({});
  const [premiumPopup, setPremiumPopup] = useState(true);
  
  const { user } = useSelector((state) => state.profile);
  const [searchIconStatus, setSearchIconStatus] = useState(false);
  
  const userId =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

 
  const navigate = useNavigate();
  const [topup, setTopup] = useState(false);
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState(false);
  const [category, setCategory] = useState(
    state && state.category ? state.category : "free"
  );
  const [history, setHistory] = useState(false);
  const [ids, setId] = useState("");
  const [imageGallery, setImageGallery] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [countSection, setCountSection] = useState(0);
  const [rightAmount, setRightAmount] = useState(0);
  const [categorySlide, setCategorySlide] = useState(2);
  const [times, setTimes] = useState(localStorage.getItem("times") || 0);
  const scrollRefDiv = useRef(null)
  const checkPlayArray =
    localStorage.getItem("checkPlay") &&
    JSON.parse(localStorage.getItem("checkPlay"));
  const verifiedEmail =
    JSON.parse(localStorage.getItem("verfiedEmail")) &&
    JSON.parse(localStorage.getItem("verfiedEmail"));
  useEffect(()=>{
    if(window.innerWidth>375&&window.innerWidth<850){
      setCategorySlide(2)
    }
    else if(window.innerWidth>750&&window.innerWidth<1060){
      setCategorySlide(12)
    }
    else if(window.innerWidth>1010&&window.innerWidth<1075){
      setCategorySlide(12)
    }
    else if(window.innerWidth>1075){
      setCategorySlide(2)
    }
  },[window])
  useEffect(() => {
    console.log(times);
    console.log(typeof times);
  });
  useEffect(()=>{
    console.log(startTouchData)
  },[startTouchData])
  useEffect(()=>{
    console.log(endTouchData)
  },[endTouchData])
  useEffect(()=>{
    const categoryIndex = categories.findIndex(
        (item)=>item.value === category
        
        );
    if(startTouchData&&endTouchData){
      console.log((startTouchData.clientX/endTouchData.clientX)*100);
      console.log(endTouchData.clientX-startTouchData.clientX>100)
      console.log(endTouchData.clientX-startTouchData.clientX<-100)
      if(endTouchData.clientX-startTouchData.clientX>100){
        console.log(scrollRefDiv.current);

        if(categoryIndex===0){
          setCategory(categories[categories.length-1].value)
          // setCategorySlide(-50)
          
          setRightAmount()
          setEndTouchData({})
          setStartTouchData({})
        }
        else{

          setCategory(categories[categoryIndex-1].value)
          // setCategorySlide((categorySlide)=>categorySlide-)

          // setRightAmount((moveTouchData/window.innerWidth)*100)
          setEndTouchData({})
          setStartTouchData({})
        }
        
      }
      else if(endTouchData.clientX-startTouchData.clientX<-100){
        console.log(scrollRefDiv.current);
        if(categories.length-1===categoryIndex){
          setCategory(categories[0].value)
          // setCategorySlide(0)
          setEndTouchData({})
          setRightAmount(0)
          setStartTouchData({})
        }
        else{
          setCategory(categories[categoryIndex+1].value)
          setEndTouchData({})
          // setRightAmount(0)
          // setCategorySlide((10*categoryIndex+2)*-1)
          console.log(categoryIndex+1*-1)
          console.log(categoryIndex+2)
          console.log(category.value)

          // setRightAmount((moveTouchData/window.innerWidth)*100)
          setStartTouchData({})
          scrollRefDiv.current.scrollLeft += 50
        }
      }

    } 
  },[startTouchData,endTouchData])
  useEffect(() => {
    if (verifiedEmail === false || verifiedEmail === "false") {
      setVerifyMails(true);
    } else {
      setVerifyMails(false);
    }
    console.log(verifiedEmail);
  }, []);
  useEffect(() => {
    if (user?.profile_status === true || user?.profile_status === "false") {
      localStorage.setItem("verfiedEmail", JSON.stringify(true));
    }
    // else{
    //   localStorage.setItem("verfiedEmail",JSON.stringify(true))
    // }
  }, [user]);
  useEffect(() => {
    if (verifiedEmail) {
      localStorage.setItem("verfiedEmail", JSON.stringify(verifiedEmail));
    }
  }, [verifiedEmail]);
  useEffect(() => {
    console.log(verifyEmail);
  }, [verifyEmail]);
  useEffect(() => {
    const getTimes = localStorage.getItem("times");
    if (
      getTimes === null ||
      getTimes === undefined ||
      getTimes === "undefined"
    ) {
      localStorage.setItem("times", 0);
    }
  });
  useEffect(() => {
    const checkEmailVerify = JSON.parse(localStorage.getItem("verifyCheck"));
    if (checkEmailVerify) {
      if (checkEmailVerify === true) {
        setVerifyMails(false);
      } else if (checkEmailVerify === false) {
        setVerifyMails(true);
      } else {
        localStorage.removeItem("verifyCheck");
      }
    }
  });
  // console.log(imageGallery)
  // useEffect(()=>{
  //   if(times>=configuration.FREE_PLAY_LIMIT){
  //     setTopup(true)
  //   }
  // })
  async function playAudioBg() {
    console.log(musicStatus, "musicStatus");
    // if(musicStatus==="true"){
    // console.log(audioRefHome.current.play(), "from its function");
    // audioRefHome.current.volume=1;
    audioRefHome.current.src = music.Menu;
    audioRefHome.current.play();
    // console.log(audioRefHome.current.volume, "from its function");

    // }
    // else{
    //   audioRefHome.current.volume = 0;

    // }
  }
  async function freePlay() {
    // const
    console.log(checkPlayArray, "checkPlayArray 1");
    // console.log(checkPlayArray.length,"checkPlayArray 1")
    //  checkPlayArray.map((freePlayData)=>{
    //       console.log(freePlayData,"freePlayData out")
    //       if(freePlayData.id===userId){
    //         console.log(freePlayData,"freePlayData in")
    //         // console.log("Same Person")
    //       }
    //       else{

    //       }
    //     })
  }
  useEffect(() => {
    freePlay();
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(() => {
    console.log("its below",gameMusic,gameSound)

    console.log(gameSound === 1, "gameSound");
    console.log(typeof gameSound, "gameMusic");
    if (gameSound === 1 || gameSound === 1) {
      console.log(audioRef.current.volume);
      audioRef.current.volume = 1;
      console.log("true for gameMusic");
      console.log(audioRef.current.volume);
    } else {
      audioRef.current.volume = 0;
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof setGameSound);
  }, [gameMusic,gameSound,window]);

  useEffect(() => {
    console.log("its below",gameMusic,gameSound)

    if (gameMusic === 1 || gameMusic === 1) {
      console.log(audioRefHome.current.volume);
      audioRefHome.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    if (gameSound === 1 || gameSound === 1) {
      console.log(audioRef.current.volume);
      audioRef.current.volume = 1;
      playAudioBg();
    } else {
      console.log(typeof gameMusic);
      console.log("not reached");
    }
    console.log(typeof gameMusic);
  }, [window,gameMusic])
  async function playAudio(src) {
    console.log(audioStatus, "audioStatus");
    if (audioStatus === "true") {
      console.log("reached here");
      audioRef.current.volume = 1;
      audioRef.current.src = src;
      audioRef.current.play();
    } else {
      audioRef.current.volume = 0;
    }
  }
  useEffect(() => {
    console.log("its below",gameMusic,gameSound)
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
  }, [window,gameMusic]);
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

  async function resendEmailApi() {
    setLoadingScreen(true);
    await fetch(`${baseUrl}/user/verification/resend`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingScreen(false);
        setResendEmail(false);
      });
  }
  useEffect(() => {
    if (popup === false) {
      setImageGallery([]);
    }
  }, [popup]);
  // useEffect(()=>{
  //   if(window.innerWidth<=767){
  //     setSearchIconStatus(false)
  //   }
  //   else{
  //     setSearchIconStatus(true)
  //   }
  // },[window.innerWidth])
  const premiumData = JSON.parse(localStorage.getItem("premium"));
  useEffect(() => {
    console.log(premiumData);
    console.log(premiumPopup && user?.vip === false);
    console.log(user?.profile_status === true);
    console.log(user?.username !== "");
    if (premiumData === null || premiumData === undefined) {
      localStorage.setItem("premium", JSON.stringify(false));
      if (category === "free" || category === "Free") {
        setPremiumPopup(false);
      } else {
        // else if(category==="free"||category==="Free"){
        // setPremiumPopup(true)
      }
    } else {
      if (premiumData === "true" || premiumData === true) {
        if (category === "free" || category === "Free") {
          setPremiumPopup(false);
        } else {
          // else if(category==="free"||category==="Free"){
          setPremiumPopup(false);
        }
      } else if (premiumData === "false" || premiumData === false) {
        if (category === "free" || category === "Free") {
          setPremiumPopup(false);
        } else {
          // else if(category==="free"||category==="Free"){
          // setPremiumPopup(true)
        }
      }
    }
  }, [category]);
  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [popup]);
  // const [category, setCategory] = useState(searchArray.length>0?"":"free");
  const dispatch = useDispatch();
  const response = {
    category_id: category,
    country_code: configuration.COUNTRY_NAME,
    user_id: user && user.user_id,
  };
  // useEffect(()=>{
  //   if(search!==""){
  //     setCategory("")
  //   }
  //   else{
  //     setCategory("free")
  //   }
  // },[search])
  useEffect(() => {
    if (searchArray.length > 0) {
      // setCategory("");
    }
  }, [category]);
  // useEffect(() => {
  //   if (search!=="") {
  //     setCategory("");
  //   }
  //   else{
  //     setCategory(state?state.category:"free")
  //   }
  // }, []);

  async function checkFreePlay() {
    const userBody = {
      user: user&&user.username===""?"":userId,
      device_id: user&&user.username===""?JSON.parse(localStorage.getItem("deviceId")):"",
    };
    await fetch(`${baseUrl}/game/freeplay/limit`, {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(userBody);
        // changeFreePlayDaily()
        if(times===undefined||times===null){
          localStorage.setItem(
            "times",
            JSON.stringify(data.data[0].freeplay_limit)
          );
        }
        else{
          setTimes(JSON.parse(localStorage.getItem("times")))
        }
        // :localStorage.setItem("times", JSON.stringify(data.data[0].freeplay_limit))
      });
  }
  const searchApi = async () => {
    loading = true;
    await fetch(`${baseUrl}/product/search`, {
      method: "POST",
      body: JSON.stringify({
        search_key: search,
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        loading = false;
        console.log(data);
        setSearchArray(data.data);
        // products.push(data)
        // console.log(search)
      });
  };
  useEffect(() => {
    searchApi();
  }, [search]);
  useEffect(()=>{
    console.log(times>=configuration.freeplay_limit)
    console.log(times)
    console.log(configuration.FREE_PLAY_LIMIT)
  },[times])
  useEffect(() => {
    // if (category === "all") {
    //   dispatch(getAllGames(response));
    // } else {
    dispatch(getProductByCollection(response));
    dispatch(configutation());
    // }
    if (user === undefined) {
      // navigate("/login");
    }
    checkFreePlay();
  }, [dispatch, category, id,user]);
  useEffect(()=>{
    checkFreePlay()
  },[])
  useEffect(() => {
    // console.log(user&&user.username.length)
    console.log("hello world!");
  });
  const deviceId = JSON.parse(localStorage.getItem("deviceId"))
  const newDate = new Date()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  const date = newDate.getDate()
  const day = newDate.getDay()
  const CustomDate = new Date(year,month+1,0)
  const lastDateOfTheMonth = CustomDate.getDate()
  const utc = newDate.getUTCMilliseconds()
  const milliseconds = newDate.getTime()
  useEffect(()=>{
    if(deviceId===null){
      localStorage.setItem("deviceId",JSON.stringify(milliseconds*utc))
    }
  })
  useEffect(()=>{
    const userRegAnom = {
      username:"",
      email:"",
      password:"",
      dob:"",
      country:"",
      state:"",
      countrycode:configuration&&configuration.COUNTRY_CODE,
      countryname:configuration&&configuration.COUNTRY_NAME,
      user_type:"anonymous",
      device_id:deviceId?deviceId:""
      
  }
    if(userId===null){
      localStorage.setItem("deviceId",JSON.stringify(milliseconds*utc))
      if(userId===undefined){
        localStorage.removeItem("user")
      }
      const anomUserId = JSON.parse(localStorage.getItem("anom"))
      if(anomUserId){
        localStorage.setItem("user", JSON.stringify(anomUserId));
        checkFreePlay()
      }
      else{     
        dispatch(registerAction(userRegAnom))
      }
      dispatch(updateProfile())
    }
    dispatch(updateProfile())

  },[userId])
  useEffect(()=>{
    console.log(userId)
    const userRegAnom = {
      username:"",
      email:"",
      password:"",
      dob:"",
      country:"",
      state:"",
      countrycode:configuration.COUNTRY_CODE,
      countryname:configuration.COUNTRY_NAME,
      user_type:"anonymous",
      device_id:deviceId?deviceId:""
      
  }
    if(userId===undefined||userId==="undefined"){
        localStorage.removeItem("user")
      dispatch(registerAction(userRegAnom))
    dispatch(updateProfile())
      
    }
    dispatch(updateProfile())
  },[userId])

  const categories = [
    {
      title: "Free",
      value: "free",
      NoOfGames: 0,
      id: 0,
    },
    {
      title: "Plushies",
      value: "plushies",
      NoOfGames: 0,
      id: 1,
    },
    {
      title: "Novelty",
      value: "novelty",
      NoOfGames: 0,
      id: 2,
    },
    {
      title: "Collectable",
      value: "collectable",
      NoOfGames: 0,
      id: 3,
    },
    {
      title: "e-Gifting",
      value: "e-gifting",
      NoOfGames: 0,
      id: 4,
    },
    {
      title: "New",
      value: "new",
      NoOfGames: 0,
      id: 5,
    },
    {
      title: "Popular",
      value: "popular",
      NoOfGames: 0,
      id: 6,
    },
    {
      title: "All",
      value: "0",
      NoOfGames: 0,
      id: 7,
    },
  ];
  useEffect(() => {
    console.log(typeof user?.tc_version);
    console.log(typeof configuration?.TC_VERSION);
    console.log(user?.tc_version < configuration?.TC_VERSION);
    if (
      user?.tc_version < configuration?.TC_VERSION &&
      user &&
      user.username !== ""
    ) {
      if (verifyEmail === false) {
        setTermsVersion(true);
      }
    }
  }, [user, configuration]);
  useEffect(() => {
    console.log(termsVersion);
  }, [termsVersion]);
  async function updateTermsAndConditions() {
    await fetch(`${baseUrl}/user/tc/version/update`, {
      method: "POST",
      body: JSON.stringify({
        playerID: userId,
        tc_version: configuration?.TC_VERSION,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(updateProfile());
        setTermsVersion(false);
      });
  }
  useEffect(() => {
    console.log(imageGallery.length);
  });
  useEffect(() => {
    console.log(countSection);
  });
  async function vipPayment() {
    const requestData = {
      mode: "payment",
      amount: parseFloat(configuration.VIP_SUBSCRIPTION).toFixed(2) * 100,
      quantity: 1,
      success_url: `${window.location.origin}/prizes`,
      cancel_url: `${window.location.origin}/prizes/?session_id={CHECKOUT_SESSION_ID}`,
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
        "Content-Type":"application/json",
                    "access-token":`${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.assign(`${data.data[0].url}`);
      });
  }
  // const[active,setActive]= useState(false)
  const [allCategory, setAllCategory] = useState("");
  // const[getAllCategory,setGetAllCategory] = useState("")
  return (
    <div className={style.Container}>
      <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
      <audio ref={audioRef}></audio>
      {/* <div className={style.Section}> */}
      {}
      {/* <div className={style.Categories}> */}
      <div className={`${style.Categories} ${searchIconStatus===true?style.MtabSearch:""}`}>
        <div className={`${style.CategoriesSection} ${searchIconStatus===true?style.TabCategory:style.NormalCategory}`} style={{marginLeft:`${categorySlide}rem`}}>
          <div className={style.AllCategories} ref={scrollRefDiv} onScroll={(e)=>{
            console.log(e)
          }}>
            {categories.map((categoryItem, index) => {
              return (
                <button 
                  key={index}
                  value={categoryItem.value}
                  className={
                    category?.toLowerCase() ===
                    categoryItem?.value?.toLowerCase()&&search.length===0
                      ? style.active
                      : style.category
                  }
                  onClick={(e) => {
                    console.log(scrollRefDiv)
                    console.log(e)
                    setSearch("")
                    playAudio(music.Pop);
                    
                      setCategory(categoryItem.value);
                    
                    // setAllCategory("");

                    // setAllCategory(categoryItem.title)
                  }}
                >
                  {categoryItem.title}
                </button>
              );
            })}
          </div>
          <div className={style.Search}>
            <div
              className={style.SearchIcon}
              onClick={() => {
                setSearchIconStatus(true);
              }}
            >
              <img src={searchIcon} alt="" />
            </div>

            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <div className={style.EmptySearch}>
              <img
                src={closeIcon}
                alt=""
                onClick={() => {
                  setSearch("");
                  setSearchIconStatus(false);
                }}
              />
            </div>
          </div>
          {/* <div className={style.MSearch}> */}
          <div
            // className={`${style.MSearch} ${searchIconStatus===true?style.MtabSearch:""}`}
            className={style.MSearch}
            style={{
              backgroundColor: "#e1f5fb",
              border:"2px solid #efeef1",padding:"4px 15px",
            }}
          >
            <div
              className={style.SearchIcon}
              onClick={() => {
                setSearchIconStatus(true);
              }}
            >
              <img src={searchIcon} alt="" />
            </div>
            {/* {searchIconStatus ? ( */}
              <input
                type="text"
                name=""
                id=""
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            {/* ) : (
              ""
            )}
            {searchIconStatus ? (
              <div className={style.EmptySearch}>
                <img
                  src={closeIcon}
                  alt=""
                  onClick={() => {
                    setSearch("");
                    setSearchIconStatus(false);
                  }}
                />
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>

        {/* <button className={allCategory==="all"?style.active:style.category} onClick={(e)=>{
                  setAllCategory("all")
                  setCategory("")
              }}>All</button> */}
      </div>
      {/* {verifyEmail?"":""} */}
      {premiumPopup &&
      user?.vip === false &&
      user?.profile_status === true &&
      user?.username !== "" ? (
        <div className={style.clubHousePopup}>
          <div
            className={style.OverlayBg}
            onClick={() => {
              setPremiumPopup(false);
              localStorage.setItem("premium", JSON.stringify(true));
            }}
          ></div>
          <div className={style.ClubHouse}>
            <div className={style.TopImage}>
              <div
                className={style.clubHouseClose}
                onClick={() => {
                  localStorage.setItem("premium", JSON.stringify(true));
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
                 if(userId===null){
                  return navigate("/login")
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
      {resendEmail && userId !== null ? (
        <div className={style.ResendPopup}>
          <div
            className={style.popupOverlaySection}
            onClick={() => {
              setResendEmail(false);
            }}
          ></div>
          {/* {loading?
          <Lottie animationData={AllAnimation.Loader}/>
          :""} */}
          <div className={style.ResendpopupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.ResendpopupText}>
            <p>Awaiting player verification</p>
          </div>
          <div className={style.ResendpopupButton}>
            <div
              // to="/tickets"
              onClick={() => {
                // setResendEmail(false);
                // resendEmailApi()
              }}
            >
              <button
                onClick={() => {
                  // setResendEmail(false);
                  resendEmailApi();
                }}
              >
                RESEND EMAIL
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {verifyEmail === true &&
      user?.profile_status === false &&
      user?.username !== "" ? (
        <div className={style.resendPopupFirst}>
          <div
            className={style.popupOverlaySection}
            onClick={() => {
              setVerifyMails(false);
            }}
          ></div>
          {/* {loading?
          <Lottie animationData={AllAnimation.Loader}/>
          :""} */}
          <div className={style.resendPopupBottomSection}>
            <div className={style.ResendpopupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.ResendpopupText}>
              <p>
                We need to verify your email address in order to complete your
                setup.
                <br />
                Please check your inbox
              </p>
            </div>
            <div className={style.ResendpopupButton}>
              <div
                // to="/tickets"
                onClick={() => {
                  // setResendEmail(false);
                  // resendEmailApi()
                }}
              >
                <button
                  onClick={() => {
                    // localStorage.setItem("music", JSON.stringify(false))
                    localStorage.setItem("verfiedEmail", JSON.stringify(true));
                    // localStorage.setItem("verfiedEmail",JSON.stringify(true))
                    // setResendEmail(false);
                    setVerifyMails(false);
                    resendEmailApi();
                    if (
                      user?.tc_version < configuration?.TC_VERSION &&
                      user &&
                      user.username !== ""
                    ) {
                      setTermsVersion(true);
                    }
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {termsVersion ? (
        <div className={style.ResendPopup}>
          <div
            className={style.popupOverlaySection}
            onClick={() => {
              setResendEmail(false);
            }}
          ></div>
          <div className={style.ResendPopupDiv}>
            <div className={style.ResendpopupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.ResendpopupText}>
              <p>
                We have changed our terms of Use and Privacy Policy. Please
                review the change(s).
              </p>
            </div>
            <div className={style.ResendpopupButton}>
              <div
                // to="/tickets"
                onClick={() => {
                  updateTermsAndConditions();
                  // setResendEmail(false);
                  // resendEmailApi()
                }}
              >
                <button
                  onClick={() => {
                    // setResendEmail(false);
                    resendEmailApi();
                  }}
                >
                  ACCEPT
                </button>
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
      {loading ? (
        <NewLoader />
      ) : (
        <div className={style.Games} style={{right:`${rightAmount}%`}} onTouchStart={(e)=>{
          console.log("started")
          setEndTouchData({})
          // setRightAmount(0)
          setStartTouchData(e.changedTouches[0])
          // console.log(window)
          console.log(e)

        }}  onTouchMove={(e)=>{
          const categoryIndex = categories.findIndex(
        (item)=>item.value === category
        
      );
          setMoveTouchData(e.changedTouches[0])
     

          // if(categories.length-1===categoryIndex){
          // setRightAmount(0)

          // }
          // setRightAmount(((e.changedTouches[0].clientX-startTouchData.clientX)/window.innerWidth)*100*(-1))
          console.log((e.changedTouches[0].clientX/window.innerWidth)*100*(-1))
          console.log(window.innerWidth)
          console.log(e.changedTouches[0].clientX)
          console.log(e.changedTouches[0])
          // console.log("Move")
          // console.log(categories[0].value)
          // console.log(category)
          // console.log(e.targetTouches[0].screenX)
          // const categoryIndex = categories.findIndex(
          //   (item)=>item.value === category
            
          //   );
          // if(e.targetTouches[0].screenX>350){
          //   console.log(e.targetTouches[0].screenX)
          //   // categories.findIndex((item)=>{
          //   //   console.log(item.value===category)
          //   // })
          //   if(categoryIndex<=0){
          //     setCategory(categories[categories.length-1].value)
          //   }
          //   else{
          //   setCategory(categories[categoryIndex-1].value)
          //   }
          //   buttonRef.current.scrollIntoView({ behavior: 'smooth' })   
          //   console.log(buttonRef.current.scrollIntoView()) 
          //   console.log(buttonRef.current) 

            
          // }
          // if(e.targetTouches[0].screenX<125){
          //   console.log(e.targetTouches[0].screenX)

          //   // setCategory("free")
          //   if(categories.length-1===categoryIndex){
          //     setCategory(categories[0].value)
          //   }
          //   else{
          //     setCategory(categories[categoryIndex+1].value)
          //   }
          //   buttonRef.current.scrollIntoView({ behavior: 'smooth' })   
          //   console.log(buttonRef.current.scrollIntoView()) 
          //   console.log(buttonRef.current) 

          // }
          // playAudio(music.Pop)
          
        }}  
        onTouchEnd={(e)=>{
          const categoryIndex = categories.findIndex(
        (item)=>item.value === category
        
        );
          setEndTouchData(e.changedTouches[0])
          console.log("End")
         console.log(e)
         setRightAmount(0)
         setMoveTouchData({})
         if(e.changedTouches[0].clientX-startTouchData.clientX>100){
        if(categoryIndex===0){
          setCategorySlide(categories.length*10*-1)
            
          }
          else{
          // setCategorySlide((10*categoryIndex+1))
          setCategorySlide((categorySlide)=>categorySlide+10)
            // setCategorySlide(((e.changedTouches[0].clientX-startTouchData.clientX)/window.innerWidth)*100*(1))

          }
      }
      else{
      // else if(e.changedTouches[0].clientX-startTouchData.clientX<100){
        if(categories.length-1===categoryIndex){
          setCategorySlide(0)
            
          }
          else{
            setCategorySlide((10*categoryIndex+2)*-1)

          }
      }
        //  setStartTouchData({})
         
        
        }}>
          {topup ? (
            <div className={style.popup}>
              <div className={style.popupImage}>
                <img src={assets.winchaPopup} alt="" />
              </div>
              <div className={style.popupText}>
                <p>Woah there you haven't got enough tickets</p>
              </div>
              <div className={style.popupButton}>
                <Link
                  to="/tickets"
                  onClick={() => {
                    setTopup(false);
                  }}
                >
                  <button>TOP UP</button>
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {!search? products.length > 0 &&
              products.map((game, index) => {
                if (category === "all" && game.category != "free") {
                  if (
                    user &&
                    user.vip === false &&
                    game.is_vip_product === false
                  ) {
                    return (
                      <div
                        className={style.Game}
                        key={index}
                        onClick={(event) => {
                          console.log("Div");
                          console.log(userId);

                          // else{

                          // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // else if(userId!=null){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // }
                          // else if(user)
                        }}
                        // className={style.parentGame}
                      >
                        {/* <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/login"} state={{game:game,user:user}} className={style.Game} key={index} onClick={(event)=>{ */}

                        <div
                          className={style.SingleGameOverlay}
                          onClick={() => {
                            if (
                              user &&
                              user.profile_status === false &&
                              user.username !== "" &&
                              game.price !== "0"
                            ) {
                              setResendEmail(true);
                              console.log("not verified");
                            } else if (
                              user &&
                              user.profile_status === false &&
                              game.price !== "0"
                            ) {
                              // setResendEmail(true);
                              navigate("/login");
                              console.log("not verified");
                            }
                            // else if(premiumData===false&&user?.vip===false){
                            //   setPremiumPopup(true)
                            // }
                            else if (
                              premiumData === false &&
                              user?.vip === false &&
                              game.price !== "0"
                            ) {
                              setPremiumPopup(true);
                            } else {
                              console.log("verified faking");
                              if (
                                user &&
                                user.username === "" &&
                                game.price !== "0"
                              ) {
                                navigate("/login");
                              } else if (
                                (game.price === "0" && userId === "") ||
                                (game.price === "0" && userId === null) ||
                                (game.price === "0" &&
                                  userId === undefined &&
                                  user?.username !== "")
                              ) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (userId != null) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (user?.username === "") {
                                navigate("/login");
                              } else {
                                navigate("/login");
                              }
                            }
                            console.log(user.profile_status, "status");
                          }}
                        ></div>
                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                            <p>Free</p>
                        </div>:""} */}

                        <div
                          className={style.Image}
                          onClick={() => {
                            console.log("images");
                          }}
                        >
                          <img src={game.featured_image.large} alt="" onLoad={()=>{
                            setLoadingScreen(false)
                            console.log("loaded")
                          }} />
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                              <div className={style.ticketIconDiv}>
                                {parseInt(times) >
                                  configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user &&
                                user.vip === false || game.machine_status === false? (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(1)" }}
                                  />
                                ) : (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(0)" }}
                                  />
                                )}
                              </div>
                              {game && game.price === "0" ? (
                                <p className={style.free}>FREE</p>
                              ) : (
                                <p className={style.Price}>{game.price}</p>
                              )}
                            </div>

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={(event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery);
                                  console.log(game.id);
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                  // if(game.id===gameData.id){
                                  setImageGallery(game.product_gallery);
                                  // }
                                  setImageGallery((imageGallery) => [
                                    ...imageGallery,
                                    { src: game.featured_image.large },
                                  ]);
                                  // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                  // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      // <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/login"} state={{game:game,user:user}} className={style.Game} key={index} onClick={(event)=>{
                      <div
                        className={style.Game}
                        key={index}
                        onClick={(event) => {
                          console.log("Div");
                          console.log(userId);

                          // else{

                          // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // else if(userId!=null){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // }
                          // else if(user)
                        }}
                        // className={style.parentGame}
                      >
                        {/* <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/login"} state={{game:game,user:user}} className={style.Game} key={index} onClick={(event)=>{ */}

                        <div
                          className={style.SingleGameOverlay}
                          onClick={() => {
                            if (
                              user &&
                              user.profile_status === false &&
                              user.username !== "" &&
                              game.price !== "0"
                            ) {
                              setResendEmail(true);
                              console.log("not verified");
                            } else if (
                              user &&
                              user.profile_status === false &&
                              game.price !== "0"
                            ) {
                              // setResendEmail(true);
                              navigate("/login");
                              console.log("not verified");
                            } else if (
                              premiumData === false &&
                              user?.vip === false &&
                              game.price !== "0"
                            ) {
                              setPremiumPopup(true);
                            } else {
                              console.log("verified faking");
                              if (
                                user &&
                                user.username === "" &&
                                game.price !== "0"
                              ) {
                                navigate("/login");
                              } else if (
                                (game.price === "0" && userId === "") ||
                                (game.price === "0" && userId === null) ||
                                (game.price === "0" &&
                                  userId === undefined &&
                                  user?.username !== "")
                              ) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (userId != null) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (user?.username === "") {
                                navigate("/login");
                              } else {
                                navigate("/login");
                              }
                            }
                            console.log(user.profile_status, "status");
                          }}
                        ></div>
                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                        <div
                          className={style.Image}
                          onClick={() => {
                            console.log("images");
                          }}
                        >
                           <img src={game.featured_image.large} alt="" onLoad={()=>{
                            setLoadingScreen(false)
                            console.log("loaded")
                          }} />
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                              <div className={style.ticketIconDiv}>
                                {(times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user &&
                                user.vip === false || game.machine_status === false? (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(1)" }}
                                  />
                                ) : (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(0)" }}
                                  />
                    ))}
                              </div>
                              {game && game.price === "0" ? (
                                <p className={style.free}>FREE</p>
                              ) : (
                                <p className={style.Price}>{game.price}</p>
                              )}
                            </div>

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={(event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery);
                                  console.log(game.id);
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                  // if(game.id===gameData.id){
                                  setImageGallery(game.product_gallery);
                                  // }
                                  setImageGallery((imageGallery) => [
                                    ...imageGallery,
                                    { src: game.featured_image.large },
                                  ]);
                                  // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                  // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                } else {
                  if (
                    user &&
                    user.vip === false &&
                    game.is_vip_product === false
                  ) {
                    return (
                      // <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/register"} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                      <div
                        className={style.Game}
                        key={index}
                        onClick={(event) => {
                          console.log("Div");
                          console.log(userId);

                          // else{

                          // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // else if(userId!=null){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // }
                          // else if(user)
                        }}
                      >
                        <div
                          className={style.SingleGameOverlay}
                          onClick={() => {
                            // playAudio(music.Pop)
                            if (
                              user &&
                              user.profile_status === false &&
                              user.username !== "" &&
                              game.price !== "0"
                            ) {
                              setResendEmail(true);
                              console.log("not verified");
                            } else if (
                              user &&
                              user.profile_status === false &&
                              game.price !== "0"
                            ) {
                              // setResendEmail(true);
                              navigate("/login");
                              console.log("not verified,not logined");
                            } else if (
                              premiumData === false &&
                              user?.vip === false &&
                              game.price !== "0"
                            ) {
                              setPremiumPopup(true);
                            } else {
                              console.log("verified faking");
                              if (
                                user &&
                                user.username === "" &&
                                game.price !== "0"
                              ) {
                                navigate("/login");
                              } else if (
                                (game.price === "0" && userId === "") ||
                                (game.price === "0" && userId === null) ||
                                (game.price === "0" &&
                                  userId === undefined &&
                                  user?.username !== "")
                              ) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (userId != null) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                                
                              } else if (user?.username === "") {
                                navigate("/login");
                              } else {
                                navigate("/login");
                              }
                            }
                            console.log(user.profile_status, "status");
                          }}
                        ></div>

                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                        <div
                          className={style.Image}
                          onClick={() => {
                            console.log("images");
                          }}
                        >
                           <img src={game.featured_image.large} alt="" onLoad={()=>{
                            setLoadingScreen(false)
                            console.log("loaded")
                          }} />
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                              <div className={style.ticketIconDiv}>
                                {((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false) || (game.machine_status === false) ? (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(1)" }}
                                  />
                                ) : (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(0)" }}
                                  />
                                ))}
                              </div>
                              {game && game.price === "0" ? (
                                <p className={style.free}>FREE</p>
                              ) : (
                                <p className={style.Price}>{game.price}</p>
                              )}
                            </div>

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={(event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery);
                                  console.log(game.id);
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                  // if(game.id===gameData.id){
                                  setImageGallery(game.product_gallery);
                                  // }
                                  setImageGallery((imageGallery) => [
                                    ...imageGallery,
                                    { src: game.featured_image.large },
                                  ]);
                                  // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                  // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      // <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/register"} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                      <div
                        className={style.Game}
                        key={index}
                        onClick={(event) => {
                          console.log("Div");
                          console.log(userId);

                          // else{

                          // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // else if(userId!=null){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // }
                          // else if(user)
                        }}
                      >
                        <div
                          className={style.SingleGameOverlay}
                          onClick={() => {
                            // playAudio(music.Menu)

                            if (
                              user &&
                              user.profile_status === false &&
                              user.username !== "" &&
                              game.price !== "0"
                            ) {
                              setResendEmail(true);
                              console.log("not verified");
                            } else if (
                              user &&
                              user.profile_status === false &&
                              game.price !== "0"
                            ) {
                              // setResendEmail(true);
                              navigate("/login");
                              console.log("not verified");
                            } else if (
                              premiumData === false &&
                              user?.vip === false &&
                              game.price !== "0"
                            ) {
                              setPremiumPopup(true);
                            } else {
                              console.log("verified faking");
                              if (
                                user &&
                                user.username === "" &&
                                game.price !== "0"
                              ) {
                                navigate("/login");
                              } else if (
                                (game.price === "0" && userId === "") ||
                                (game.price === "0" && userId === null) ||
                                (game.price === "0" &&
                                  userId === undefined &&
                                  user?.username !== "")
                              ) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (userId != null) {
                                if((times >= configuration.FREE_PLAY_LIMIT &&
                                  game.price === "0" &&
                                  user?.vip === false) || (game.machine_status === false)){

                                  }
                                  else{
                                    navigate(`/game/${game.slug}`, {
                                      state: {
                                        game: game,
                                        user: user,
                                        cateogry: category,
                                      },
                                    }
                                    );
                                  }
                              } else if (user?.username === "") {
                                navigate("/login");
                              } else {
                                navigate("/login");
                              }
                            }
                            //   navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                            // }
                            console.log(user.profile_status, "status");
                          }}
                        ></div>

                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                        <div
                          className={style.Image}
                          onClick={() => {
                            console.log("images");
                          }}
                        >
                           <img src={game.featured_image.large} alt="" onLoad={()=>{
                            loading = false
                            console.log(loading)
                          }} />
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                              <div className={style.ticketIconDiv}>
                                {((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false  )|| (game.machine_status === false)? (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(1)" }}
                                  />
                                ) : (
                                  <img
                                    src={Ticket}
                                    alt=""
                                    className={style.icon}
                                    style={{ filter: "grayScale(0)" }}
                                  />
                                ))}
                              </div>
                              {game && game.price === "0" ? (
                                <p className={style.free}>FREE</p>
                              ) : (
                                <p className={style.Price}>{game.price}</p>
                              )}
                            </div>

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={(event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery);
                                  console.log(game.id);
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                  // if(game.id===gameData.id){
                                  setImageGallery(game.product_gallery);
                                  // }
                                  setImageGallery((imageGallery) => [
                                    ...imageGallery,
                                    { src: game.featured_image.large },
                                  ]);
                                  // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                  // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }
              })
            : searchArray &&
              searchArray.map((game, index) => {
                if (
                  user &&
                  user.vip === false &&
                  game.is_vip_product === false
                ) {
                  return (
                    // <div to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:""} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                    <div
                      className={style.Game}
                      key={index}
                      onClick={(event) => {
                        console.log("Div");
                        console.log(userId);

                        // else{

                        // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                        // else if(userId!=null){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                        // }
                        // else if(user)
                      }}
                    >
                      <div
                        className={style.SingleGameOverlay}
                        onClick={() => {
                          // playAudio(music.Menu)

                          if (
                            user &&
                            user.profile_status === false &&
                            user.username !== "" &&
                            game.price !== "0"
                          ) {
                            setResendEmail(true);
                            console.log("not verified");
                          } else if (
                            user &&
                            user.profile_status === false &&
                            game.price !== "0"
                          ) {
                            // setResendEmail(true);
                            navigate("/login");
                            console.log("not verified");
                          } else if (
                            premiumData === false &&
                            user?.vip === false &&
                            game.price !== "0"
                          ) {
                            setPremiumPopup(true);
                          } else {
                            console.log("verified faking");
                            if (
                              user &&
                              user.username === "" &&
                              game.price !== "0"
                            ) {
                              navigate("/login");
                            } else if (
                              (game.price === "0" && userId === "") ||
                              (game.price === "0" && userId === null) ||
                              (game.price === "0" &&
                                userId === undefined &&
                                user?.username !== "")
                            ) {
                              if((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false) || (game.machine_status === false)){

                                }
                                else{
                                  navigate(`/game/${game.slug}`, {
                                    state: {
                                      game: game,
                                      user: user,
                                      cateogry: category,
                                    },
                                  }
                                  );
                                }
                            } else if (userId != null) {
                              if((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false) || (game.machine_status === false)){

                                }
                                else{
                                  navigate(`/game/${game.slug}`, {
                                    state: {
                                      game: game,
                                      user: user,
                                      cateogry: category,
                                    },
                                  }
                                  );
                                }
                            } else if (user?.username === "") {
                              navigate("/login");
                            } else {
                              navigate("/login");
                            }
                          }
                          console.log(user.profile_status, "status");
                        }}
                      ></div>
                      {/* <div className={style.Game} key={index}> */}
                      {game.new_item === true ? (
                        <div className={style.Label}>
                          {/* <p>New</p> */}
                          <img src={labelNew} alt="" />
                        </div>
                      ) : (
                        ""
                      )}
                      {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                      <div className={style.Image}>
                         <img src={game.featured_image.large} alt="" onLoad={()=>{
                            setLoadingScreen(false)
                            console.log("loaded")
                          }} />
                      </div>
                      <div className={style.Details}>
                        <p className={style.Name}>{game.title}</p>
                        <div className={style.PriceDiv}>
                          <div className={style.ticketIcon}>
                            <div className={style.ticketIconDiv}>
                              {times >= configuration.FREE_PLAY_LIMIT &&
                              game.price === "0" &&
                              user.vip === false  || game.machine_status === false? (
                                <img
                                  src={Ticket}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(1)" }}
                                />
                              ) : (
                                <img
                                  src={Ticket}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(0)" }}
                                />
                              )}
                            </div>
                            {game && game.price === "0" ? (
                              <p className={style.free}>FREE</p>
                            ) : (
                              <p className={style.Price}>{game.price}</p>
                            )}
                          </div>

                          <div className={style.infoIcon}>
                            <Link
                              // to=""
                              onClick={(event) => {
                                // if(event.target !== event.currentTarget) return;
                                // console.log(gameData.product_gallery.length)
                                console.log(gameData.product_gallery);
                                console.log(game.id);
                                // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                // if(game.id===gameData.id){
                                setImageGallery(game.product_gallery);
                                // }
                                setImageGallery((imageGallery) => [
                                  ...imageGallery,
                                  { src: game.featured_image.large },
                                ]);
                                // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                // }
                                // console.log(imageGallery,"imagegalley")
                                // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                // console.log(imageGallery[0])
                                // setImageGallery([...imageGallery[0],{
                                //   src:"sdasdsdasd as"
                                // }])

                                setId(game.id);
                                setGameData(game);
                                setPopup(true);
                              }}
                            >
                              <img src={info} alt="" className={style.info} />
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  );
                } else {
                  return (
                    // <div to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:""} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                    <div
                      className={style.Game}
                      key={index}
                      onClick={(event) => {
                        console.log("Div");
                        console.log(userId);

                        // else{

                        // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                        // else if(userId!=null){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                        // }
                        // else if(user)
                      }}
                    >
                      <div
                        className={style.SingleGameOverlay}
                        onClick={() => {
                          // audioRef.current.src = music.Menu
                          // playAudio(music.Menu)
                          if (
                            user &&
                            user.profile_status === false &&
                            user.username !== "" &&
                            game.price !== "0"
                          ) {
                            setResendEmail(true);
                            console.log("not verified");
                          } else if (
                            user &&
                            user.profile_status === false &&
                            game.price !== "0"
                          ) {
                            // setResendEmail(true);
                            navigate("/login");
                            console.log("not verified");
                          } else if (
                            premiumData === false &&
                            user?.vip === false &&
                            game.price !== "0"
                          ) {
                            setPremiumPopup(true);
                          } else {
                            console.log("verified faking");
                            if (
                              user &&
                              user.username === "" &&
                              game.price !== "0"
                            ) {
                              navigate("/login");
                            } else if (
                              (game.price === "0" && userId === "") ||
                              (game.price === "0" && userId === null) ||
                              (game.price === "0" &&
                                userId === undefined &&
                                user?.username !== "")
                            ) {
                              if((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false) || (game.machine_status === false)){

                                }
                                else{
                                  navigate(`/game/${game.slug}`, {
                                    state: {
                                      game: game,
                                      user: user,
                                      cateogry: category,
                                    },
                                  }
                                  );
                                }
                            } else if (userId != null) {
                              if((times >= configuration.FREE_PLAY_LIMIT &&
                                game.price === "0" &&
                                user?.vip === false) || (game.machine_status === false)){

                                }
                                else{
                                  navigate(`/game/${game.slug}`, {
                                    state: {
                                      game: game,
                                      user: user,
                                      cateogry: category,
                                    },
                                  }
                                  );
                                }
                            } else if (user?.username === "") {
                              navigate("/login");
                            } else {
                              navigate("/login");
                            }
                          }
                          // else{
                          //   navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                          // }
                          console.log(user.profile_status, "status");
                        }}
                      ></div>
                      {/* <div className={style.Game} key={index}> */}
                      {game.new_item === true ? (
                        <div className={style.Label}>
                          {/* <p>New</p> */}
                          <img src={labelNew} alt="" />
                        </div>
                      ) : (
                        ""
                      )}
                      {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                      <div className={style.Image}>
                         <img src={game.featured_image.large} alt="" onLoad={()=>{
                            setLoadingScreen(false)
                            console.log("loaded")
                          }} />
                      </div>
                      <div className={style.Details}>
                        <p className={style.Name}>{game.title}</p>
                        <div className={style.PriceDiv}>
                          <div className={style.ticketIcon}>
                            <div className={style.ticketIconDiv}>
                              {times >= configuration.FREE_PLAY_LIMIT &&
                              game.price === "0" &&
                              user.vip === false  || game.machine_status === false? (
                                <img
                                  src={Ticket}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(1)" }}
                                />
                              ) : (
                                <img
                                  src={Ticket}
                                  alt=""
                                  className={style.icon}
                                  style={{ filter: "grayScale(0)" }}
                                />
                              )}
                            </div>
                            {game && game.price === "0" ? (
                              <p className={style.free}>FREE</p>
                            ) : (
                              <p className={style.Price}>{game.price}</p>
                            )}
                          </div>

                          <div className={style.infoIcon}>
                            <Link
                              // to=""
                              onClick={(event) => {
                                // if(event.target !== event.currentTarget) return;
                                // console.log(gameData.product_gallery.length)
                                console.log(gameData.product_gallery);
                                console.log(game.id);
                                // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                // if(game.id===gameData.id){
                                setImageGallery(game.product_gallery);
                                // }
                                setImageGallery((imageGallery) => [
                                  ...imageGallery,
                                  { src: game.featured_image.large },
                                ]);
                                // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                // }
                                // console.log(imageGallery,"imagegalley")
                                // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                // console.log(imageGallery[0])
                                // setImageGallery([...imageGallery[0],{
                                //   src:"sdasdsdasd as"
                                // }])

                                setId(game.id);
                                setGameData(game);
                                setPopup(true);
                              }}
                            >
                              <img src={info} alt="" className={style.info} />
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  );
                }
              })}
        </div>
      )}
      {history ? <div className={style.History}></div> : ""}
      {popup === true && ids ? (
        <div className={style.PopupSection}>
          <div
            className={style.PopupOverlay}
            onClick={() => {
              setImageGallery([]);
              setCountSection(0);
              setPopup(false);
              console.log(imageGallery);
            }}
          ></div>
          <div
            className={style.Popup}
            onClick={() => {
              console.log(gameData.content.length);
              setPopup(true);
            }}
          >
            <div className={style.popupImage}>
              {gameData.product_gallery.length === 0 ? (
                <img src={gameData.featured_image.large} alt="" />
              ) : (
                <img
                  src={
                    imageGallery[imageGallery.length - 1 - countSection] &&
                    imageGallery[imageGallery.length - 1 - countSection].src
                  }
                  alt=""
                />
              )}
              {
                gameData.product_gallery.length === 0 ? (
                  ""
                ) : (
                  <div className={style.Navigation}>
                    {imageGallery.map((count, index) => {
                      return (
                        <span
                          onClick={() => {
                            setCountSection(index);
                            console.log(count.src);
                            console.log(imageGallery[index].src);
                          }}
                          className={
                            count?.src === imageGallery[countSection]?.src
                              ? style.fill
                              : style.Rounded
                          }
                        ></span>
                      );
                    })}
                  </div>
                )
                // </div>
              }
              <div className={style.popupTitle}>
                <p>{gameData.title}</p>
              </div>
              <div className={style.popupDescription}>
                {/* <p>{gameData.content}</p> */}
                {/* <p>{gameData.content.length > 10 ? gameData.content.substring(0, 125) + "..." : gameData.content}</p> */}
                <p>{gameData.content}</p>
              </div>
              {times >= configuration.FREE_PLAY_LIMIT &&
                              gameData.price === "0" &&
                              user.vip === false  || gameData.machine_status === false?
                              <div  style={{ filter: "grayScale(1)" }}
                className={style.popupPlayNow}
                onClick={() => {
                  if (
                    user &&
                    user.profile_status === false &&
                    user.username !== "" &&
                    gameData.price !== "0"
                  ) {
                    setPopup(false);
                    setResendEmail(true);
                  } 
                  else if (
                    user &&
                    user.profile_status === false &&
                    gameData.price !== "0"
                  ) {
                    // setResendEmail(true);
                    navigate("/login");
                    console.log("not verified,not logined");
                  }
                  else {
                    if(times >= configuration.FREE_PLAY_LIMIT &&
                      gameData.price === "0" &&
                      user.vip === false  || gameData.machine_status === false){

                      }
                      else{
                        navigate(`/game/${gameData.slug}`, {
                          state: { game: gameData, user: user, cateogry: category },
                        });
                      }
                  }
                }}
              >
                {/* <button></button> */}
                <p>PLAY</p>
                <div className={style.popupTicket}>
                  <img src={Ticket} alt="" />
                </div>
                {gameData && gameData.price === "0" ? (
                              <p className={style.free}>FREE</p>
                            ) : (
                              <p className={style.Price}>{gameData.price}</p>
                            )}
              </div>
                              :
                              <div  style={{ filter: "grayScale(0)" }}
                className={style.popupPlayNow}
                onClick={() => {
                  if (
                    user &&
                    user.profile_status === false &&
                    user.username !== "" &&
                    gameData.price !== "0"
                  ) {
                    setPopup(false);
                    setResendEmail(true);
                  } 
                  else if (
                    user &&
                    user.profile_status === false &&
                    gameData.price !== "0"
                  ) {
                    // setResendEmail(true);
                    navigate("/login");
                    console.log("not verified,not logined");
                  }
                  else {
                    if(times >= configuration.FREE_PLAY_LIMIT &&
                      gameData.price === "0" &&
                      user.vip === false  || gameData.machine_status === false){

                      }
                      else{
                        navigate(`/game/${gameData.slug}`, {
                          state: { game: gameData, user: user, cateogry: category },
                        });
                      }
                    
                  }
                }}
              >
                {/* <button></button> */}
                <p>PLAY</p>
                <div className={style.popupTicket}>
                  <img src={Ticket} alt="" />
                </div>
                {gameData && gameData.price === "0" ? (
                              <p className={style.free}>FREE</p>
                            ) : (
                              <p className={style.Price}>{gameData.price}</p>
                            )}
              </div>}
              
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
    </div>
  );
};

export default Games;
