import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import backgroundData from '../../Api/backgroundJson'
import Lottie from "lottie-react";
import AboutData from '../../Api/AboutImage'
import playBtn from '../../assests/Asset 602-300ppi.png'
import {HiOutlineChevronRight,HiOutlineChevronLeft} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import supportContact from '../../assests/Full Support Box.png'
import AppStore from '../../assests/pngwing.com (4).png'
import {bgImage} from './BgImage.js'
import { assets } from '../Description/assests';
import { AboutBg } from './AboutImage';
import videoSrc from '../../assests/video/wincha.mp4';
import winchaIcons from '../../assests/Wincha HomePage Logo.png';
const Home = () => {
    const navigate  = useNavigate()
    const[scrollNav,setScrollNav] = useState(false)
    // add styles according to the height
    const chnageNav=()=>{
        if(window.scrollY >= 80){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        }
    };
    useEffect(()=>{
        window.addEventListener('scroll',chnageNav);
        console.log(scrollNav,"scrollNav");
    },[window.scrollY]);


    const [isAddress, setIsAddress] = useState(false);
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
  
    const[background,setBackground] = useState(JSON.parse(localStorage.getItem("background")))
    const bgChange=()=>{
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
              
                <Lottie animationData={backgroundData[background?background:0]} loop={true} />;
               
                <Link to="/prizes">
                    <div className={style.PlayBtn}>
                        
                        <img src={playBtn} alt="" />
                    </div>
                </Link>
                <div className={style.Crane}>
                    {/* <Lottie animationData={WinchaIcon} loop={false} />; */}
                    <img src={winchaIcons} alt="" />
                
                </div>
                
                
            </div>
            <div className={style.About} id="about">
                <div className={style.Image}>
                <img src={AppStore} alt="" className={style.AppStore} onClick={()=>{
                            window.open("https://apps.apple.com/us/app/wincha/id1604147807")
                        }}/>
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
               
                <div className={style.Slider}>
                    
                    <video autoPlay muted={true} loop>
                    <source src={videoSrc} type="video/mp4" />
                </video>
                 {/* :""} */}
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
                                <img src={supportContact} alt=""  onClick={()=>{
                                    setIsAddress(true)
                                }}/>
                            {/* </div> */}

                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
        {isAddress? (
        <div className={style.popup}>
        <div className={style.Overlay} onClick={()=>{
            setIsAddress(false)
        }}>

        </div>
        <div className={style.popupSection}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            {/* <p>{vipData.vip_discription}</p> */}
            <form action="">
                <input type="text" placeholder='Name'/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Phone Number"/>
                <textarea name="" id="" cols="30" rows="10"  placeholder="Message"></textarea>
            </form>
            {/* <p>fhf</p> */}
          </div>
          <div className={style.ReportPopupButton}>
            <button
              onClick={() => {
                // setisAddressField(true);
                // setIsAddressShown(true);
                // setIsAddress(false);
                setIsAddress(false)
                //  setCount
              }}
            >
              SEND
            </button>
          </div>
        </div>
        </div>
      ) : (
        ""
      )}
        <div className={style.MHome}>
            <div className={style.Mtransition}>
                <div className={style.MTransitionBg}>
                    <img src={bgImage[background?background:0]} alt="" />
                </div>
                <div className={style.MTransitionContent}>
                        <div className={style.MPlayBtn} onClick={()=>{
                            navigate("/prizes")
                        }}>
                            <img src={playBtn} alt="" />
                        </div>
                    
                    <div className={style.MAppStore}>
                        <img src={AppStore} alt="" onClick={()=>{
                            window.open("https://apps.apple.com/us/app/wincha/id1604147807")
                        }}/>
                    </div>
                </div>
                    <div className={style.MCrane}>
                        <img src={winchaIcons} alt="" />
                    </div>
            </div>
            <div className={style.MAbout}>
                <div className={style.Image}>
                    <div className={style.LeftIcons}>
                        <span><HiOutlineChevronLeft onClick={()=>{
                            leftHandle()
                        }}/></span>
                    </div>
                    <div className={style.Slider}>
                        <img src={AboutBg[id]} alt="" />
                    </div>
                    <div className={style.Slidernav}>
                        {AboutBg.map((item,index)=>{
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
            <div className={style.MWatch}>
         
            <video autoPlay muted={true} loop>
                <source src={videoSrc}/>
            </video>
            </div>
            <div className={style.MSupport} id="supports">
              
                <div className={style.SupportContent}>
                    <div className={style.ContactSection}>
                        <p>Support</p>
                        <p className={style.StrokeContact}>WE'RE HERE TO HELP</p>
                        <div className={style.Contact}>
                        
                                <img src={supportContact} alt=""  onClick={()=>{
                                    setIsAddress(true)
                                }}/>
                           

                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        
    </div>
  )
}

export default Home