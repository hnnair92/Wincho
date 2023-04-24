import React, { useEffect } from 'react'
import style from './OrderConfirmed.module.css'
import confirm from "../../assests/Prize on Way Page Full.png"
import { cartAction, notificationAction } from '../../actions/user'
import { useDispatch } from 'react-redux'
const OrderConfirmed = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(cartAction())
    dispatch(notificationAction())
  },[dispatch])
  return (
    <div className={style.Container}>
        <img src={confirm} alt="" />
    </div>
  )
}

export default OrderConfirmed