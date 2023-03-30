import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import bg from '../../assests/Shipping Page BG.png'
import replay from '../../assests/Last Win Icon.png'
import share from '../../assests/Share Icon.png'
import ticket from '../../assests/Gold Ticket Standard Shipping.png'
import primeIcon from '../../assests/Wincha Clubhouse Option.png'
import ReactPlayer from "react-player";
import playBtn from '../../assests/PlayButton.png'
const Cart = () => {
    const[prime,setPrime] = useState(false)
    const [cartData,setCartData] = useState([])
    const [onPlay,setOnPlay]= useState(true)  
    const [videoUrl,setVideoUrl]= useState("")
    const [showVideo,setShowVideo] = useState(false)
    const baseUrl = "https://uat.wincha-online.com";
    const userId = JSON.parse(localStorage.getItem("user"))

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
        })
    }
   useEffect(()=>{
    fetchCart()
   },[])
   function Popup(url){
    console.log(videoUrl);
    
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
  return (
    <div className={style.Container}>
        {/* <img src={bg} alt="" /> */}
        {showVideo?<Popup/>:""}
        <div className={style.Cart}>
            <div className={style.Title}>
                <p>BASKET</p>
            </div>
            <div className={style.Carts}>
                {cartData.map((cart)=>{
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
                        {prime?<span className={style.CircleActive} onClick={()=>{
                                setPrime(false)
                            }}></span>:<span className={style.Circle} onClick={()=>{
                                setPrime(true)
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
                            <p>Free</p>
                        </div>
                        {/* <div> */}
                        {prime?<span className={style.Circle} onClick={()=>{
                                setPrime(false)
                            }}></span>:<span className={style.CircleActive} onClick={()=>{
                                setPrime(true)
                            }}></span>}
                            {/* <span className={style.Circle} onClick={()=>{
                                setPrime(false)
                            }}></span> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div className={style.Checkout}>
                <button>CHECKOUT</button>
            </div>
        </div>
    </div>
  )
}

export default Cart