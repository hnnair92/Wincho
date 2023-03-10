import React, { useEffect, useState } from 'react'
import style from './Games.module.css'
import Ticket from '../../assests/golden-ticket.png'
import info from '../../assests/info.png'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getProductByCollection } from '../../actions/product'
import Loader from '../Loader/Loader'
import labelNew from '../../assests/New Banner.png'
import closeIcon from '../../assests/Search X.png'
import searchIcon from '../../assests/Search Icon.png'
const Games = () => {
    const {id} = useParams()
    const {products,loading} = useSelector((state)=>state.collectionProducts)
    const{user}=useSelector((state)=>state.userData)
    const userDatas = JSON.parse(localStorage.getItem("user"))
    console.log(userDatas)
    const navigate = useNavigate()
    const[category,setCategory] = useState("free")
    const dispatch = useDispatch()
    const response = {
        category_id:category,
        country_code:"UK",
        user_id:user&&user.user_id
    }
    useEffect(()=>{
        if(category==="all"){
            dispatch(getAllGames(response))
        }
        else{
            dispatch(getProductByCollection(response))
        }
        if(user===undefined){
            navigate("/login")
        }
    },[dispatch,category,id])


    const categories = [
        {
            title:"Free",
            value:"free",
            NoOfGames:0,
            id:0,
        },
        {
            title:"Plushies",
            value:"plushies",
            NoOfGames:0,
            id:1,
        },
        {
            title:"Novelty",
            value:"novelty",
            NoOfGames:0,
            id:2,
        },
        {
            title:"Collectable",
            value:"collectable",
            NoOfGames:0,
            id:3,
        },
        {
            title:"e-Gifting",
            value:"e-gifting",
            NoOfGames:0,
            id:4,
        },
        {
            title:"New",
            value:"new",
            NoOfGames:0,
            id:5,
        },
        {
            title:"Popular",
            value:"popular",
            NoOfGames:0,
            id:6,
        },
        {
            title:"All",
            value:"all",
            NoOfGames:0,
            id:7,
        },
    ]
    // const[active,setActive]= useState(false)
    const[allCategory,setAllCategory] = useState("")
    // const[getAllCategory,setGetAllCategory] = useState("")
  return (
    <div className={style.Container}>
        <div className={style.Categories}>
            <div className={style.CategoriesSection}>
            {categories.map((categoryItem,index)=>{
                return(
                    <button key={index} value={categoryItem.value} className={category===categoryItem.value?style.active:style.category} onClick={(e)=>{
                        setCategory(categoryItem.value)
                        setAllCategory("")

                        // setAllCategory(categoryItem.title)
                    }}>{categoryItem.title}</button>
                )
            })}
            <div className={style.Search}>
                <div className={style.SearchIcon}>
                    <img src={searchIcon} alt="" />
                </div>
                <input type="text" name="" id="" placeholder='Search...'/>
                <div className={style.EmptySearch}>
                    <img src={closeIcon} alt="" />
                </div>
            </div>
            </div>
            
            {/* <button className={allCategory==="all"?style.active:style.category} onClick={(e)=>{
                setAllCategory("all")
                setCategory("")
            }}>All</button> */}
        </div>
        
        {loading?<Loader/>:<div className={style.Games}>
        {products&&products.map((game,index)=>{
            return(
                <Link to={`game/${game.id}`} state={{ game:game ,user:info}}>
                <div className={style.Game} key={index}>
                    {game.new_item===true?<div className={style.Label}>
                        {/* <p>New</p> */}
                        <img src={labelNew} alt="" />
                    </div>:""}
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
                            <Link to="/tickets">
                                <img src={Ticket} alt="" className={style.icon}/>
                            
                            </Link>
                            </div>
                                {game&&game.price===0?<p className={style.free}>Free</p>:<p className={style.Price}>{game.price}</p>}
                          
                           <div className={style.infoIcon}>
                            <Link to="/">
                                <img src={info} alt="" className={style.info}/>
                            </Link>
                           </div>
                        </div>
                    </div>
                </div>
                </Link>
            )
        })}
    </div>
        }
        {}
        
    </div>
  )
}

export default Games