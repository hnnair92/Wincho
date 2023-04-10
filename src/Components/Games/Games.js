import React, { useEffect, useState } from "react";
import style from "./Games.module.css";
import Ticket from "../../assests/golden-ticket.png";
import info from "../../assests/info.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { configutation, getAllGames, getProductByCollection } from "../../actions/product";
import Loader from "../Loader/Loader";
import labelNew from "../../assests/New Banner.png";
import closeIcon from "../../assests/Search X.png";
import searchIcon from "../../assests/Search Icon.png";
import {assets} from '../Description/assests'
const Games = () => {
  const { id } = useParams();
  const baseUrl = "https://uat.wincha-online.com";
  let { products, loading } = useSelector((state) => state.collectionProducts);
  const [popup, setPopup] = useState(false);
  const [gameData, setGameData] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.profile);
  const userDatas = JSON.parse(localStorage.getItem("user"));
  //   console.log(userDatas);
  const navigate = useNavigate();
  const [topup,setTopup] = useState(false)
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState(false);
  const [category, setCategory] = useState("free");
  const [history, setHistory] = useState(false);
  const [ids, setId] = useState("");
  const [imageGallery,setImageGallery] = useState([])
  const [countSection,setCountSection] = useState(0)
  const times = localStorage.getItem("times")
  useEffect(()=>{
    console.log(imageGallery)
  },[imageGallery])
  // console.log(imageGallery)
  // useEffect(()=>{
  //   if(times>=configuration.FREE_PLAY_LIMIT){
  //     setTopup(true)
  //   }
  // })
  useEffect(()=>{
    if(popup===false){
      setImageGallery([])
    }
  },[popup])
  useEffect(() => {
    if(popup){
      document.body.style.overflow = 'hidden';
    }
    return ()=> document.body.style.overflow = 'unset';
 }, [popup]);
    // const [category, setCategory] = useState(searchArray.length>0?"":"free");
  const dispatch = useDispatch();
  const response = {
    category_id: category,
    country_code: "UK",
    user_id: user && user.user_id,
  };
  useEffect(() => {
    if (searchArray.length > 0) {
      setCategory("");
    } else {
      setCategory(category);
    }
  }, [category]);
  const searchApi = async () => {
    loading = true
    await fetch(`${baseUrl}/product/search`, {
      method: "POST",
      body: JSON.stringify({
        search_key: search,
        user_id: userId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
    loading = false
        console.log(data);
        setSearchArray(data.data);
        // products.push(data)
        // console.log(search)
      });
  };
  useEffect(() => {
    searchApi();
  }, [search]);
  useEffect(() => {
    if (category === "all") {
      dispatch(getAllGames(response));
    } else {
      dispatch(getProductByCollection(response));
      dispatch(configutation());
    }
    if (user === undefined) {
      // navigate("/login");
    }
  }, [dispatch, category, id]);
  const {configuration} = useSelector((state)=>state.configuration)
  const categories = [
    {
      title: "Free",
      value: "free",
      NoOfGames: 0,
      id: 0,
    },
    {
      title: "Plushies",
      value: "plushies",
      NoOfGames: 0,
      id: 1,
    },
    {
      title: "Novelty",
      value: "novelty",
      NoOfGames: 0,
      id: 2,
    },
    {
      title: "Collectable",
      value: "collectable",
      NoOfGames: 0,
      id: 3,
    },
    {
      title: "e-Gifting",
      value: "e-gifting",
      NoOfGames: 0,
      id: 4,
    },
    {
      title: "New",
      value: "new",
      NoOfGames: 0,
      id: 5,
    },
    {
      title: "Popular",
      value: "popular",
      NoOfGames: 0,
      id: 6,
    },
    {
      title: "All",
      value: "all",
      NoOfGames: 0,
      id: 7,
    },
  ];
  // const[active,setActive]= useState(false)
  const [allCategory, setAllCategory] = useState("");
  // const[getAllCategory,setGetAllCategory] = useState("")
  return (
    <div className={style.Container}>
      {/* <div className={style.Section}> */}
        {}
        <div className={style.Categories}>
          <div className={style.CategoriesSection}>
            {categories.map((categoryItem, index) => {
              return (
                <button
                  key={index}
                  value={categoryItem.value}
                  className={
                    category === categoryItem.value
                      ? style.active
                      : style.category
                  }
                  onClick={(e) => {
                    if (searchArray.length > 0) {
                      setCategory("");
                    } else {
                      // setCategory(category)
                      setCategory(categoryItem.value);
                    }
                    setAllCategory("");

                    // setAllCategory(categoryItem.title)
                  }}
                >
                  {categoryItem.title}
                </button>
              );
            })}
            <div className={style.Search}>
              <div className={style.SearchIcon}>
                <img src={searchIcon} alt="" />
              </div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className={style.EmptySearch}>
                <img
                  src={closeIcon}
                  alt=""
                  onClick={() => {
                    setSearch("");
                  }}
                />
              </div>
            </div>
          </div>

          {/* <button className={allCategory==="all"?style.active:style.category} onClick={(e)=>{
                  setAllCategory("all")
                  setCategory("")
              }}>All</button> */}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className={style.Games}>
            {topup ? (
        <div className={style.popup}>
          <div className={style.popupImage}>
            <img src={assets.winchaPopup} alt="" />
          </div>
          <div className={style.popupText}>
            <p>Woah there you haven't got enough tickets</p>
          </div>
          <div className={style.popupButton}>
            <Link
              to="/tickets"
              onClick={() => {
                setTopup(false);
              }}
            >
              <button>TOP UP</button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
            {search === ""
              ? products &&
                products.map((game, index) => {
                  return (
                    
                      <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.id}`:userId!=null?`/game/${game.id}`:""} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                        console.log("Div")
                        console.log(userId)
                        
                        // else{

                          // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                          // else if(userId!=null){
                          //   navigate(`/game/${game.id}`,{state:{game:game}})
                          // }
                        // }
                        // else if(user)
                      }}>

                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                        <div className={style.Image} onClick={()=>{
                          console.log("images")
                        }}>
                          <img src={game.featured_image.large} alt="" />
                        
                        
                          
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                              <div className={style.ticketIconDiv}>
                                {times>=configuration.FREE_PLAY_LIMIT&&game.price==="0"&&user?.vip===false?
                                <img src={Ticket} alt="" className={style.icon} style={{filter:"grayScale(1)"}}/>
                                :
                                <img src={Ticket} alt="" className={style.icon} style={{filter:"grayScale(0)"}}/>
                              }
                              </div>
                              {game && game.price === "0" ? (
                              <p className={style.free}>Free</p>
                            ) : (
                              <p className={style.Price}>{game.price}</p>
                            )}
                            </div>
                            

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={ (event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery)
                                  console.log(game.id)
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                    // if(game.id===gameData.id){
                                      setImageGallery(game.product_gallery)
                                    // }
                                    setImageGallery(imageGallery=>[...imageGallery,{src:game.featured_image.large}])
                                    // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                    // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    
                  );
                })
              : searchArray &&
                searchArray.map((game, index) => {
                  return (
                    <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.id}`:userId!=null?`/game/${game.id}`:""} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                      console.log("Div")
                      console.log(userId)
                      
                      // else{

                        // if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                        // else if(userId!=null){
                        //   navigate(`/game/${game.id}`,{state:{game:game}})
                        // }
                      // }
                      // else if(user)
                    }}>
                      {/* <div className={style.Game} key={index}> */}
                        {game.new_item === true ? (
                          <div className={style.Label}>
                            {/* <p>New</p> */}
                            <img src={labelNew} alt="" />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {game.price==="0"?<div className={style.LabelFree}>
                          <p>Free</p>
                      </div>:""} */}

                        <div className={style.Image}>
                          <img src={game.featured_image.large} alt="" />
                        </div>
                        <div className={style.Details}>
                          <p className={style.Name}>{game.title}</p>
                          <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                            <div className={style.ticketIconDiv}>
                                {times>=configuration.FREE_PLAY_LIMIT&&game.price==="0"&&user.vip===false?
                                <img src={Ticket} alt="" className={style.icon} style={{filter:"grayScale(1)"}}/>
                                :
                                <img src={Ticket} alt="" className={style.icon} style={{filter:"grayScale(0)"}}/>
                              }
                              </div>
                            {game && game.price === "0" ? (
                              <p className={style.free}>Free</p>
                            ) : (
                              <p className={style.Price}>{game.price}</p>
                            )}
                            </div>

                            <div className={style.infoIcon}>
                              <Link
                                // to=""
                                onClick={ (event) => {
                                  // if(event.target !== event.currentTarget) return;
                                  // console.log(gameData.product_gallery.length)
                                  console.log(gameData.product_gallery)
                                  console.log(game.id)
                                  // if(gameData.product_gallery&&gameData.product_gallery.length>0){
                                    // if(game.id===gameData.id){
                                      setImageGallery(game.product_gallery)
                                    // }
                                    setImageGallery(imageGallery=>[...imageGallery,{src:game.featured_image.large}])
                                    // setImageGallery(prevState=>[...prevState,{src:gameData?.featured_image?.large}])
                                    // setImageGallery(prevState=>[...prevState,{src:gameData.featured_image.large}])
                                  // }
                                  // console.log(imageGallery,"imagegalley")
                                  // setImageGallery([...imageGallery[0],{src:game.featured_image.large}])
                                  // console.log(imageGallery[0])
                                  // setImageGallery([...imageGallery[0],{
                                  //   src:"sdasdsdasd as"
                                  // }])

                                  setId(game.id);
                                  setGameData(game);
                                  setPopup(true);
                                }}
                              >
                                <img src={info} alt="" className={style.info} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      {/* </div> */}
                    </Link>
                  );
                })}
          </div>
        )}
        {history?
        <div className={style.History}>

        </div>
      :""}
        {popup && ids ? 
          <div
            className={style.PopupSection}
            
          >
            <div className={style.PopupOverlay} onClick={() => {
              setImageGallery([])
              setCountSection(0)
              setPopup(false);
              console.log(imageGallery)
            }}>

            </div>
            <div
              className={style.Popup}
              onClick={() => {
                setPopup(true);
              }}
            >
              <div className={style.popupImage}>
              {gameData.product_gallery.length===0?
                          <img src={gameData.featured_image.large} alt="" />
                        
                          :
                          <img src={imageGallery[countSection]&&imageGallery[countSection].src} alt="" />

                          }
                {gameData.product_gallery.length===0?"":
                          <div className={style.Navigation}>

                  {imageGallery.map((count,index)=>{
                    return(
                      <span onClick={()=>{
                        setCountSection(index)
                        console.log(count.src)
                        console.log(imageGallery[index].src)
                      }} className={count?.src===imageGallery[countSection]?.src?style.fill:style.Rounded}></span>
                    )
                  })}
                  </div>
              // </div>
                  }
              <div className={style.popupTitle}>
                <p>{gameData.title}</p>
              </div>
              <div className={style.popupDescription}>
                <p>{gameData.content}</p>
              </div>
              <div
                className={style.popupPlayNow}
                onClick={() => {
                  navigate(`/game/${gameData.id}`, { state: { game: gameData } });
                }}
              >
                {/* <button></button> */}
                <p>PLAY</p>
                <div className={style.popupTicket}>
                  <img src={Ticket} alt="" />
                </div>
                <p>{gameData.price === "0" ? "FREE" : gameData.price}</p>
              </div>
            </div>
          </div>
          </div>
        : (
          ""
        )}
      {/* </div> */}
      </div>
  );
};

export default Games;
