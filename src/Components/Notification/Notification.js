import React, { useEffect, useState } from 'react'
import style from './Notification.module.css';
import NotificationDatas from '../../Api/Notification';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AllAnimation } from '../../Animation/allAnimation';
import Lottie from 'lottie-react';
const Notification = () => {
  const baseUrl = "https://uat.wincha-online.com";
  const{user} = useSelector((state)=>state.profile)
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
                "Content-type":"application/json"
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
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            notificationGet()

        })
    }
    useEffect(()=>{
        notificationGet()
    },[])
    // console.log(notificationData&&notificationData.notifications&&notificationData.notifications[1]&&notificationData.notifications[1].product[0])
    // console.log();
    // const NotificationData = ["dasd","sdaads","dasdas"]
  return (
    <div className={style.Container}>
        <div className={style.Notifications}>
            <div className={style.Head}>
                <p>NOTIFICATIONS</p>
            </div>
            {loading===false?notificationData?.notifications?.length>0?notificationData?.notifications?.map((notification)=>{
                {/* console.log(notification.product[0]) */}
                return(
                    <div className={style.Notification} onClick={()=>{
                        if(notification.button===false){
                            removeNavigation(notification)
                            // navigate(`/game/${notification.product[0].id}`,{state:{game:notification.product[0]}})
                            
                        }
                    }}>
                        <div className={style.Content}>
                            <div className={style.Title}>
                                <p>{notification.title}</p>
                            </div>
                            <div className={style.Description}>
                                <p>{notification.content}</p>
                            </div>
                            {notification.button===true?
                            <div className={style.playBtn}>
                                <button onClick={()=>{
                                     if(notification.button===true){
                                    // setNotification(notification)
                                    removeNavigation(notification)
                                    navigate(`/game/${notification.product[0].id}`,{state:{game:notification.product[0]}})
                                     }
                                }}>PLAY NOW</button>
                            </div>
                            :""}
                        </div>
                        <div className={style.Image}>
                            <img src={notification.notification_image} alt="" />
                        </div>
                    </div>
                )
            }):<p className={style.EmptyCart}>You Have Viewed All the Notifications</p>:
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