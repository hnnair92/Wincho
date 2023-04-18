import React, { useState,useEffect } from 'react'
import style from './Ticket.module.css'
import Banner from '../../assests/Clubhouse Cashier without Button.png'
import Tickets from '../../Api/Tickets'
import {BsCreditCardFill} from 'react-icons/bs'
import GoldTicket from '../../assests/Floating Tab Gold Ticket.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png"
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png"
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png"
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png"
import CloseImage from "../../assests/Artboard 48 X.png"
import Lower from "../../assests/Artboard 48 - Lower Image Split.png"
import Upper from "../../assests/Artboard 48 - Upper Image Split.png"
const Ticket = () => {
    const [popup, setPopup] = useState(false);
    // const navigate = useNavigate()
    const [premiumPopup,setPremiumPopup] = useState(false)
    const [ticketItem, setTicketItem] = useState();
    const { configuration } = useSelector((state) => state.configuration);
    const[ tickets,setTickets] = useState([])
    const userId  = JSON.parse(localStorage.getItem("user"))
    // const ticket
    
    const baseUrl = "https://uat.wincha-online.com";
    const navigate = useNavigate();
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
      await fetch(`${baseUrl}/points/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify({
          mode: "payment",
          amount: parseInt(ticketItem.token_amount) * 100,
          quantity: 1,
          currency: configuration.CURRENCY_CODE,
          product: "Tickets",
          success_url: "http://localhost:3000/tickets",
          cancel_url: "http://game.wincha-online.com/payment/cancel",
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
  return (
    <div className={style.Container}>
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
                {tickets.map((item,index)=>{
                    return(
                        <div className={style.TicketItem} key={index}>
                            <div className={style.image}>
                                <img src={item.token_image} alt="" />
                            </div>
                            {/* <Link to="#popup"> */}
                                <button className={style.price} onClick={()=>{
                                    setPopup(true)
                                    setTicketItem(item)
                                    console.log(ticketItem)
                                }}>{item.currency_symbol}
                  {item.token_point}</button>
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