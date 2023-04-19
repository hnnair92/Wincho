import React, { useEffect, useState } from "react";
import style from "./Games.module.css";
import Ticket from "../../assests/golden-ticket.png";
import info from "../../assests/info.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { configutation, getAllGames, getProductByCollection } from "../../actions/product";
import Loader from "../Loader/Loader";
import labelNew from "../../assests/New Banner.png";
import closeIcon from "../../assests/Search X.png";
import searchIcon from "../../assests/Search Icon.png";
import eye from "../../assests/Password Eye.png";
// import info from "../../assests/Information Icon.png";
import icon from "../../assests/Wincha Support Icon.png";
import BundleSection from "../../assests/Artboard 48 Bundle Icon and TEXT.png"
import FreeplaySection from "../../assests/Artboard 48 Freeplay Icon and TEXT.png"
import NotificationSection from "../../assests/Artboard 48 Notification Icon and TEXT.png"
import ShippingSection from "../../assests/Artboard 48 Shipping Icon and TEXT.png"
import CloseImage from "../../assests/Artboard 48 X.png"
import Lower from "../../assests/Artboard 48 - Lower Image Split.png"
import Upper from "../../assests/Artboard 48 - Upper Image Split.png"
import {assets} from '../Description/assests'
import Lottie from 'lottie-react'
import { AllAnimation } from "../../Animation/allAnimation";

const Games = () => {
  const { id } = useParams();
  const location = useLocation()
  const state = location.state
  const baseUrl = "https://uat.wincha-online.com";
  let { products, loading } = useSelector((state) => state.collectionProducts);
  const [popup, setPopup] = useState(false);
  const [resendEmail,setResendEmail] = useState(false)
  const [gameData, setGameData] = useState({});
  const [premiumPopup, setPremiumPopup] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.profile);
  const [searchIconStatus,setSearchIconStatus]= useState(false)
  const userDatas = JSON.parse(localStorage.getItem("user"));
  //   console.log(userDatas);
  const navigate = useNavigate();
  const [topup,setTopup] = useState(false)
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState(false);
  const [category, setCategory] = useState(state&&state.category?state.category:"free");
  const [history, setHistory] = useState(false);
  const [ids, setId] = useState("");
  const [imageGallery,setImageGallery] = useState([])
  const [loadingScreen,setLoadingScreen] = useState(false)
  const [countSection,setCountSection] = useState(0)
  const times = localStorage.getItem("times")
  useEffect(()=>{
    console.log(state)
  },[state])
  // console.log(imageGallery)
  // useEffect(()=>{
  //   if(times>=configuration.FREE_PLAY_LIMIT){
  //     setTopup(true)
  //   }
  // })
  async function resendEmailApi(){
    setLoadingScreen(true)
    await fetch(`${baseUrl}/user/verification/resend`, {
      method: "POST",
      body: JSON.stringify({
        user: userId,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingScreen(false)
        setResendEmail(false)
      });
  }
  useEffect(()=>{
    if(popup===false){
      setImageGallery([])
    }
  },[popup])
  // useEffect(()=>{
  //   if(window.innerWidth<=767){
  //     setSearchIconStatus(false)
  //   }
  //   else{
  //     setSearchIconStatus(true)
  //   }
  // },[window.innerWidth])
  useEffect(()=>{
    const premiumData = localStorage.getItem("premium")
    if(premiumData===null||premiumData===undefined){
      setPremiumPopup(true)
    }
    else{
      setPremiumPopup(false)
    }
  },[])
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
    // if (category === "all") {
    //   dispatch(getAllGames(response));
    // } else {
      dispatch(getProductByCollection(response));
      dispatch(configutation());
    // }
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
      value: "0",
      NoOfGames: 0,
      id: 7,
    },
  ];
  useEffect(()=>{
    if(search!==""){
      setCategory("")
    }
    else{
      setCategory("free")
    }
  },[search])
  // const[active,setActive]= useState(false)
  const [allCategory, setAllCategory] = useState("");
  // const[getAllCategory,setGetAllCategory] = useState("")
  return (
    <div className={style.Container}>
      {/* <div className={style.Section}> */}
        {}
        <div className={style.Categories}>
          <div className={style.CategoriesSection}>
          <div className={style.AllCategories}>
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
          </div>
            <div className={style.Search}>
              <div className={style.SearchIcon} onClick={()=>{
                setSearchIconStatus(true)
              }}>
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
                    setSearchIconStatus(false)
                  }}
                />
              </div>
            
            </div>
            <div className={style.MSearch}>
              <div className={style.SearchIcon} onClick={()=>{
                setSearchIconStatus(true)
              }}>
                <img src={searchIcon} alt="" />
              </div>
              {searchIconStatus?
              
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
            :""
            }
              {searchIconStatus?
              <div className={style.EmptySearch}>
                <img
                  src={closeIcon}
                  alt=""
                  onClick={() => {
                    setSearch("");
                    setSearchIconStatus(false)
                  }}
                />
              </div>
            :""
            }
            </div>
          </div>

          {/* <button className={allCategory==="all"?style.active:style.category} onClick={(e)=>{
                  setAllCategory("all")
                  setCategory("")
              }}>All</button> */}
        </div>
        {premiumPopup&&user&&user.vip===false?
      <div className={style.clubHousePopup}>
      <div className={style.OverlayBg} onClick={()=>{
            setPremiumPopup(false)
            localStorage.setItem("premium",JSON.stringify(true))
        }}>

        </div>
        <div className={style.ClubHouse}>
            <div className={style.TopImage}>
          <div className={style.clubHouseClose} onClick={()=>{
            localStorage.setItem("premium",JSON.stringify(true))
            setPremiumPopup(false)
          }}>
            {/* <MdClose/> */}
            <img src={CloseImage} alt="" />
          </div>
              <img src={Upper} alt="" />
            </div>
            <div className={style.BottomContents}>
              {/* <div className={style.LowerImg}>
                <img src={Lower} alt="" />
              </div> */}
              <div className={style.BonusPoints}>
                  <div className={style.Bonus}>
                    <p>{configuration.VIP_BONUS_POINT}W</p>
                  </div>
                  <div className={style.BonusText}>
                    <p>Sign Up Bonus!</p>
                  </div>
              </div>
              <div className={style.benefits}>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={ShippingSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={BundleSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={NotificationSection} alt="" />

                  </div>
                  
                </div>
                <div className={style.benefit}>
                  <div className={style.benefitImage}>
                  <img src={FreeplaySection} alt="" />

                  </div>
                  
                </div>
              </div>
              <div className={style.SubscribeButton}>
                <button>{`${configuration.CURRENCY_SYMBOL}${configuration.VIP_SUBSCRIPTION} / ${configuration.VIP_SUBSCRIPTION_PERIOD}`}</button>
              </div>
              <div className={style.CancelSubscription}>
                <p>Cancel any time</p>
              </div>
            </div>
            <div className={style.TermsAndPolicy}>
              <div className={style.Terms} onClick={()=>{
                window.open(
                  `${ configuration.terms}`,
                  "_blank"
                );
              }}>
                <p>Subscription Terms</p>
              </div>
              <div className={style.Policy} onClick={()=>{
                window.open(
                  `${ configuration.privacy}`,
                  "_blank"
                );
              }}>
                <p>Privacy Policy</p>
              </div>
            </div>
        </div>

      </div>
      
      :""}
      {resendEmail ? (
          <div className={style.ResendPopup}>
            <div className={style.popupOverlaySection} onClick={()=>{
              setResendEmail(false)
            }}>

            </div>
          {/* {loading?
          <Lottie animationData={AllAnimation.Loader}/>
          :""} */}
            <div className={style.ResendpopupImage}>
              <img src={assets.winchaPopup} alt="" />
            </div>
            <div className={style.ResendpopupText}>
              <p>Awaiting player verification</p>
            </div>
            <div className={style.ResendpopupButton}>
              <div
                // to="/tickets"
                onClick={() => {
                  // setResendEmail(false);
                  // resendEmailApi()
                }}
              >
                <button  onClick={() => {
                  // setResendEmail(false);
                  resendEmailApi();
                }}>RESEND EMAIL</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
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
              ? products.length>0 &&
                products.map((game, index) => {
                  if(category==="all"&&game.category!="free"){

                    return (
                      
                        // <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/login"} state={{game:game,user:user}} className={style.Game} key={index} onClick={(event)=>{
                        <div className={style.Game} key={index} onClick={(event)=>{
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
                        }} 
                        // className={style.parentGame}
                        >
                         {/* <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/login"} state={{game:game,user:user}} className={style.Game} key={index} onClick={(event)=>{ */}

                          <div className={style.SingleGameOverlay} onClick={()=>{
                            if(user&&user.profile_status===false&&game.price!=="0"){
                              setResendEmail(true)
                            }
                            // else{
                            //   navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                            // }
                            if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                              
                            }
                            else if(userId!=null){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });

                            }
                            else{
                              navigate("/login")
                            }
                            console.log(user.profile_status,"status")
                          }}>

                          </div>
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
                                <p className={style.free}>FREE</p>
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
                        </div>
                      
                    );
                  }
                  else{
                    return (
                      
                      // <Link to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:"/register"} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                      <div  className={style.Game} key={index} onClick={(event)=>{
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
                         <div className={style.SingleGameOverlay} onClick={()=>{
                            if(user&&user.profile_status===false&&game.price!=="0"){
                              setResendEmail(true)
                              console.log("not verified")
                            }
                            else if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                              
                            }
                            else if(userId!=null){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });

                            }
                            else{
                              navigate("/login")
                            }
                            // else{
                            //   navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                            // }
                            console.log(user.profile_status,"status")
                          }}>

</div>

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
                              <p className={style.free}>FREE</p>
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
                      </div>
                    
                  );
                  }
                })
              : searchArray &&
                searchArray.map((game, index) => {
                  return (
                    // <div to ={game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined?`/game/${game.slug}`:userId!=null?`/game/${game.slug}`:""} state={{game:game}} className={style.Game} key={index} onClick={(event)=>{
                    <div  className={style.Game} key={index} onClick={(event)=>{
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
                       <div className={style.SingleGameOverlay} onClick={()=>{
                            if(user&&user.profile_status===false&&game.price!=="0"){
                              setResendEmail(true)
                            }
                            // else{
                            //   navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                            // }
                            if(game.price==="0"&&userId===""||game.price==="0"&&userId===null||game.price==="0"&&userId===undefined){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });
                              
                            }
                            else if(userId!=null){
                              navigate(`/game/${game.slug}`, { state: { game: game ,user:user,cateogry:category} });

                            }
                            else{
                              navigate("/login")
                            }
                            console.log(user.profile_status,"status")
                          }}>

</div>
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
                              <p className={style.free}>FREE</p>
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
                    </div>
                  );
                })}
          </div>
        )}
        {history?
        <div className={style.History}>

        </div>
      :""}
        {popup===true && ids ? 
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
                console.log(gameData.content.length)
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
                  if(user&&user.profile_status===false&&gameData.price!="0"){
                    setPopup(false)
                    setResendEmail(true)
                  }
                  else{
                    navigate(`/game/${gameData.slug}`, { state: { game: gameData ,user:user,cateogry:category} });
                  }
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
