import React, { useEffect, useRef, useState } from 'react'
import style from './Notification.module.css';
import NotificationDatas from '../../Api/Notification';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AllAnimation } from '../../Animation/allAnimation';
import Lottie from 'lottie-react';
import { music } from '../../assests/Musics/allMusic';
import { baseUrl } from "../url";
import PlayAudio from '../Audio/PlayAudio';
const Notification = ({ gameMusic,
    setGameMusic,
    gameSound,
    setGameSound,}) => {
       
  const token = JSON.parse(localStorage.getItem("token"))

 
  
  const{user} = useSelector((state)=>state.profile)
  const{notification} = useSelector((state)=>state.notification)
  const [notificationData,setNotificationData] = useState({})
  const userId = JSON.parse(localStorage.getItem("user"))
  const[product,setProduct] = useState({})
  const [loading,setLoading] = useState(true)
//   const[notification,setNotification] = useState({})
  const navigate = useNavigate()
    async function notificationGet(){
        await fetch(`${baseUrl}/user/notifications/get`,{
            method:"POST",
            body:JSON.stringify({
                user_id:userId
            }),
            headers:{
              "Content-Type":"application/json",
              "access-token":`${token}`
            }
        }).then(res=>res.json()).then((data)=>{
            setNotificationData(data.data[0])
            setLoading(false)
            console.log(data)
            console.log(notificationData.notifications.length)
            // setProduct(data.data[0].notifications.[])
        })
    }
    async function removeNavigation(data){
        console.log(data);
        await fetch(`${baseUrl}/user/notification/scene`,{
            method:"POST",
            body:JSON.stringify({
                user_id:userId,
                notifications:data
            }),
            headers:{
              "Content-Type":"application/json",
              "access-token":`${token}`
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            notificationGet()

        })
    }
    useEffect(()=>{
        notificationGet()
    },[])
  return (
    <div className={style.Container}>
    {/* <audio ref={audioRefHome} onEnded={audioEnded} loop></audio>
     <audio ref={audioRefHome} onEnded={audioEnded} loop></audio> */}
     <PlayAudio  gameMusic={gameMusic} setGameMusic={setGameMusic} gameSound={gameSound} setGameSound={setGameSound} />

        <div className={style.Notifications}>
            <div className={style.Head}>
                <p>NOTIFICATIONS</p>
            </div>
            {loading===false?notification?.notification_count>0&&notificationData?.notifications.length>0?notificationData?.notifications.map((notificationItem)=>{
                {/* console.log(notification.product[0]) */}
                return(
                    <div className={style.Notification} onClick={()=>{
                        if(notificationItem.button===false){
                            removeNavigation(notificationItem)
                            // navigate(`/game/${notification.product[0].id}`,{state:{game:notification.product[0]}})
                            
                        }
                    }}>
                        <div className={style.Content}>
                            <div className={style.Title}>
                                <p>{notificationItem.title}</p>
                            </div>
                            <div className={style.Description}>
                                <p>{notificationItem.content}</p>
                            </div>
                            {notificationItem.button===true?
                            <div className={style.playBtn}>
                                <button onClick={()=>{
                                     if(notificationItem.button===true){
                                    // setNotification(notification)
                                    removeNavigation(notificationItem)
                                    navigate(`/game/${notificationItem.product[0].id}`,{state:{game:notificationItem.product[0]}})
                                     }
                                }}>PLAY NOW</button>
                            </div>
                            :""}
                        </div>
                        <div className={style.Image}>
                            <img src={notificationItem.notification_image} alt="" />
                        </div>
                    </div>
                )
            }):<p className={style.EmptyCart}>No Notifications</p>:
            <div className={style.LoaderDiv}>
            <div className={style.LoaderAnime}>
              <Lottie animationData={AllAnimation.Loader} />
            </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Notification