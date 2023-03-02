import React from 'react'
import style from './OrderConfirmed.module.css'
import confirm from "../../assests/Prize on Way Page Full.png"
const OrderConfirmed = () => {
  return (
    <div className={style.Container}>
        <img src={confirm} alt="" />
    </div>
  )
}

export default OrderConfirmed