import React, { useEffect, useState } from 'react'
import style from './Games.module.css'
import Ticket from '../../assests/golden-ticket.png'
import info from '../../assests/info.png'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCollection } from '../../actions/product'
import Loader from '../Loader/Loader'

const Games = () => {
    const[category,setCategory] = useState("novelty")
    const dispatch = useDispatch()
    const response = {
        "category_id":category,
        "country_code":"UK",
         "user_id":""
    }
    useEffect(()=>{
        dispatch(getProductByCollection(response))
    },[dispatch,category])
    const {products,loading} = useSelector((state)=>state.collectionProducts)

    const categories = [
        {
            title:"novelty",
            NoOfGames:0,
            id:0,
        },
        {
            title:"collectable",
            NoOfGames:0,
            id:1,
        },
        {
            title:"e-gifting",
            NoOfGames:0,
            id:2,
        },
        {
            title:"new",
            NoOfGames:0,
            id:3,
        },
        {
            title:"popular",
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
                    <button key={index} value={categoryItem.title} className={style.category} id={categoryItem.id} onClick={(e)=>{
                        setCategory(categoryItem.title)
                        // setAllCategory(categoryItem.title)
                    }}>{categoryItem.title}</button>
                )
            })}
             <Link className={style.category} onClick={(e)=>{
               
                setAllCategory("all")
            }}>All</Link>
        </div>
        {allCategory==="all"
        ?
       
        <div className={style.Games}>
        {products&&products.map((game,index)=>{
            
            return(
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
                            <Link to={`game/${game.id}`} state={{ game:game ,user:info}}
                           ><img src={info} alt="" className={style.info}/>
                            </Link>
                           </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
        :
        loading?<Loader/>:<div className={style.Games}>
        {products&&products.map((game,index)=>{
   
            return(
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
                            <Link to={`game/${game.id}`} state={{ game:game ,user:info}}
                           ><img src={info} alt="" className={style.info}/>
                            </Link>
                           </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
        }
        {}
        
    </div>
  )
}

export default Games