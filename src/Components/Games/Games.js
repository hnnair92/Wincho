import React, { useEffect, useState } from 'react'
import style from './Games.module.css'
import Ticket from '../../assests/golden-ticket.png'
import info from '../../assests/info.png'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCollection } from '../../actions/product'
import Loader from '../Loader/Loader'

const Games = () => {
    const {id} = useParams()
    const {products,loading} = useSelector((state)=>state.collectionProducts)
    const{user}=useSelector((state)=>state.userData)
    // const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    // const {data,status} = useSelector((state)=>state.userData)
    const[category,setCategory] = useState("novelty")
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const response = {
            category_id:category,
            country_code:"UK",
             user_id:user.user_id
        }
        dispatch(getProductByCollection(response))
        if(user===null){
            navigate("/login")
        }
    },[dispatch,category,id,navigate])


    const categories = [
        {
            title:"novelty",
            value:"novelty",
            NoOfGames:0,
            id:0,
        },
        {
            title:"collectable",
            value:"collectable",
            NoOfGames:0,
            id:1,
        },
        {
            title:"E-Gifting",
            value:"e-gifting",
            NoOfGames:0,
            id:2,
        },
        {
            title:"new",
            value:"new",
            NoOfGames:0,
            id:3,
        },
        {
            title:"popular",
            value:"popular",
            NoOfGames:0,
            id:4,
        },
    ]
    // const[active,setActive]= useState(false)
    const[allCategory,setAllCategory] = useState("")
    // const[getAllCategory,setGetAllCategory] = useState("")
  return (
    <div className={style.Container}>
        <div className={style.Categories}>
            {categories.map((categoryItem,index)=>{
                return(
                    <button key={index} value={categoryItem.value} className={category===categoryItem.value?style.active:style.category} onClick={(e)=>{
                        setCategory(categoryItem.value)
                        setAllCategory("")

                        // setAllCategory(categoryItem.title)
                    }}>{categoryItem.title}</button>
                )
            })}
             <button className={allCategory==="all"?style.active:style.category} onClick={(e)=>{
                setAllCategory("all")
                setCategory("")
            }}>All</button>
        </div>
        {allCategory==="all"
        ?
       
        <div className={style.Games}>
        {products&&products.map((game,index)=>{
            
            return(
                <Link to={`game/${game.id}`} state={{ game:game ,user:info}}>
                <div className={style.Game} key={index}>
                    {game.new_item===true?<div className={style.Label}>
                        <p>New</p>
                    </div>:""}
                    {game.price==="0"?<div className={style.LabelFree}>
                        <p>Free</p>
                    </div>:""}
                    
                    <div className={style.Image}>
                        <img src={game.featured_image.large} alt="" />
                        
                    </div>
                    <div className={style.Details}>
                        <div className={style.DetailTitle}>
                            <p className={style.Name}>{game.title}</p>
                        </div>
                        <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                                <img src={Ticket} alt="" className={style.icon}/>
                            </div>
                                {game.price===0?<p className={style.free}>Free</p>:<p className={style.Price}>{game.price}</p>}
                        
                           <div className={style.infoIcon}>
                            <Link to="">
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
        :
        loading?<Loader/>:<div className={style.Games}>
        {products&&products.map((game,index)=>{
   
            return(
                <Link to={`game/${game.id}`} state={{ game:game ,user:info}}>
                <div className={style.Game} key={index}>
                    {game.new_item===true?<div className={style.Label}>
                        <p>New</p>
                    </div>:""}
                    {game.price==="0"?<div className={style.LabelFree}>
                        <p>Free</p>
                    </div>:""}
                    
                    <div className={style.Image}>
                        <img src={game.featured_image.large} alt="" />
                       
                    </div>
                    <div className={style.Details}>
                        <p className={style.Name}>{game.title}</p>
                        <div className={style.PriceDiv}>
                            <div className={style.ticketIcon}>
                                <img src={Ticket} alt="" className={style.icon}/>
                            </div>
                                {game.price===0?<p className={style.free}>Free</p>:<p className={style.Price}>{game.price}</p>}
                          
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