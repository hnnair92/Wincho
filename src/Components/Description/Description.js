import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import style from './Description.module.css'
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { MdOutlineRestartAlt,MdFlipCameraIos } from "react-icons/md";
import { RxExclamationTriangle } from "react-icons/rx";
import user from '../../assests/penguin.png'
import binoculars from '../../assests/binoculars.png'
import svgIcon from '../../assests/SIDEpng2.png';
import svgBottom from '../../assests/SIDEBottom.png';
// import svgIcon from '../../assests/sideIcon.png';
const Description = () => {


  const[active,setActive]= useState(true)
  const location = useLocation()
  let stateData = location.state
  const game = stateData.game 
  console.log(game)
  return (
    <div className={style.Container}>
        <div className={style.Description}>
          {active?<div className={style.NowPlaying}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <div className={style.Image}>
              <img src={game.featured_image.large} alt="" />
            </div>
            <p className={style.title}>{game.title}</p>
            <div className={style.arrow}>
              <IoIosArrowUp className={style.arrowIcon} onClick={()=>{
                setActive(false)
              }}/>
            </div>
          </div>:<div className={style.minimized}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <p className={style.title}>{game.title}</p>
            <div className={style.arrow}>
              <IoIosArrowDown className={style.arrowIcon} onClick={()=>{
                setActive(true)
              }}/>
            </div>
          </div>}
          
          
          <div className={style.GamePlay}>
              <div className={style.sideIcon}>
                <img src={svgIcon} alt=""  className={style.svgRight}/>
                <img src={svgBottom} alt="" className={style.svgBottom} />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L120,229.3C240,203,480,149,720,149.3C960,149,1200,203,1320,229.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
              </div>
              <div className={style.Screen}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000" fill-opacity="1" d="M 400 100 Q 500 300 400 500 L 500 500 L 500 100 L 400 100 "></path></svg> */}
                <img src={game.featured_image.large} alt="" />
                {/* <img src="https://images.unsplash.com/photo-1675789652972-ee2040d2cc9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" /> */}
                {/* <iframe src="https://www.youtube.com/embed/-CbyAk3Sn9I" title="Pac-Man Original (Arcade 1980)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                {/* <video ref={videoRef} poster="https://images.unsplash.com/photo-1675789652972-ee2040d2cc9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" controls>
                    <source src={coverVideo} type="video/mp4" />
                </video> */}
              </div>
          </div>
          <div className={style.Controls}>
              <div className={style.icons}>
                <div className={style.Magnify}>
                  <img src={binoculars} alt="" />
                  <span>5</span>
                </div>
                <div className={style.life}>
                  <div className={style.lifeIcons}>
                    <img src={user} alt="" className={style.userIcons1}/>
                    <img src={user} alt="" className={style.userIcons2}/>
                    <img src={user} alt="" className={style.userIcons3}/>
                  </div>
                  <span>3</span>
                </div>
              </div>
              <div className={style.Start}>
                <div className={style.points}>
                  <p>340</p>
                </div>
                  <div className={style.StartButton}>
                    <div className={style.play}>
                      <div className={style.playBtn}>
                        <p>PLAY</p>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={style.Actions}>
                <div className={style.ActionBtn}>
                  <div className={style.Retry}>
                    <MdOutlineRestartAlt className={style.RetryIcon}/>
                  </div>
                </div>
                <div className={style.UserActionBtn}>
                  <div className={style.user}>
                    <img src={user} alt="" />
                  </div>
                </div>
                <div className={style.CameraActionBtn}>
                  <div className={style.Camera}>
                    <MdFlipCameraIos className={style.cameraIcon}/>
                  </div>
                </div>
              </div>
              <div className={style.Report}>
                <RxExclamationTriangle className={style.ReportIcon}/>
                <p>Report Issue</p>
              </div>
          </div>
          
        </div>
    </div>
  )
}

export default Description