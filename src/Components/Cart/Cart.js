import React, { useState } from 'react'
import style from './Cart.module.css'
import bg from '../../assests/Shipping Page BG.png'
import replay from '../../assests/Last Win Icon.png'
import share from '../../assests/Share Icon.png'
import ticket from '../../assests/Gold Ticket Standard Shipping.png'
import primeIcon from '../../assests/Wincha Clubhouse Option.png'
const Cart = () => {
    const[prime,setPrime] = useState(false)
    const CartData=[
        {
            name:"Wincha Plush",
            image:"https://wincha-online.com/wp-content/uploads/2022/06/WDEMO.png",
        },
        {
            name:"Monster UFO Drone",
            image:"https://wincha-online.com/wp-content/uploads/2022/06/Wincha-Plush-1.png",
        },
        {
            name:"Red Shell Light with Sound",
            image:"https://wincha-online.com/wp-content/uploads/2022/07/Xbox-Light.png",
        },
    ]
  return (
    <div className={style.Container}>
        {/* <img src={bg} alt="" /> */}
        <div className={style.Cart}>
            <div className={style.Title}>
                <p>BASKET</p>
            </div>
            <div className={style.Carts}>
                {CartData.map((cart)=>{
                    return(
                        <div className={style.CartItem}>
                            <div className={style.Game}>
                                <div className={style.image}>
                                    <img src={cart.image} alt="" />
                                </div>
                                <div className={style.name}>
                                    <p>{cart.name}</p>
                                </div>
                            </div>
                            <div className={style.Actions}>
                                <div className={style.replay}>
                                    <img src={replay} alt="" />
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