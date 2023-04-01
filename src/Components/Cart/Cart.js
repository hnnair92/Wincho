import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import bg from '../../assests/Shipping Page BG.png'
import replay from '../../assests/Last Win Icon.png'
import share from '../../assests/Share Icon.png'
import ticket from '../../assests/Gold Ticket Standard Shipping.png'
import primeIcon from '../../assests/Wincha Clubhouse Option.png'
import ReactPlayer from "react-player";
import playBtn from '../../assests/PlayButton.png'
import {assets} from '../Description/assests'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const[prime,setPrime] = useState(true)
    const [cartData,setCartData] = useState([])
    const [onPlay,setOnPlay]= useState(true)  
    const [videoUrl,setVideoUrl]= useState("")
    const [showVideo,setShowVideo] = useState(false)
    const [saveShipping,setSaveShipping] = useState(false)
    const [isLowPoint,setIsLowPoint] = useState(false)
    const baseUrl = "https://uat.wincha-online.com";
    const userId = JSON.parse(localStorage.getItem("user"))
    const{configuration} = useSelector((state)=>state.configuration)
    const{user} = useSelector((state)=>state.profile)
    const saved = localStorage.getItem("saveShipping")
    const [eGifting,setEGifting]= useState(true)
    const [showAddress,setShowAddress] = useState(false)
    const [address,setAddress] = useState({})
    const [isShowAddressPopup,setIsShowAddressPopup] = useState(false)
    const navigate = useNavigate()
    const [freeShipping,setFreeShipping] = useState(false)
    const [isVip,setIsVip] = useState(false)
    const [vipData,setVipData] = useState({})
    const [emptyCart,setEmptyCart] = useState(false)
    async function fetchCart(){
        await fetch(`${baseUrl}/cart/collection`,{
            method:"POST",
            body:JSON.stringify({
                user_id:userId
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            setCartData(data.data)
            console.log(data);
            [...data.data].forEach((cart)=>{
                if(cart.is_Egifting===false){
                    setEGifting(false)
                    console.log(cart);
                }
                
            })
            // for(const cart of cardData){
            //     console.log(cart)
            // }
            // console.log(eGifting)
        })
    }
    function getVipDetails(){
        fetch(`${baseUrl}/user/vip/shipping/status`,{
            method:"POST",
            body:JSON.stringify({
                user_id:userId
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            setVipData(data)
            console.log(data);
            
        })
    }
    // function get
   useEffect(()=>{
    fetchCart()
    getVipDetails()
   },[])
   function Popup(url){
    // console.log(videoUrl);
    
    return(
        <div className={style.Popup}>
            <button className={style.playerButton} onClick={()=>{
                    // onPlay?setOnPlay(false):
                    setOnPlay(true)
                    console.log(onPlay);
                    
                }}>
                <img src={playBtn} alt=""/>
            </button>
            <ReactPlayer 
            url="https://ocp-video-archive.s3.amazonaws.com/47498471/aae3d108-86e2-41e7-a023-dbadc7704964/archive.mp4"
            width="100%"
            height="auto"
            className={style.videoPlayer}
            playIcon={<button>Play</button>}
            playing={true}
            />
        </div>
    )
   }
   function lowPoint(){
        const pointInt = parseInt(user.point);
        const priceInt = parseInt(configuration.STANDARD_SHIPPING_PRICE);
        if(pointInt<priceInt){
            setIsLowPoint(true)
        }
   }
//    useEffect(()=>{
    
//    },[])
  return (
    <div className={style.Container}>
        {saveShipping?
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
                    localStorage.setItem("saveShipping",true)
                  setSaveShipping(false)
                }}
              >
                OK
              </button>
          {/* <button>CAMERA</button>
        <button>PAYMENT</button>
        <button>DELAY</button>
        <button>OTHER</button> */}
        </div>
      </div>:""}
      {isLowPoint?<div className={style.popup}>
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
                  setIsLowPoint(false)
                }}
              >
                TOP UP
              </button>
          {/* <button>CAMERA</button>
        <button>PAYMENT</button>
        <button>DELAY</button>
        <button>OTHER</button> */}
        </div>
      </div>:""}
      {isShowAddressPopup?<div className={style.popup}>
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
                  setShowAddress(true)
                  setIsShowAddressPopup(false)
              }}
            >
              ADD DETAILS
            </button>
        
      </div>
    </div>:""}
      {isVip&&vipData.status===true?
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
                  localStorage.setItem("saveShipping",true)
                setIsVip(false)
                if(user&&user.addressline1!==""){
                    setIsShowAddressPopup(true)
                }
              }}
            >
              OK
            </button>
        
      </div>
    </div>
      :""}
        {showAddress?<div className={style.Address}>
            <div className={style.AddressTitle}>
                <h1>Shipping Address</h1>
            </div>
            <form action="">
                <input type="text" name="" id="" value={address.line1} onChange={(e)=>{
                    address.line1 = e.target.value
                    // address.line2 = e.target.value
                }}/>
                <input type="text" name="" id="" value={address.line2 } placeholder="LINE 1" onChange={(e)=>{
                    address.line2 = e.target.value
                    // address.line2 = e.target.value
                }}/>
                <input type="text" name="" id="" value={address.city} placeholder="CITY" onChange={(e)=>{
                    address.city = e.target.value
                    // address.line2 = e.target.value
                }}/>
                {configuration.COUNTRY_CODE==="USA"?
                 <input type="text" name="" id="" value={address.state} readOnly placeholder='STATE/PROVINCE'/>
                :<input type="text" name="" id="" value={address.state} placeholder="COUNTY"/>}
                {configuration.COUNTRY_CODE==="UK"?
                <input type="text" name="" id="" value={address.state} placeholder="POSTCODE" onChange={(e)=>{
                    address.state = e.target.value
                    // address.line2 = e.target.value
                }}/>
                :
                <input type="text" name="" id="" value={address.zipcode} placeholder="ZIP/POSTAL CODE"  onChange={(e)=>{
                    address.zipcode = e.target.value
                    // address.line2 = e.target.value
                }}/>
                }
                <input type="submit" value="CONFIRM" onClick={()=>{
                    setShowAddress(false)
                }}/>
            </form>
        </div>:""}
        {/* <img src={bg} alt="" /> */}
        {showVideo?<Popup/>:""}
        {/* {<div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>What issue would you like to report</p>
          </div>
          <div className={style.ReportPopupButton}>
            {reportCategories.map((item) => {
              return (
                <button
                  onClick={() => {
                    setCategory(item.category);
                    setReportIssueCategories(false);
                    setReportContent(true);
                  }}
                >
                  {item.category}
                </button>
              );
            })}
            {/* <button>CAMERA</button>
          <button>PAYMENT</button>
          <button>DELAY</button>
          <button>OTHER</button> */}
          {/* </div>
        </div>} */} 
        <div className={style.Cart}>
            <div className={style.Title}>
                <p>BASKET</p>
            </div>
            <div className={style.Carts}>
                {cartData.map((cart)=>{
                    // cart.is_Egifting===false
                    //     setEGifting(false)
                        
                    
                    return(
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
                                    <img src={replay} alt=""onClick={()=>{
                                        setShowVideo(true)
                                        setVideoUrl(cart.video_url)
                                    }} />
                                </div>
                                <div className={style.share}>
                                    <img src={share} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {eGifting&&cartData.length>0?
            ""
            :
            <div className={style.Shipping}>
                <div className={style.PrimeShipping}>
                    <div className={style.shippingIcon}>
                        <img src={primeIcon} alt="" />
                    </div>
                    <div className={style.selection}>
                        <div className={style.price}>
                            <p>Free</p>
                        </div>
                        {/* <div className={style.Circle}>
                            <span></span>
                        </div> */}
                        {vipData.status===true&&vipData.data[0].vip_token===true?<span className={style.CircleActive} onClick={()=>{
                                setPrime(false)
                            }}></span>:<span className={style.Circle} onClick={()=>{
                                // setPrime(true)
                            }}></span>}
                            
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
                        {/* {profile?.vip===true?<span className={style.CircleActive} onClick={()=>{
                                setPrime(false)
                            }}></span>:""} */}
                        {/* <div> */}
                        {vipData.status===false?<span className={style.CircleActive} onClick={()=>{
                                setPrime(false)
                            }}></span>:<span className={style.Circle} onClick={()=>{
                                setPrime(true)
                            }}></span>}

                            {/* <span className={style.Circle} onClick={()=>{
                                setPrime(false)
                            }}></span> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>}
            {emptyCart?<div className={style.popup}>
      <div className={style.popupImage}>
        <img src={assets.winchaPopup} alt="" />
      </div>
      <div className={style.popupText}>
        {/* <p>{vipData.vip_discription}</p> */}
        <p>Woah! You're cart is empty, <br/>Play Some Games</p>
        {/* <p>fhf</p> */}
      </div>
      <div className={style.ReportPopupButton}>
        
            <button
              onClick={() => {
                  setEmptyCart(false)
              }}
            >
              OK
            </button>
        
      </div>
    </div>:""}
            <div className={style.Checkout}>
                <button onClick={()=>{
                    console.log(cartData.length)
                    if(cartData.length===0){
                        setEmptyCart(true)
                    }
                    else{
                        if(saved===undefined||saved===null||saved===false){
                            localStorage.setItem("saveShipping",false)
                            setSaveShipping(true)
                        }
                        else if(saved===true){
                            setSaveShipping(false)
                        }
                        else if(vipData.status===true&&isVip===false){
                            setIsVip(true)
                        }
                        else if(user&&user.addressline1===""&&showAddress===false){
                            setShowAddress(true)
                            // if(user&&user.addressline1===""&&saveShipping===false&&isVip===false&&isLowPoint){
                            //     setShowAddress(true)
                            // }
                        }
                    }
                        // if(user&&user.point)
                        lowPoint()
                }}>CHECKOUT</button>
            </div>
        </div>
    </div>
  )
}

export default Cart