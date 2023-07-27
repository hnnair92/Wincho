import React, { useEffect, useState, useRef } from "react";
import style from "./Home.module.css";
import backgroundData from "../../Api/backgroundJson";
import Lottie from "lottie-react";
import AboutData from "../../Api/AboutImage";
import playBtn from "../../assests/Asset 602-300ppi.png";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import supportContact from "../../assests/Full Support Box.png";
import AppStore from "../../assests/pngwing.com (4).png";
import { bgImage } from "./BgImage.js";
import { assets } from "../Description/assests";
import { AboutBg } from "./AboutImage";
import videoSrc from "../../assests/video/promo_mobile.mp4";
import VideoSrcHome from "../../assests/video/promo_desktop.mp4";
import winchaIcons from "../../assests/Wincha HomePage Logo.png";
import { baseUrl } from "../url";
import ReactPlayer from "react-player";
import PlayStore from "../../assests/google-play-badge.png"

const Home = () => {
  const navigate = useNavigate();
  const [scrollNav, setScrollNav] = useState(false);
  // add styles according to the height
  const vidRef1 = useRef(null);
  const vidRef2 = useRef(null);
  const vidRef3 = useRef(null);
  const setPlayBack = () => {
    vidRef1.current.playbackRate = 1.5;
    vidRef2.current.playbackRate = 1.5;
    vidRef3.current.playbackRate = 1.5;
  };

  const chnageNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", chnageNav);
    console.log(scrollNav, "scrollNav");
  }, [window.scrollY]);

  const [isAddress, setIsAddress] = useState(false);
  const [id, setId] = useState(0);
  const [aboutId, setAboutId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const leftHandle = () => {
    if (id <= 0) {
      setId(AboutData.length - 1);
    } else {
      setId(id - 1);
    }
  };
  const rightHandle = () => {
    if (id >= AboutData.length - 1) {
      setId(0);
    } else {
      setId(id + 1);
    }
  };
  let height = window.scrollY;

  useEffect(() => {
    const time = setTimeout(() => {
      rightHandle();
    }, 5000);

    return () => clearInterval(time);
  }, [id]);
  useEffect(() => {
    height = window.scrollY;
  }, [height]);

  const [background, setBackground] = useState(
    JSON.parse(localStorage.getItem("background"))
  );
  const bgChange = () => {
    if (background === backgroundData.length) {
      setBackground(0);
      localStorage.setItem("background", JSON.stringify(0));
    } else if (background < backgroundData.length - 1) {
      // setBackground(background+1)
      localStorage.setItem("background", JSON.stringify(background + 1));
      console.log(
        JSON.parse(localStorage.getItem("background")),
        "this is the value"
      );
      console.log(background, "this is the state");
    } else {
      localStorage.setItem("background", JSON.stringify(0));
    }
  };

  useEffect(() => {
    bgChange();
  }, []);

  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  useEffect(() => {
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  async function SupportTicket(e) {
    await fetch(`${baseUrl}/user/account/details`, {
      method: "POST",
      body: JSON.stringify({
        username: name,
        phone_number: PhoneNumber,
        email: email,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className={style.Container}>
      <div className={style.Home} id="home">
        <div className={style.Transition}>
          <Lottie
            animationData={backgroundData[background ? background : 0]}
            loop={true}
          />
          ;
          <Link to="/prizes">
            <div className={style.PlayBtn}>
              <img src={playBtn} alt="" />
            </div>
          </Link>
          <div className={style.Crane}>
            {/* <Lottie animationData={WinchaIcon} loop={false} />; */}
            <img src={winchaIcons} alt="" />
          </div>
        </div>
        <div className={style.About} id="about">
          <div className={style.Image}>
            <img
              src={AppStore}
              alt=""
              className={style.AppStore}
              onClick={() => {
                window.open(
                  "https://apps.apple.com/gb/app/wincha/id1604147807"
                );
              }}
            />
            <img
              src={PlayStore}
              alt=""
              className={style.PlayStore}
              onClick={() => {
                window.open("https://play.google.com/store/apps/details?id=com.bandai.wincha");
              }}
            />
            <div className={style.LeftIcons}>
              <span>
                <HiOutlineChevronLeft
                  onClick={() => {
                    leftHandle();
                  }}
                />
              </span>
            </div>
            <div className={style.Slider}>
              <img src={AboutData[id]} alt="" />
            </div>
            <div className={style.Slidernav}>
              {AboutData.map((item, index) => {
                return (
                  <div className={style.CircleNav}>
                    <button
                      onClick={() => {
                        setId(index);
                      }}
                      className={id === index ? style.Active : style.NonActive}
                    ></button>
                  </div>
                );
              })}
            </div>
            <div className={style.RightIcons}>
              <span>
                <HiOutlineChevronRight
                  onClick={() => {
                    rightHandle();
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={style.Watch} id="watch">
          <div className={style.Image}>
            <div className={style.Slider}>
              {/* <video autoplay loop muted>
                <source src={videoSrc} type="video/mp4" />
              </video> */}
              {/* <video autoplay loop muted playsinline src={videoSrc} type="video/mp4" ref={videoRef2}>
            <source src={videoSrc} type="video/mp4" />
          </video> */}
              {/* <video
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline
                ref={vidRef1}
                onCanPlay={() => setPlayBack()}
              >
                <source src={videoSrc} type="video/mp4" />
              </video> */}
               <div
                dangerouslySetInnerHTML={{
                  __html: `
                  <video
                    loop
                    muted
                    autoplay
                    playsinline
                    preload="metadata"
                  >
                  <source src="${videoSrc}" type="video/mp4" />
                  </video>`
                }}
              />
              {/* :""} */}
            </div>
          </div>
        </div>
        <div className={style.Support} id="support">
          <div className={style.SupportContent}>
            <div className={style.ContactSection}>
              <p>Support</p>
              <p className={style.StrokeContact}>WE'RE HERE TO HELP</p>
              <div className={style.Contact}>
                {/* <div className={style.Logo}> */}
                <img
                  src={supportContact}
                  alt=""
                  onClick={() => {
                    setIsAddress(true);
                  }}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddress ? (
        <div className={style.popup}>
          <div
            className={style.Overlay}
            onClick={() => {
              setIsAddress(false);
            }}
          ></div>
          <div className={style.popupSection}>
            <div className={style.popupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.popupText}>
              {/* <p>{vipData.vip_discription}</p> */}
              <form action="">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </form>
              {/* <p>fhf</p> */}
            </div>
            <div className={style.ReportPopupButton}>
              <button
                onClick={() => {
                  // setisAddressField(true);
                  // setIsAddressShown(true);
                  // setIsAddress(false);
                  setIsAddress(false);
                  //  setCount
                  SupportTicket();
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
      <div className={style.MHome}>
        <div className={style.Mtransition}>
          <div className={style.MTransitionBg}>
            <img src={bgImage[background ? background : 0]} alt="" />
          </div>
          <div className={style.MTransitionContent}>
            <div
              className={style.MPlayBtn}
              onClick={() => {
                navigate("/prizes");
              }}
            >
              <img src={playBtn} alt="" />
            </div>

            <div className={style.MAppStore}>
              <div className={style.appStore}>
                <img
                  src={AppStore}
                  alt=""
                  onClick={() => {
                    window.open(
                      "https://apps.apple.com/gb/app/wincha/id1604147807"
                    );
                  }}
                />
              </div>
              <div className={style.playStore}>
                <img
                src={PlayStore}
                alt=""
                onClick={() => {
                  window.open("https://play.google.com/store/apps/details?id=com.bandai.wincha");
                }}
              />
              </div>
            </div>
          </div>
          <div className={style.MCrane}>
            <img src={winchaIcons} alt="" />
          </div>
        </div>
        <div className={style.MAbout}>
          <div className={style.Image}>
            <div className={style.LeftIcons}>
              <span>
                <HiOutlineChevronLeft
                  onClick={() => {
                    leftHandle();
                  }}
                />
              </span>
            </div>
            <div className={style.Slider}>
              <img src={AboutBg[id]} alt="" />
            </div>
            <div className={style.Slidernav}>
              {AboutBg.map((item, index) => {
                return (
                  <div className={style.CircleNav}>
                    <button
                      onClick={() => {
                        setId(index);
                      }}
                      className={id === index ? style.Active : style.NonActive}
                    ></button>
                  </div>
                );
              })}
            </div>
            <div className={style.RightIcons}>
              <span>
                <HiOutlineChevronRight
                  onClick={() => {
                    rightHandle();
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={style.MWatch}>
        <div
      dangerouslySetInnerHTML={{
        __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${VideoSrcHome}" type="video/mp4" />
        </video>`
      }}
    />
          {/* <video
            autoPlay
            muted={true}
            loop
            playsInline
            ref={vidRef2}
            onCanPlay={() => setPlayBack()}
          >
            <source src={VideoSrcHome} type="video/mp4" />
          </video> */}
        </div>

        <div className={style.MWatchLandscape}>
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline
            ref={vidRef1}
            onCanPlay={() => setPlayBack()}
          >
          {/* <video id="v-control" width="100%" autoplay="autoplay" loop muted playsInline> */}
          
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc} type="video/avif"/>
          </video>
          {/* <iframe src="https://player.vimeo.com/video/838092334?title=0&amp;byline=1&amp;portrait=1&amp;muted=1&amp;autoplay=1&amp;autopause=0&amp;dnt=1&amp;loop=1&amp;background=1&amp;app_id=122963" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="1" style={{position:'absolute',top:'0',left:'0',width:'100%',height:'100vh'}} title="Other Things - BNAE - Website Sizzle - V1.mp4" data-ready="true"></iframe> */}
        </div>

        <div className={style.MSupport} id="supports">
          <div className={style.SupportContent}>
            <div className={style.ContactSection}>
              <p>Support</p>
              <p className={style.StrokeContact}>WE'RE HERE TO HELP</p>
              <div className={style.Contact}>
                <img
                  src={supportContact}
                  alt=""
                  onClick={() => {
                    setIsAddress(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
