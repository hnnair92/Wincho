import React from 'react'
import style from './Notification.module.css';
import NotificationData from '../../Api/Notification';
const Notification = () => {
    // const NotificationData = ["dasd","sdaads","dasdas"]
  return (
    <div className={style.Container}>
        <div className={style.Notifications}>
            <div className={style.Head}>
                <p>NOTIFICATIONS</p>
            </div>
            {NotificationData.map((notification)=>{
                return(
                    <div className={style.Notification}>
                        <div className={style.Content}>
                            <div className={style.Title}>
                                <p>{notification.title}</p>
                            </div>
                            <div className={style.Description}>
                                <p>{notification.description}</p>
                            </div>
                            <div className={style.playBtn}>
                                <button>PLAY NOW</button>
                            </div>
                        </div>
                        <div className={style.Image}>
                            <img src={notification.image} alt="" />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Notification