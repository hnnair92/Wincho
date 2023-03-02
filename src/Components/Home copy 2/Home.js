import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import backgroundData from '../../Api/background'
import Lottie, { LottiePlayer } from "lottie-react";
import AboutData from '../../Api/AboutImage'
import WatchData from '../../Api/WatchImage'
import {HiOutlineChevronRight,HiOutlineChevronLeft} from 'react-icons/hi'
import ticketIcon from '../../Api/Ticket.json'
import supportContact from '../../assests/Full Support Box.png'
import WinchaIcon from '../../Api/WinchaIcon.json'
const Home = () => {
    const[id,setId] = useState(0);
    const[aboutId,setAboutId] = useState(0)
    const leftHandle=()=>{
        if(id<=0){
            setId(AboutData.length-1)
        }
        else{
            setId(id-1)
        }
    }
    const rightHandle=()=>{
        if(id>=AboutData.length-1){
            setId(0)
        }
        else{
            setId(id+1)
        }
    }
    const AboutLeftHandle=()=>{
        if(aboutId<=0){
            setAboutId(0)
        }
        else{
            setAboutId(aboutId-1)
        }
    }
    const AboutRightHandle=()=>{
        if(aboutId>=WatchData.length-1){
            setAboutId(3)
        }
        else{
            setAboutId(aboutId+1)
        }
    }
    let height = window.scrollY
  
  
    useEffect(()=>{
        const time = setTimeout(()=>{
            rightHandle()
        },5000)
       
        return ()=> clearInterval(time)
    },[id])
    useEffect(()=>{
        height = window.scrollY
    },[height])
    // const getId = JSON.parse(localStorage.getItem("background"))
    const[background,setBackground] = useState(JSON.parse(localStorage.getItem("background")))
    // const[background,setBackground] = useState(getId)
    const bgChange=()=>{
        // if(getId===null){
            // setBackground(0)
        //     localStorage.setItem("background",JSON.stringify(background))
        // }
        // console.log(background+100)
        if(background===backgroundData.length){
            setBackground(0)
            localStorage.setItem("background",JSON.stringify(0))
        }
        else if(background<backgroundData.length-1){
            // setBackground(background+1)
            localStorage.setItem("background",JSON.stringify(background+1))
            console.log(JSON.parse(localStorage.getItem("background")),'this is the value')
            console.log(background,"this is the state")
        }
        else{
            // setBackground(0)
            localStorage.setItem("background",JSON.stringify(0))
        }
        }
    
    useEffect(()=>{
        bgChange()
    },[])
  return (
    <div className={style.Container}>
        <div className={style.Home}>
            <div className={style.Transition}>
                <Lottie animationData={backgroundData[background]} loop={true} />;
                {/* <img src={backgroundData[1]} alt="" /> */}
                <div className={style.Crane}>
                <Lottie animationData={WinchaIcon} loop={false} />;
                    
                </div>
            </div>
            <div className={style.About}>
                <div className={style.Image}>
                    <div className={style.LeftIcons}>
                        <span><HiOutlineChevronLeft onClick={()=>{
                            leftHandle()
                        }}/></span>
                    </div>
                    <div className={style.Slider}>
                        <img src={AboutData[id]} alt="" />
                    </div>
                    <div className={style.Slidernav}>
                        {AboutData.map((item,index)=>{
                            return(
                                <div className={style.CircleNav}>
                                    <button onClick={()=>{
                                        setId(index)
                                    }} className={id===index?style.Active:style.NonActive}></button>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.RightIcons}>
                        <span><HiOutlineChevronRight onClick={()=>{
                            rightHandle()
                        }}/></span>
                    </div>
                </div>
            </div>
            <div className={style.Watch}>
                <div className={style.Image}>
                <div className={style.WLeftIcons}>
                        <button disabled={aboutId===0} className={aboutId===0?style.Disable:""}><HiOutlineChevronLeft onClick={()=>{
                            AboutLeftHandle()
                        }}/></button>
                    </div>
                <div className={style.Slider}>
                    <img src={WatchData[aboutId]} alt="" />
                </div>
                <div className={style.WRightIcons}>
                        <button disabled={aboutId===AboutData.length-1} className={aboutId===AboutData.length-1?style.Disable:""}><HiOutlineChevronRight onClick={()=>{
                            AboutRightHandle()
                        }}/></button>
                    </div>
                </div>
            
            </div>
            <div className={style.Support} id="support">
                <div className={style.SupportContent}>
                    <div className={style.ContactSection}>
                        <p>Support</p>
                        <p className={style.StrokeContact}>WE'RE HERE TO HELP</p>
                        <div className={style.Contact}>
                            {/* <div className={style.Logo}> */}
                                <img src={supportContact} alt="" />
                            {/* </div> */}

                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
        <div className={style.Ticket}>
            <div className={style.TicketIcon}>
                <Lottie animationData={ticketIcon} loop={true} />;
                    
            </div>
            <div className={style.TicketText}>
                    <p>20% OFF TICKETS!</p>
            </div>
        </div>
    </div>
  )
}

export default Home