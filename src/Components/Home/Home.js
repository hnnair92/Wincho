import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import backgroundData from '../../Api/backgroundJson'
import Lottie, { LottiePlayer } from "lottie-react";
import AboutData from '../../Api/AboutImage'
import WatchData from '../../Api/WatchImage'
import {HiOutlineChevronRight,HiOutlineChevronLeft} from 'react-icons/hi'
import ticketIcon from '../../Api/Ticket.json'
import supportContact from '../../assests/Full Support Box.png'
import WinchaIcon from '../../Api/WinchaIcon.json'
import AppStore from '../../assests/pngwing.com (4).png'
import playBtn from '../../assests/Play Button.png'
import { Link } from 'react-router-dom';
import imageDiv from '../../assests/TEXTOff Tickets.png'
// import {OT,subscriber} from 'openTok'
const Home = () => {
    // var apiKey = "47498471"; // Replace with your API key. See https://tokbox.com/account
    // var sessionID = "2_MX40NzQ5ODQ3MX5-MTY3NzY0MzU3MTUxMX5OQkNMYWxtc3ZKVXN2d3hlbmE0cG1IMER-fn4"; // Replace with your own session ID.
    //                     // See https://tokbox.com/developer/guides/create-session/.
    // var token = "T1==cGFydG5lcl9pZD00NzQ5ODQ3MSZzaWc9YTU3NDVmOWVkOTBjZjc4Mzg5ZDJmN2FkYjhkYThjZDdhOWRlODhlMjpzZXNzaW9uX2lkPTJfTVg0ME56UTVPRFEzTVg1LU1UWTNOelkwTXpVM01UVXhNWDVPUWtOTVlXeHRjM1pLVlhOMmQzaGxibUUwY0cxSU1FUi1mbjQmY3JlYXRlX3RpbWU9MTY3NzY0MzU3MiZub25jZT0wLjM1OTcxMTU0NzI3NzIyOTImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY3NzcyOTk3MTUxMyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="; // Replace with a generated token.

    // let targetElement = document.getElementById("publisherContainer")
    // var session = OT.initSession(apiKey, sessionID);
    // session.on("streamCreated", function(event) {
    // subscriber = session.subscribe(event.stream, targetElement);
    // console.log(subscriber)
    // });
    // session.connect(token);
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
        <div className={style.Home} id="home">
            <div className={style.Transition}>
                <Lottie animationData={backgroundData[2]} loop={true} />;
                {/* <img src={backgroundData[1]} alt="" /> */}
                <Link to="/prizes">
                    <div className={style.PlayBtn}>
                        
                        <img src={playBtn} alt="" />
                    </div>
                </Link>
                <div className={style.Crane}>
                    <Lottie animationData={WinchaIcon} loop={false} />;
                
                </div>
                
                
            </div>
            <div className={style.About} id="about">
                <div className={style.Image}>
                <img src={AppStore} alt="" className={style.AppStore}/>
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
            <div className={style.Watch} id="watch">
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
            <Link to="/tickets">
                <div className={style.TicketIcon}>
                    <Lottie animationData={ticketIcon} loop={true} />;
                        
                </div>
                <div className={style.TicketText}>
                        {/* <p>20% OFF TICKETS!</p> */}
                        <img src={imageDiv} alt="" />
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Home