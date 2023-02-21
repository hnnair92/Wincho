import React from 'react'
import style from './Ticket.module.css'
import Banner from '../../assests/Clubhouse Cashier without Button.png'
import Tickets from '../../Api/Tickets'
const Ticket = () => {
  return (
    <div className={style.Container}>
        <div className={style.Ticket}>
            <div className={style.Banner}>
                <img src={Banner} alt="" />
                <button>€11.99 / 3 Months</button>
            </div>
            <div className={style.Tickets}>
                {Tickets.map((item,index)=>{
                    return(
                        <div className={style.TicketItem} key={index}>
                            <div className={style.image}>
                                <img src={item.image} alt="" />
                            </div>
                            <button className={style.price}>€{item.price}</button>

                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Ticket