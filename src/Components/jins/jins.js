import React, { useEffect, useState } from 'react'
import style from './jins.module.css'
const Jins = () => {
    const[state,setState] = useState("Select a State")
    const[allState,setAllState] = useState([])
    const baseUrl = "https://uat.wincha-online.com"
    const fetchLocation = async()=>{
        fetch(`${baseUrl}/configurations/state/collections`,{ 
            method: 'get',
            headers: {'Content-Type': "application/json"
            }}).then(res=>res.json()).then((data)=>{
                setAllState(data.data)
            }).catch((err)=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        fetchLocation()
    })
  return (
    <div>
    <div className={style.StateSelect}>
        <input type="text" readOnly value={state.state} className={style.input}/>
        <div className={style.AllState}>
            {allState.map((stateItem)=>{
                return(
                    <input type="text" name="state" id="state" className={style.input} readOnly value={stateItem.state} onClick={(e)=>{
                        setState(stateItem)
                    }}/>
                )
            })}
        </div>
    </div>
    </div>
  )
}

export default Jins;