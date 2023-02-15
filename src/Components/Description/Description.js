import React, { useState,useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './Description.module.css'
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { MdOutlineRestartAlt,MdFlipCameraIos } from "react-icons/md";
import { RxExclamationTriangle } from "react-icons/rx";
import userIcon from '../../assests/penguin.png'
import binoculars from '../../assests/binoculars.png'
import svgIcon from '../../assests/SIDEpng2.png';
import svgBottom from '../../assests/SIDEBottom.png';
import videoDemo from '../../assests/www.ytmp4.Net---Arcade Game_ Pac-Man (1980 Namco (Midway License for US release)).mp4';
import { useDispatch, useSelector } from 'react-redux';
import { gameEntry } from '../../actions/product';
import gameScreen from '../../assests/gamescreen.png'
import gameScreen2 from '../../assests/gamescreen2.png'
// import svgIcon from '../../assests/sideIcon.png';
const Description = () => {
  const dispatch = useDispatch()
  const[wait,setWait] = useState(false)
  const[camera,setCamera] = useState(true)
  const baseUrl = "https://uat.wincha-online.com"
  const{user}=useSelector((state)=>state.userData)
  const{game} = useSelector((state)=>state.gameEntry)
  const[direction,setDirection] = useState([])
  // useEffect(()=>{
  // },[game])
  // console.log("direction",direction);
  // const userD = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  useEffect(()=>{
    console.log("user",user)
    setDirection(game&&game.movement&&game.movement.split("-"))
    if(user===undefined){
          navigate("/login")
      }
      dispatch(gameEntry(datas))
  },[navigate,dispatch,wait])
  // useEffect(()=>{
      
  // },[dispatch,wait])
  const location = useLocation()
  let stateData = location.state
  const gameData = stateData.game 
  console.log(game)
  // const{data} = useSelector((state)=>state.userData)
const datas = {
  catalog:gameData&&gameData.id,
  playerID:user&&user.id,
  machineCode:gameData&&gameData.machine_code,
  source:"android",
  replay:false,
  freeplay:false
}
  
  const videRef = useRef()
  const[play,setPlay] = useState(false)
  const handlePlay=()=>{
    setPlay(true)
    videRef.current.play()
    
  }
  const handlePause=()=>{
    setPlay(false)
      videRef.current.pause()
    
  }
  const handleReplay=()=>{
    console.log(videRef)
    setPlay(true)
    videRef.current.currentTime = 0;
  }
// const startGame=async(e)=>{
//   console.log("reached game start")

//   await fetch(`${baseUrl}/game/start`,{
//     method:"POST",
//         body:JSON.stringify({
//           machineCode:gameData&&gameData.machine_code,
//           playerID:user&&user.user_id,
//           source:"android",
//           freeplay:false
//         }),
//         headers:{
//           "Content-Type":"application/json"
//       }
//     }).then(res=>res.json()).then((data)=>{
//       console.log(data)
//     })
// }
  const[active,setActive]= useState(true)
  const joinGame = async(e)=>{
    e.preventDefault()
    console.log("reached game join")
    try {
      await fetch(`${baseUrl}/game/join`,{
        method:"POST",
        body:JSON.stringify({
          machineCode:gameData&&gameData.machine_code,
          playerID:user&&user.user_id,
          freeplay:false
        }),
        headers:{
          "Content-Type":"application/json"
      }
      }).then(res=>res.json()).then((data)=>{
        // if(game.total_players===0){
          console.log("data from join",data)
        //   setWait(false)
        //   startGame()
        // }
        // setWait(true)
        
      })
      dispatch(gameEntry(datas))
    } catch (error) {
      console.log(error);
    }
  }
  const src1 = `https://wincha-online.com/camera/subscribe.html?cid=1&mcode=${gameData&&gameData.machine_code}`
  const src2 = `https://wincha-online.com/camera/subscribe.html?cid=2&mcode=${gameData&&gameData.machine_code}`
  return (
    <div className={style.Container}>
    <div class={style.Overlay}></div>
        <div className={style.Description}>
          {active?<div className={style.NowPlaying}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <div className={style.Image}>
              <img src={gameData.featured_image.large} alt="" />
            </div>
            <p className={style.title}>{gameData.title}</p>
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
                {/* <img src={game.featured_image.large} alt="" /> */}
                {/* <img src="https://images.unsplash.com/photo-1675789652972-ee2040d2cc9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" /> */}
                <img src={gameScreen} alt={gameData.title} className={camera===true?style.showVideo:style.hideVideo}/>
                {/* <iframe src={src1} title={gameData.title} className={camera===true?style.showVideo:style.hideVideo}></iframe> */}
                {/* <iframe src={src2} title={gameData.title} className={camera===false?style.showVideo:style.hideVideo}></iframe> */}
               
                <img src={gameScreen2} alt={gameData.title} className={camera===false?style.showVideo:style.hideVideo}/>
                {/* <iframe src={camera?src1:src2} title={gameData.title}></iframe> */}
               
                {/* <iframe src="https://www.youtube.com/embed/dScq4P5gn4A" title="Arcade Game: Pac-Man (1980 Namco (Midway License for US release))" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
              </div>
          </div>
          <div className={style.Controls}>
              <div className={style.icons}>
                <div className={style.Magnify}>
                  <img src={binoculars} alt="" />
                  <span>{game.total_viewers?game.total_viewers:0}</span>
                </div>
                <div className={style.life}>
                  <div className={style.lifeIcons}>
                    <img src={userIcon} alt="" className={style.userIcons1}/>
                    <img src={userIcon} alt="" className={style.userIcons2}/>
                    <img src={userIcon} alt="" className={style.userIcons3}/>
                  </div>
                  <span>{game.total_players?game.total_players:0}</span>
                </div>
              </div>
              <div className={style.Start}>
                <div className={style.points}>
                  <p>340</p>
                </div>
                  <div className={style.StartButton}>
                    <div className={style.play}>
                      <div className={style.playBtn}>
                        <button onClick={(e)=>{
                          // joinGame(e)
                          
                          // setWait(true)
                        }}>Play</button>
                        {/* }}>{wait?"Wait":"Play"}</button> */}
                        {/* <button onMouseDown={(e)=>{
                          console.log("clicking")
                        }} onMouseUp={()=>{
                          console.log("leaved")
                        }}>Play</button> */}
                        {/* {game.total_players===0?<button onMouseDown={(e)=>{
                          console.log("clicking")
                        }} onMouseUp={()=>{
                          console.log("leaved")
                        }}>Play</button>:<button>Wait</button>} */}
                        {/* {play?<button onClick={handlePause}>wait</button>:<button onClick={handlePlay}>Play</button>} */}
                      {/* <button onClick={handlePlay}>Play</button> */}
                      </div>
                    </div>
                  </div>
              </div>
              <div className={style.Actions}>
                <div className={style.ActionBtn}>
                  <div className={style.Retry}>
                    <MdOutlineRestartAlt className={style.RetryIcon} onClick={()=>{
                      handleReplay()
                      handlePause()
                    }}/>
                  </div>
                </div>
                <div className={style.UserActionBtn}>
                  <div className={style.user}>
                    <img src={userIcon} alt="" />
                  </div>
                </div>
                <div className={style.CameraActionBtn}>
                  <div className={style.Camera}>
                    <MdFlipCameraIos className={style.cameraIcon} onClick={()=>{
                      if(camera===false){
                        setCamera(true)
                      }
                      else{
                        setCamera(false)
            
                      }
                    }}/>
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