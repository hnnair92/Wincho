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
import { batch } from 'react-redux';
const Home = () => {
    // console.log(data)
    const[id,setId] = useState(0);
    const[aboutId,setAboutId] = useState(0)
    const data = ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"]
    const leftHandle=()=>{
        if(id<=0){
            setId(AboutData.length-1)
        }
        else{
            setId(id-1)
        }
        console.log(id);
        
    }
    const rightHandle=()=>{
        if(id>=AboutData.length-1){
            setId(0)
        }
        else{
            setId(id+1)
        }
        console.log(id);

    }
    const AboutLeftHandle=()=>{
        if(aboutId<=0){
            setAboutId(0)
        }
        else{
            setAboutId(aboutId-1)
        }
        // setAboutId(aboutId-1)
        console.log(aboutId);
        
    }
    const AboutRightHandle=()=>{
        if(aboutId>=WatchData.length-1){
            setAboutId(3)

        }
        else{
            setAboutId(aboutId+1)
        }
        console.log(aboutId);


    }
    let height = window.scrollY
    // const getBackground = (id)=>{
    //     if(id===0){
    //         setBackground(3)
    //     }
    //     else if(id===backgroundData.length-1){
    //         setBackground(0)
    //     }
    //     else{
    //         setBackground(id+1)
    //     }
    // }
    const getId = JSON.parse(localStorage.getItem("background"))
    const[background,setBackground] = useState(getId)
    // const[background,setBackground] = useState(JSON.parse(localStorage.getItem("background"))||0)
  
    useEffect(()=>{
        const time = setTimeout(()=>{
            rightHandle()
            // AboutRightHandle()
        },5000)
       
        return ()=> clearInterval(time)
    },[id])
    useEffect(()=>{
        height = window.scrollY
        console.log(height)
    },[height])
    // const idData = JSON.parse(localStorage.getItem("background"))
    // console.log(idData)
    // const[backgroundId,setBackgroundId] = useState(idData)
    // const backgroundVideo = ()=>{
    //     if(idData===undefined||idData===null){
    //     // if(id===null){
    //         // console.log(backgroundId,"check null above")
    //         localStorage.setItem("background",JSON.stringify(0))
    //         setBackgroundId(0)
    //     }
    //     else if(backgroundId===backgroundData.length){
    //             setBackgroundId(0)
    //             // idData=0
    //         }
    //     else{
    //         setBackgroundId(backgroundId+1)
    //     }
    //         localStorage.setItem("background",JSON.stringify(backgroundId))
    //     // }
    //     console.log(backgroundId,"check null")

    // }
    // useEffect(()=>{
    //     backgroundVideo()
    // },[])
    console.log("background index",background)
    useEffect(()=>{
        // let backgroundId = JSON.parse(localStorage.getItem("background"))
        // console.log("backgroundId",backgroundId)
        if(getId===null){
            setBackground(0)
            localStorage.setItem("background",JSON.stringify(background))
        }
        if(backgroundData.length===getId.id){
            // backgroundId=0
            setBackground(0)
            localStorage.setItem("background",JSON.stringify(background))
        }
        else{
            setBackground(getId+1)
            // getBackground(backgroundId+1)
            localStorage.setItem("background",JSON.stringify(background))
        }
    },[])
  return (
    <div className={style.Container}>
        <div className={style.Home}>
            <div className={style.Transition}>
                <Lottie animationData={backgroundData[getId]} loop={true} />;
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