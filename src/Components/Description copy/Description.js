import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Description.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineRestartAlt, MdFlipCameraIos } from "react-icons/md";
import { RxExclamationTriangle } from "react-icons/rx";
import userIcon from "../../assests/penguin.png";
import binoculars from "../../assests/binoculars.png";
import svgIcon from "../../assests/SIDEpng2.png";
import svgBottom from "../../assests/SIDEBottom.png";
// import videoDemo from "../../assests/www.ytmp4.Net---Arcade Game_ Pac-Man (1980 Namco (Midway License for US release)).mp4";
import { useDispatch, useSelector } from "react-redux";
import { gameEntry } from "../../actions/product";
import gameScreen from "../../assests/gamescreen.png";
import gameScreen2 from "../../assests/gamescreen2.png";
import io  from "socket.io-client";
import { BsArrowLeft,BsArrowRight,BsArrowUp } from "react-icons/bs";
// import svgIcon from '../../assests/sideIcon.png';
const Description = () => {
  const dispatch = useDispatch();
  const [wait, setWait] = useState(false);
  const [camera, setCamera] = useState(true);
  const baseUrl = "https://uat.wincha-online.com";
  const { user } = useSelector((state) => state.userData);
  const [direction, setDirection] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let stateData = location.state;
  const gameData = stateData.game;
  const { game } = useSelector((state) => state.gameEntry);
  console.log("its game",game);
  useEffect(() => {
    console.log("user", user);
    dispatch(gameEntry(datas));
   
    
    if (user === undefined) {
      navigate("/login");
    }
  }, [navigate, dispatch, wait]);
  const datas = {
    catalog: gameData && gameData.id,
    playerID: user && user.id,
    machineCode: gameData && gameData.machine_code,
    source: "android",
    replay: false,
    freeplay: false,
  };

  
  const [active, setActive] = useState(true);
  const src1 = `https://wincha-online.com/camera/subscribe.html?cid=1&mcode=${
    gameData && gameData.machine_code
  }`;
  const src2 = `https://wincha-online.com/camera/subscribe.html?cid=2&mcode=${
    gameData && gameData.machine_code
  }`;
  const data ={user_id:"63d0c1fedcc86094481af6e8",socket_id:"g07wnxHwDJre_l5pAADJ",machineCode:"UK-WH1-NID1-215"}
  const[firstStep,setFirstStep] = useState(false)
  const[secondStep,setSecondStep] = useState(false)
  console.log("direction",direction)
  const firstMoveStart=async(directionMove)=>{
    await fetch(`${baseUrl}/game/movement`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game&&game.machineCode,
        playerId:user&&user.user_id,
        command:directionMove
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log(data)
      // setTimeout(()=>{
      //   setGameStatus(false)
      //   navigate("/")
      // },15000)
    })
  
  }
  const SecondMoveStart=async()=>{
    await fetch(`${baseUrl}/game/movement`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game&&game.machineCode,
        playerId:user&&user.user_id,
        command:"P_FW"
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log(data)
      
      
    })
  
  }
  const firstMoveRelease=async()=>{
    await fetch(`${baseUrl}/game/movement`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game&&game.machineCode,
        playerId:user&&user.user_id,
        command:"RL_STOP"
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log(data)
      setFirstStep(false)
      setSecondStep(true)
      // clearTimeout()
    })
  
  }
  const secondMoveRelease=async()=>{
    await fetch(`${baseUrl}/game/movement`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game&&game.machineCode,
        playerId:user&&user.user_id,
        command:"FW_STOP"
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log(data)
      setSecondStep(false)
      // clearTimeout()
      setGameStatus(true)
      setTimeout(()=>{
        setGameStatus(false)
      },game&&game.machine_delay_time*1000)
    })
  
  }
  const startGame=async()=>{
    console.log("direction from start",direction)
    await fetch(`${baseUrl}/game/start`,{
      method:"POST",
      body:JSON.stringify({
        machineCode:game&&game.machineCode,
        playerId:user&&user.user_id,
        source:"android",
        freeplay:false
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>res.json()).then((data)=>{
      console.log("starting")
      setDirection(game&&game.movement.split("-"));
      setFirstStep(true)
    })
  }
  const[gameStatus,setGameStatus] = useState(false)
const joinGame=async(e)=>{
  e.preventDefault()
  await fetch(`${baseUrl}/game/join`,{
    method:"POST",
    body:JSON.stringify({
      machineCode:game&&game.machineCode,
      playerId:user&&user.user_id,
      freeplay:false
    }),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json()).then((data)=>{
    console.log("joined")
    setGameStatus(true)
    setTimeout(()=>{
      startGame()
    },5000)
  })

}
  return (
    <div className={style.Container}>
      <div className={style.Overlay}></div>
      <div className={style.Description}>
        {active ? (
          <div className={style.NowPlaying}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <div className={style.Image}>
              <img src={gameData.featured_image.large} alt="" />
            </div>
            <p className={style.title}>{gameData.title}</p>
            <div className={style.arrow}>
              <IoIosArrowUp
                className={style.arrowIcon}
                onClick={() => {
                  setActive(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={style.minimized}>
            <p className={style.head}>YOU'RE PLAYING FOR</p>
            <p className={style.title}>{gameData.title}</p>
            <div className={style.arrow}>
              <IoIosArrowDown
                className={style.arrowIcon}
                onClick={() => {
                  setActive(true);
                }}
              />
            </div>
          </div>
        )}

        <div className={style.GamePlay}>
          <div className={style.sideIcon}>
            <img src={svgIcon} alt="" className={style.svgRight} />
            <img src={svgBottom} alt="" className={style.svgBottom} />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L120,229.3C240,203,480,149,720,149.3C960,149,1200,203,1320,229.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          </div>
          <div className={style.Screen}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000" fill-opacity="1" d="M 400 100 Q 500 300 400 500 L 500 500 L 500 100 L 400 100 "></path></svg> */}
            {/* <img src={game.featured_image.large} alt="" /> */}
            {/* <img src="https://images.unsplash.com/photo-1675789652972-ee2040d2cc9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60" alt="" /> */}
            {/* <img
              src={gameScreen}
              alt={gameData.title}
              className={camera === true ? style.showVideo : style.hideVideo}
            /> */}
            <iframe src={src1} title={gameData.title} className={camera===true?style.showVideo:style.hideVideo}></iframe>
            <iframe src={src2} title={gameData.title} className={camera===false?style.showVideo:style.hideVideo}></iframe>

            {/* <img
              src={gameScreen2}
              alt={gameData.title}
              className={camera === false ? style.showVideo : style.hideVideo}
            /> */}
            {/* <iframe src={camera?src1:src2} title={gameData.title}></iframe> */}

            {/* <iframe src="https://www.youtube.com/embed/dScq4P5gn4A" title="Arcade Game: Pac-Man (1980 Namco (Midway License for US release))" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          </div>
        </div>
        <div className={style.Controls}>
          <div className={style.icons}>
            {/* <div className={style.Divs} style={{animationPlayState:firstMoveStart?"running":firstMoveRelease?"paused":"none"}}>

            </div> */}
            <div className={style.Magnify}>
              <img src={binoculars} alt="" />
              <span>{game.total_viewers ? game.total_viewers : 0}</span>
            </div>
            <div className={style.life}>
              <div className={style.lifeIcons}>
                <img src={userIcon} alt="" className={style.userIcons1} />
                <img src={userIcon} alt="" className={style.userIcons2} />
                <img src={userIcon} alt="" className={style.userIcons3} />
              </div>
              <span>{game.total_players ? game.total_players : 0}</span>
            </div>
          </div>
          <div className={style.Start}>
          
            <div className={style.points}>
              <p>340</p>
            </div>
            <div className={style.StartButton}>
             
             <div className={style.play}>
              {/* <p>123</p> */}
                <div className={style.playBtn}>
                
                  {gameStatus?firstStep?direction&&direction[1]==="Right"?<button onMouseDown={(e) => {
                      firstMoveStart(direction&&direction[1].toUpperCase())
                    }}
                    onMouseUp={()=>{
                      firstMoveRelease()
                    }}><BsArrowRight/></button>:direction&&direction[1]==="Left"?<button  onMouseDown={(e) => {
                      firstMoveStart(direction&&direction[1].toUpperCase())
                    }}
                    onMouseUp={()=>{
                      firstMoveRelease()
                    }}><BsArrowLeft/></button>:"wait":secondStep?<button
                    onMouseDown={(e) => {
                      SecondMoveStart()
                    }}
                    onMouseUp={()=>{
                      secondMoveRelease()
                    }}
                  >
                    <BsArrowUp/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                          <defs>
                              <linearGradient id="GradientColor">
                                <stop offset="0%" stop-color="#e91e63" />
                                <stop offset="100%" stop-color="#673ab7" />
                              </linearGradient>
                          </defs>
                          <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg> */}
                  </button>:<button>
                    {gameStatus?"Wait":"Play"}
                  </button>: <button
                    onClick={(e) => {
                      // joinGame(e)
                      // connectSocket()
                      joinGame(e)
                      // setWait(true)
                    }}
                  >
                    {gameStatus?"Wait":"Play"}
                    
                  </button>}
                 
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
                <MdOutlineRestartAlt
                  className={style.RetryIcon}
                  onClick={() => {
                    // handleReplay();
                    // handlePause();
                  }}
                />
              </div>
            </div>
            <div className={style.UserActionBtn}>
              <div className={style.user}>
                <img src={userIcon} alt="" />
              </div>
            </div>
            <div className={style.CameraActionBtn}>
              <div className={style.Camera}>
                <MdFlipCameraIos
                  className={style.cameraIcon}
                  onClick={() => {
                    if (camera === false) {
                      setCamera(true);
                    } else {
                      setCamera(false);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className={style.Report}>
            <div className={style.ReportOuter}>
              <RxExclamationTriangle className={style.ReportIcon} />
            </div>
            {/* <RxExclamationTriangle className={style.ReportIcon} /> */}
            <p>Report Issue</p>
          </div>
        </div>
        <div className={style.MobileControls}>
          <div className={style.icons}>
            <div className={style.Magnify}>
              <img src={binoculars} alt="" />
              <span>{game.total_viewers ? game.total_viewers : 0}</span>
            </div>
            <div className={style.life}>
              <div className={style.lifeIcons}>
                <img src={userIcon} alt="" className={style.userIcons1} />
                <img src={userIcon} alt="" className={style.userIcons2} />
                <img src={userIcon} alt="" className={style.userIcons3} />
              </div>
              <span>{game.total_players ? game.total_players : 0}</span>
            </div>
          </div>
          <div className={style.ActionBtn}>
            <div className={style.Restart}>
              <div className={style.OuterDiv}>
                <div className={style.innerDiv}>
                  <div className={style.ContentDiv}>
                    <MdFlipCameraIos />
                  </div>
                </div>
              </div>
            </div>
            <div className={style.Start}>
              <div className={style.Play}>
                <div className={style.OuterDiv}>
                  <div className={style.innerDiv}>
                    <div className={style.ContentDiv}>
                      {/* <p>Play</p> */}
                      {gameStatus?firstStep?direction&&direction[1]==="Right"?<button  onMouseDown={(e) => {
                      firstMoveStart(direction&&direction[1].toUpperCase())
                    }}
                    onMouseUp={()=>{
                      firstMoveRelease()
                    }}><BsArrowRight/></button>:direction&&direction[1]==="Left"?<button  onMouseDown={(e) => {
                      firstMoveStart(direction&&direction[1].toUpperCase())
                    }}
                    onMouseUp={()=>{
                      firstMoveRelease()
                    }}><BsArrowLeft/></button>:"Wait":secondStep?<button
                    onMouseDown={(e) => {
                      SecondMoveStart()
                    }}
                    onMouseUp={()=>{
                      secondMoveRelease()
                    }}
                  >
                    <BsArrowUp/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                          <defs>
                              <linearGradient id="GradientColor">
                                <stop offset="0%" stop-color="#e91e63" />
                                <stop offset="100%" stop-color="#673ab7" />
                              </linearGradient>
                          </defs>
                          <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                  </svg> */}
                  </button>:<button>
                    {gameStatus?"Wait":"Play"}
                  </button>: <button
                    onClick={(e) => {
                      // joinGame(e)
                      // connectSocket()
                      joinGame(e)
                      // setWait(true)
                    }}
                  >
                    {gameStatus?"Wait":"Play"}
                    
                  </button>}
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.ReportDiv}>
                {/* <div className={style.OuterDiv}>
                
                  <div className={style.innerDiv}>
                    <div className={style.ContentDiv}> */}
                <div className={style.ReportOuter}>
                  <RxExclamationTriangle className={style.ReportIcon} />
                </div>
                {/* </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className={style.CameraDiv}>
              <div className={style.AngleChanger}>
                <div className={style.OuterDiv}>
                  <div className={style.innerDiv}>
                    <div className={style.ContentDiv}>
                      <img src={userIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.userDiv}>
                <div className={style.OuterDiv}>
                  <div className={style.innerDiv}>
                    <div className={style.ContentDiv}>
                      <MdOutlineRestartAlt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
