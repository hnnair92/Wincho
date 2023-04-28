import React, { useState,useEffect, useRef } from 'react'
import style from './Ticket.module.css'
import Banner from '../../assests/Clubhouse Cashier without Button.png'
import Tickets from '../../Api/Tickets'
import {BsCreditCardFill} from 'react-icons/bs'
import GoldTicket from '../../assests/Floating Tab Gold Ticket.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png"
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png"
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png"
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png"
import CloseImage from "../../assests/Artboard 48 X.png"
import Lower from "../../assests/Artboard 48 - Lower Image Split.png"
import Upper from "../../assests/Artboard 48 - Upper Image Split.png"
import { assets } from '../Description/assests'
import Lottie from "lottie-react";
import { AllAnimation } from '../../Animation/allAnimation'
import { music } from '../../assests/Musics/allMusic'
import { baseUrl } from "../url";
// const stripe = require('stripe')('sk_test_51KH6LrDFlyHfJhCKutntRoVoTa8XYpTO87SE2DBpDEt4Ene6ywOnPcXz4oW365YMN9ibO8PbYfPXEebiYcxPxq2y00hZn8LeYf');

const Ticket = ({ gameMusic,
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
  const {search} = useLocation()
  async function checkoutStripe(){
    // const splitData = id.split("?")
    const checkoutId = search.split("=")
    console.log(search)
    console.log(checkoutId[checkoutId.length-1])
  }
  useEffect(()=>{
    checkoutStripe()
  })
    const [popup, setPopup] = useState(false);
    // const navigate = useNavigate()
    const [premiumPopup,setPremiumPopup] = useState(false)
    const [ticketItem, setTicketItem] = useState();
    const { configuration } = useSelector((state) => state.configuration);
    const[ tickets,setTickets] = useState([])
    const userId  = JSON.parse(localStorage.getItem("user"))
    const [resendEmail, setResendEmail] = useState(false);
    const [loading,setLoading] = useState(false)
    // const ticket
    const {user} = useSelector((state)=>state.profile)
    // const baseUrl = "https://uat.wincha-online.com"
// const baseUrl = "https://uat.wincha-online.com";
const ticket =  [
  {
      "_id": "6309fa7cc4bb207d7529f39d",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+500W+ticket.png",
      "token_amount": "3.59",
      "token_point": "500",
      "token_code": "ocp_token_500w_200720220502",
      "name": "500w_200720220502",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  },
  {
      "_id": "6309faff3d41ae9ad7d1e21c",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+1000W+ticket.png",
      "token_amount": "6.39",
      "token_point": "1000",
      "token_code": "ocp_token_1000w_200720220503",
      "name": "1000w_200720220503",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  },
  {
      "_id": "6309fbe43d41ae9ad7d1e21d",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+2000W+ticket.png",
      "token_amount": "11.99",
      "token_point": "2000",
      "token_code": "ocp_token_2000w_200720220504",
      "name": "2000w_200720220504",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  },
  {
      "_id": "6309fc523d41ae9ad7d1e21e",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+3000W+ticket.png",
      "token_amount": "15.99",
      "token_point": "3000",
      "token_code": "ocp_token_3000w_200720220505",
      "name": "3000w_200720220505",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  },
  {
      "_id": "6309fcdf3d41ae9ad7d1e21f",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+5000W+ticket.png",
      "token_amount": "27.99",
      "token_point": "5000",
      "token_code": "ocp_token_5000w_200720220506",
      "name": "5000w_200720220506",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  },
  {
      "_id": "6309fd833d41ae9ad7d1e220",
      "token_image": "https://ocp-tokens.s3.amazonaws.com/Artboard+11+-+ICON+-+10000W+ticket.png",
      "token_amount": "39.99",
      "token_point": "10000",
      "token_code": "ocp_token_10000w_200720220507",
      "name": "10000w_200720220507",
      "value": "",
      "currency_symbol": "£",
      "status": "active",
      "countrycode": "UK",
      "type": "web",
      "createdAt": "2022-08-27T11:05:32.186Z",
      "updatedAt": "2022-08-27T11:05:32.186Z",
      "__v": 0
  }
]
    const navigate = useNavigate();
    console.log(window)
    async function fetchTickets() {
       await fetch(`${baseUrl}/token/collection`, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          type: "web",
          countrycode: configuration.COUNTRY_NAME,
        }),
        headers:{
          "Content_Type":"application/json"
        }
      }).then(res=>res.json()).then((data)=>{
          console.log(data);
          setTickets(data.data)
      })
    }
    useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        // console.log(window.GetParams())
        // console.log(window.GetParams)
        console.log(window.location)
      console.log(query,"query");
      if (query.get("success")) {
          console.log("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
    })
    useEffect(()=>{
      fetchTickets()
    },[])
    useEffect(()=>{
        if(user&&user.profile_status===false){
            setResendEmail(true)
        }
    },[user])
    const showPopup = () => {
      return (
        <div
          className={style.Popup}
          onClick={() => {
            setPopup(false);
          }}
          id="popup"
        >
          <div className={style.Overlay}></div>
          <div className={style.PopupContaner}>
            <div className={style.popupImage}>
              <img src={ticketItem.token_image} alt="" />
            </div>
            <div className={style.popupContent}>
              <p>Choose Your Payment Method</p>
              <div className={style.Buttons}>
                <button
                  className={style.PopupBtn}
                  onClick={() => {
                    checkoutApi();
                  }}
                >
                  <BsCreditCardFill />
                  <p>Credit Card</p>
                </button>
                <button className={style.PopupBtn}></button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    async function checkoutApi() {
      const numberInt = Number(ticketItem.token_amount).toFixed(2)
      console.log(parseFloat(Number(ticketItem.token_amount).toFixed(2)))
      console.log(parseFloat(ticketItem.token_amount))
      console.log(typeof numberInt)
      const requestData = {
        mode: "payment",
        amount: parseFloat(ticketItem.token_amount).toFixed(2) * 100,
        quantity: 1,
        currency: configuration.CURRENCY_CODE,
        product: ticketItem.token_point,
        // success_url: "http://localhost:3000/payment/success",
        success_url: "http://localhost:3000/payment/success/?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/payment/cancel/?session_id={CHECKOUT_SESSION_ID}",
      }
      await fetch(`${baseUrl}/points/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(requestData);
          window.open(`${data.data[0].url}`);
        });
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
      // async function getData(){
      //   fetch("https://api.stripe.com/v1/checkout/sessions/cs_test_a1Med9ooCbQKaLK8ifXMZCxfwkT3WYWdBzWs25kNQF1GiJDssMY9v7vFou")
      // }
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
            setLoading(false)
            setResendEmail(false)
          });
      }
  return (
    <div className={style.Container}>
    <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
     {premiumPopup?
      <div className={style.clubHousePopup}>
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
                <button onClick={()=>{
                  if(Object.keys(user).length === 0){
                    navigate("/login")
                  }
                  else if(user&&user.profile_status===false){
                      setResendEmail(true)
                  }
                  else{
                      createPayment()
                      // setPopup(true)
                      // setTicketItem(item)
                      // console.log(ticketItem)
                  }
                }}>{`${configuration.CURRENCY_SYMBOL}${configuration.VIP_SUBSCRIPTION} / ${configuration.VIP_SUBSCRIPTION_PERIOD}`}</button>
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
      {resendEmail ? (
          <div className={style.ResendPopup}>
          <div className={style.popupOverlaySection} onClick={()=>{
            setResendEmail(false)
          }}></div>

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
                <button  onClick={() => {
                  // setResendEmail(false);
                  resendEmailApi();
                }}>RESEND EMAIL</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {popup?showPopup():""}
        <div className={style.redBox}>
            <img src={GoldTicket} alt=""/>
           <h2> 20% OFF TICKETS!</h2>
        </div>
        <div className={style.Ticket}>
            <div className={style.Banner}>
                <img src={Banner} alt="" />
                <button onClick={()=>{
                    setPremiumPopup(true)
                }}>{configuration.CURRENCY_SYMBOL} {configuration.VIP_SUBSCRIPTION} / {configuration.VIP_SUBSCRIPTION_PERIOD}</button>
            </div>
            <div className={style.Tickets}>
                {ticket.map((item,index)=>{
                    return(
                        <div className={style.TicketItem} key={index}
                             onClick={()=>{
                                      console.log(user)
                                    if(Object.keys(user).length === 0){
                                      navigate("/login")
                                    }
                                    else if(user&&user.profile_status===false){
                                        setResendEmail(true)
                                    }
                                    else{
                                        setPopup(true)
                                        setTicketItem(item)
                                        console.log(ticketItem)
                                    }
                            
                        }}>
                            <div className={style.image}>
                                <img src={item.token_image} alt="" />
                            </div>
                            {/* <Link to="#popup"> */}
                                <button className={style.price} onClick={()=>{
                                    if(user&&user.profile_status===false){
                                        setResendEmail(true)
                                    }
                                    else{
                                        setPopup(true)
                                        setTicketItem(item)
                                        console.log(ticketItem)
                                    }
                                }}>{item.currency_symbol}
                  {item.token_amount}</button>
                            {/* </Link> */}
                            

                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Ticket