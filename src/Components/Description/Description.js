import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Description.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineRestartAlt, MdFlipCameraIos } from "react-icons/md";
import { RxExclamationTriangle } from "react-icons/rx";
import userIcon from "../../assests/penguin.png";
import binoculars from "../../assests/binoculars.png";
import svgIcon from "../../assests/SIDEpng2.png";
import svgBottom from "../../assests/SIDEBottom.png";
import info from '../../assests/info.png'
import userView from '../../assests/GAME - ICON - Queue no bubble ICON.png'

// import videoDemo from "../../assests/www.ytmp4.Net---Arcade Game_ Pac-Man (1980 Namco (Midway License for US release)).mp4";
import { useDispatch, useSelector } from "react-redux";
import { gameEntry, getAllGames } from "../../actions/product";
import gameScreen from "../../assests/gamescreen.png";
import gameScreen2 from "../../assests/gamescreen2.png";
import io  from "socket.io-client";
import { BsArrowLeft,BsArrowRight,BsArrowUp } from "react-icons/bs";
// import svgIcon from '../../assests/sideIcon.png';
import restartImg from '../../assests/Last Win Button.png'
import cameraImage from '../../assests/Switch Camera Button.png'
import playInfo from '../../assests/How to Play Button.png'
import reportImage from '../../assests/Report Issue Icon.png'
import startImage from '../../assests/Play Button.png'
import Lottie from "lottie-react";
import RightArrow from '../../Animation/arrow_right.json'
import LeftArrow from '../../Animation/left_arrow.json'
import UpArrow from '../../Animation/arrow_up.json'
import waitAnime from '../../Animation/wait_reverse.json'
import ticketIcon from '../../assests/golden-ticket.png'
import infoIcon from '../../assests/info.png'
import Demo from "../Home/Demo";
import pointsBg from '../../assests/Price of Game BG.png'
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
  const dataEntry = {
    category_id:0,
    country_code:user&&user.coutryname,
    user_id:user&&user.user_id

  }
  const{products} = useSelector((state)=>state.collectionProducts)
  const { game } = useSelector((state) => state.gameEntry);
  console.log("its game",game);
  useEffect(() => {
    console.log("user", user);
    dispatch(getAllGames(dataEntry))
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
  const[failed,setFailed] = useState(false)
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
      setTimeout(()=>{
        setFailed(true)
        setSecondStep(false)
        setGameStatus(false)
      },150000)
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
    },20000)
  })

}
  return (
    <div className={style.Container}>
      {/* <div className={style.Overlay}></div> */}
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

        <div className={style.OtherGames}>
          <div className={style.OtherBtn}>
            
            <Link to="/prizes"><button>EXIT GAME</button></Link>
          </div>
          <div className={style.OtherTitle}>
            <p>YOU MIGHT ALSO LIKE</p>
          </div>
          <div className={style.AllGames}>
            {products&&products.map((gameItem,index)=>{
              if(index<6){
                return(
                  <Link to={`/prizes/game/${gameItem.id}`} state={{ game:gameItem ,user:info}} className={style.GameAnchor}>
                  <div className={style.SingleGame}>
                    <div className={style.ProductImage}>
                      <img src={gameItem.featured_image.large} alt="" />
                    </div>
                    <div className={style.ProductContent}>
                      <div className={style.ProductTitle}>
                        <p>{gameItem.title}</p>
                      </div>
                      <div className={style.PriceSection}>
                        <div className={style.TicketIcon}>
                          <img src={ticketIcon} alt="" />
                        </div>
                        <div className={style.ProductPrice}>
                          <p>{gameItem.price}</p>
                        </div>
                        <div className={style.InfoIcon}>
                          <img src={infoIcon} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                )
              }
              
            })}
          </div>
        </div>
        <div className={style.gameSection}>
        <div className={style.GamePlay}>
          
          <div className={style.Screen}>
           
            <div className={style.icons}>
           
            <div className={style.Magnify}>
              <img src={binoculars} alt="" />
              <span>{game.total_viewers ? game.total_viewers : 0}</span>
            </div>
            <div className={style.life}>
              <div className={style.lifeIcons}>
                <img src={userView} alt="" className={style.userIcons1} />
                {/* <img src={userIcon} alt="" className={style.userIcons2} />
                <img src={userIcon} alt="" className={style.userIcons3} /> */}
              </div>
              <span>{game.total_players ? game.total_players : 0}</span>
            </div>
          </div>
            {/* <iframe src={src1} title={gameData.title} className={camera===true?style.showVideo:style.hideVideo}></iframe>
            <iframe src={src2} title={gameData.title} className={camera===false?style.showVideo:style.hideVideo}></iframe> */}
            <div className={camera===true?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""}
            </div>
            <div className={camera===false?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[1]&&game.camera_data[1].session} token={game&&game.camera_data&&game.camera_data[1]&&game.camera_data[1].token}/>
:""}
            </div>
            {/* <div className={camera===true?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""}
            </div>
            <div className={camera===false?style.showVideo:style.hideVideo}>
            {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""}
            </div> */}
            {/* {game&&game.camera_data?<Demo sessionId={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].session} token={game&&game.camera_data&&game.camera_data[0]&&game.camera_data[0].token}/>
:""} */}
                        
          
          </div>
        </div>
        <div className={style.MobileControls}>
         
          <div className={style.ActionBtn}>
            <div className={style.Restart}>
              
              <img src={cameraImage} alt="" onClick={()=>{
                camera?setCamera(false):setCamera(true)
              }}/>
            </div>
            <div className={style.Start}>
              <div className={style.Play}>
                      <div className={style.Points}>
                        <img src={pointsBg} alt="" />
                        <p>{user&&user.point}</p>
                      </div>
                      {gameStatus?firstStep?direction&&direction[1]==="Right"?
                      <button onMouseDown={(e) => {
                        firstMoveStart(direction&&direction[1].toUpperCase())
                      }}
                      onMouseUp={()=>{
                        firstMoveRelease()
                      }}
                      onTimeUpdate={(e)=>{
                        console.log(e)
                      }}>
                        <Lottie animationData={RightArrow} loop={false} onComplete={()=>{
                          setFailed(true)
                        }}/>
                      </button>
                      
                    :direction&&direction[1]==="Left"?
                    <button  onMouseDown={(e) => {
                      firstMoveStart(direction&&direction[1].toUpperCase())
                    }}
                    onMouseUp={()=>{
                      firstMoveRelease()
                    }}>
                      <Lottie animationData={LeftArrow} loop={false}  onComplete={()=>{
                          setFailed(true)
                        }}/>/>
                    </button>
                    :<Lottie animationData={waitAnime} loop={false}/>:secondStep?
                    <button
                     onMouseDown={(e) => {
                      SecondMoveStart()
                      console.log("e.target.value")
                    }}
                    onMouseUp={()=>{
                      secondMoveRelease()
                    }}>
                        <Lottie animationData={UpArrow} loop={false} onComplete={()=>{
                          setFailed(true)
                        }}/>/>
                    </button>
                    
    
                  :gameStatus?<Lottie animationData={waitAnime} loop={false}/>:"Play"
                    :failed?<Lottie animationData={waitAnime} loop={false}/>: 
                    <button onClick={(e) => {
                      // joinGame(e)
                      // connectSocket()
                      joinGame(e)
                      // setWait(true)
                    }}>
                      <img src={startImage}/>
                    </button>
                    }
                    {/* {gameStatus?"Wait":"Play"} */}
                    
                  {/* </button>} */}
                      
                    {/* </div>
                  </div>
                </div> */}
              </div>
              <div className={style.ReportDiv}>
                <img src={reportImage} alt="" />
                
              </div>
            </div>
            <div className={style.CameraDiv}>
            <div className={style.userDiv}>
                
                <img src={playInfo} alt="" />
              </div>
              <div className={style.AngleChanger}>
                
                <img src={restartImg} alt="" />
              </div>
              
            </div>
          </div>
        </div>
        </div>
        <div className={style.leftSide}>

        </div>
        
      </div>
    </div>
  );
};

export default Description;
