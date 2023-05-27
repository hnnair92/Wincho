import React, { useEffect } from 'react'
import style from './OrderConfirmed.module.css'
import confirm from "../../assests/Prize on Way Page Full.png"
import { cartAction, notificationAction } from '../../actions/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const OrderConfirmed = () => {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  useEffect(()=>{
    dispatch(cartAction())
    dispatch(notificationAction())
    setTimeout(() => {
      navigate("/prizes")
    }, 5000);
  },[dispatch])
  return (
    <div className={style.Container}>
        <img src={confirm} alt="" />
    </div>
  )
}

export default OrderConfirmed