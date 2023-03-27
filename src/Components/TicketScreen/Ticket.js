import React, { useState } from 'react'
import style from './Ticket.module.css'
import Banner from '../../assests/Clubhouse Cashier without Button.png'
import Tickets from '../../Api/Tickets'
import {BsCreditCardFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Ticket = () => {
    const[popup,setPopup] = useState(false)
    const[ticketItem,setTicketItem] = useState()
    const {configuration} = useSelector((state)=>state.configuration)
    const showPopup = ()=>{
        return(
            <div className={style.Popup} onClick={()=>{
                setPopup(false)
            }} id="popup">
                <div className={style.Overlay}>

                </div>
                <div className={style.PopupContaner}>
                    <div className={style.popupImage}>
                    <img src={ticketItem.image} alt="" />
                </div>
                <div className={style.popupContent}>
                     <p>Choose Your Payment Method</p>
                <div className={style.Buttons}>
                    <button className={style.PopupBtn}>
                        <BsCreditCardFill/>
                        <p>Credit Card</p>
                    </button>
                    <button className={style.PopupBtn}>

                    </button>
                </div>
                </div>
               
                </div>
                
            </div>
        )
    }
  return (
    <div className={style.Container}>
        {popup?showPopup():""}
        <div className={style.Ticket}>
            <div className={style.Banner}>
                <img src={Banner} alt="" />
                <button>{configuration.CURRENCY_SYMBOL} {configuration.VIP_SUBSCRIPTION} / {configuration.VIP_SUBSCRIPTION_PERIOD}</button>
            </div>
            <div className={style.Tickets}>
                {Tickets.map((item,index)=>{
                    return(
                        <div className={style.TicketItem} key={index}>
                            <div className={style.image}>
                                <img src={item.image} alt="" />
                            </div>
                            {/* <Link to="#popup"> */}
                                <button className={style.price} onClick={()=>{
                                    setPopup(true)
                                    setTicketItem(item)
                                    console.log(ticketItem)
                                }}>{configuration.CURRENCY_SYMBOL}{item.price}</button>
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