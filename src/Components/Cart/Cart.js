import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import bg from "../../assests/Shipping Page BG.png";
import replay from "../../assests/Last Win Icon.png";
import share from "../../assests/Share Icon.png";
import ticket from "../../assests/Gold Ticket Standard Shipping.png";
import primeIcon from "../../assests/Wincha Clubhouse Option.png";
import ReactPlayer from "react-player";
import playBtn from "../../assests/PlayButton.png";
import { assets } from "../Description/assests";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  // const[prime,setPrime] = useState(true)
  const [cartData, setCartData] = useState([]);
  const baseUrl = "https://uat.wincha-online.com";
  const userId = JSON.parse(localStorage.getItem("user"));
  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.profile);
  let saved = localStorage.getItem("SaveShipping");
  const [eGifting, setEGifting] = useState(true);
  const navigate = useNavigate();
  const [vipData, setVipData] = useState({});

  // UseState
  const [emptyCart,setEmptyCart] = useState(false);
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
  const [addressObj,setAddressObj] = useState({
    line1:"",
    line2:"",
    city:"",
    state:"",
    zipcode:""
  })
  const[count,setCount] = useState(1);
  // End

  async function fetchCart() {
    await fetch(`${baseUrl}/cart/collection`, {
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
        setCartData(data.data);
        console.log(data);
        [...data.data].forEach((cart) => {
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
        console.log(data);
      });
  }
  // function get
  useEffect(() => {
    console.log(saved)
    fetchCart();
    getVipDetails();
    if(saved===null){
      localStorage.setItem("SaveShipping",false);
    }
    
  }, []);
  function checkCount(){
    console.log("Checking count",count);
    if(saved==="true"){
      setCount(1);
    }
    if(vipData.status===false){
      setCount(2);
    }
  }
  function Popup(url){
    // console.log(videoUrl);
    
    return(
        <div className={style.Popup}>
            <button className={style.playerButton} onClick={()=>{
                    // onPlay?setOnPlay(false):
                    // setOnPlay(true)
                    // console.log(onPlay);
                    
                }}>
                <img src={playBtn} alt=""/>
            </button>
            {/* <ReactPlayer 
            url="https://ocp-video-archive.s3.amazonaws.com/47498471/aae3d108-86e2-41e7-a023-dbadc7704964/archive.mp4"
            width="100%"
            height="auto"
            className={style.videoPlayer}
            playIcon={<button>Play</button>}
            playing={true}
            controls={true}
            /> */}
            <ReactPlayer
              url={url}
              width="100%"
              height="500px"
              playIcon={<button>Play</button>}
              playing={true}
              controls={true}
              />
        </div>
    )
   }
  function lowPoint(){
    const pointInt = parseInt(user.point);
    const priceInt = parseInt(configuration.STANDARD_SHIPPING_PRICE);
    if(pointInt<priceInt){
        setIsTopup(true)
        // setCount()
    }
    else{
      setCount(3);
    }
}

  return (
    <div className={style.Container}>
      {isVip&&isVipShown===false?
        <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          {/* <p>{vipData.vip_discription}</p> */}
          <p><div dangerouslySetInnerHTML={{__html: vipData.data[0].vip_discription}}></div></p>
          {/* <p>fhf</p> */}
        </div>
        <div className={style.ReportPopupButton}>
          
              <button
                onClick={() => {
                    // localStorage.setItem("saveShipping",true)\
                    setIsVip(false);
                  // setIsVipShown(true);
                  setCount(2);
                  // if(user&&user.addressline1!==""){
                  //     setIsShowAddressPopup(true)
                  // }
                }}
              >
                OK
              </button>
          
        </div>
      </div>
      :""}
      {isAddress&&isAddressShown===false?
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
                   setisAddressField(true)
                     setIsAddressShown(true);
                     setIsAddress(false)
                    //  setCount
                 }}
               >
                 ADD DETAILS
               </button>
           
         </div>
       </div>
      :""}
      {isBundleReminder===true?
        <div className={style.popup}>
        <div className={style.popupImage}>
          <img src={assets.winchaPopup} alt="" />
        </div>
        <div className={style.popupText}>
          <p>Woah there! Remember to bundle your prizes to save an shipping!</p>
        </div>
        <div className={style.ReportPopupButton}>
          
              <button
                onClick={() => {
                    localStorage.setItem("SaveShipping","true")
                    if(vipData.status===true){
                      setCount(2);
                    }
                    else{
                      setCount(2);
                    }
                  // setIsReminderShown(true);
                  setIsBundleReminder(false)
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
      :""}
      {isTopup&&isTopupShown===false?
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
                    navigate("/tickets")
                  // setIsLowPoint(false)
                  setCount(3)
                  setIsTopup(false)
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
      :""}
      {isAddressField&&isAddressFieldShown===false?
        <div className={style.Address}>
        <div className={style.AddressTitle}>
        </div>
        <form action="">
            <h1>Shipping Address</h1>
            <input type="text" name="" id="" value={addressObj.line1}placeholder="LINE 1" onChange={(e)=>{
                addressObj.line1 = e.target.value
                // addressObj.line2 = e.target.value
            }}/>
            <input type="text" name="" id="" value={addressObj.line2 } placeholder="LINE 2" onChange={(e)=>{
                addressObj.line2 = e.target.value
                // addressObj.line2 = e.target.value
            }}/>
            <input type="text" name="" id="" value={addressObj.city} placeholder="CITY" onChange={(e)=>{
                addressObj.city = e.target.value
                // addressObj.line2 = e.target.value
            }}/>
            {configuration.COUNTRY_CODE==="USA"?
             <input type="text" name="" id="" value={addressObj.state} readOnly placeholder='STATE/PROVINCE'/>
            :<input type="text" name="" id="" value={addressObj.state} placeholder="COUNTY"/>}
            {configuration.COUNTRY_CODE==="UK"?
            <input type="text" name="" id="" value={addressObj.state} placeholder="POSTCODE" onChange={(e)=>{
                addressObj.state = e.target.value
                // addressObj.line2 = e.target.value
            }}/>
            :
            <input type="text" name="" id="" value={addressObj.zipcode} placeholder="ZIP/POSTAL CODE"  onChange={(e)=>{
                addressObj.zipcode = e.target.value
                // addressObj.line2 = e.target.value
            }}/>
            }
            <button type="submit"onClick={()=>{
                setIsAddressFieldShown(true);
                setisAddressField(false);
                // setCount(4)
                console.log(addressObj)

            }}>CONFIRM</button>
        </form>
    </div>
      :""}

      <div className={style.Cart}>
        <div className={style.Title}>
          <p>BASKET</p>
        </div>
        <div className={style.Carts}>
          {cartData.map((cart) => {
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
                        console.log(cart.game_share_url)
                        // setShowVideo(true);
                        // setVideoUrl(cart.video_url);
                        Popup(cart.game_share_url);
                      }}
                    />
                  </div>
                  <div className={style.share}>
                    <img src={share} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {eGifting && cartData.length > 0 ? (
          ""
        ) : (
          <div className={style.Shipping}>
            <div className={style.PrimeShipping}>
              <div className={style.shippingIcon}>
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
                      // setPrime(false);
                    }}
                  ></span>
                ) : (
                  <span className={style.Circle} onClick={() => {}}></span>
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
        <div className={style.Checkout}>
          <button onClick={() => {
            checkCount();
            console.log(count,"count");
              // console.log(typeof saved)
              console.log(saved,"isBundleReminder from t")
              console.log(isVipShown,"isVip from t")
              console.log(isAddressShown,"isAddress from t")
            
            if(saved==="false"){
              console.log(isBundleReminder,"isBundleReminder")
              setIsBundleReminder(true);
              console.log(isBundleReminder,"isBundleReminder")
              saved = localStorage.getItem("SaveShipping");
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
            else{
              console.log("false")
              if(count===1){
                setCount(2)
                if(vipData.status===true){
                  setIsVip(true);
                  console.log(isVip,"isVip")
                }
                else{
                  setCount(2);
                }
                
  
              }
              // else if(count ===1&&vipData.status===false){
              //   setIsVipShown(true)
              //   lowPoint();
              // console.log(isBundleReminder,"isBundleReminder")
              // }
            if(count===2){
              setCount(3)
              lowPoint();
              console.log(isBundleReminder,"isBundleReminder")
              // continue
  
            }
            if(count===3){
              setCount(4)
              setIsAddress(true);
              console.log(isAddress,"isAddress")
  
            }
            if(count===4){
              setCount(5)
              console.log("Checked out")
            }
            }

          }}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
