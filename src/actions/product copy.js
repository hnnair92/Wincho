import { GAME_ENTRY_FAILED, GAME_ENTRY_REQUEST, GAME_ENTRY_SUCCESS, GET_ALL_GAMES_FAIL, GET_ALL_GAMES_REQUEST, GET_ALL_GAMES_SUCCESS, GET_ALL_PRODUCT_BY_COLLECTION_FAILED, GET_ALL_PRODUCT_BY_COLLECTION_REQUEST,GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS } from "../constants/product"
//const baseUrl = "https://uat.wincha-online.com/"
const baseUrl = "https://uat.wincha-online.com"
// //const baseUrl = "https://uat.wincha-online.com/"
// const baseUrl = "https://uat.wincha-online.com"
// const baseUrl = "https://uat.wincha-online.com"
export const getProductByCollection=(request)=>async(dispatch)=>{
    console.log(request);
    try {
        dispatch({
            type:GET_ALL_PRODUCT_BY_COLLECTION_REQUEST
        })
            await fetch(`${baseUrl}/product/collections`,{
                method:"POST",
                body:JSON.stringify({
                    category_id:request.category_id,
                    country_code:request.country_code,
                    user_id:request.user_id
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json()).then((data)=>{
                dispatch({
                    type:GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS,
                    payload:data.data
                })
            })
    } catch (error) {
        dispatch({
            type:GET_ALL_PRODUCT_BY_COLLECTION_FAILED,
            payload:error
        })
        console.log(error);
    }
}
export const getAllGames=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:GET_ALL_GAMES_REQUEST
        })
        await fetch(`${baseUrl}/product/collections`,{
            method:"POST",
            body:JSON.stringify({
                category_id:"0",
                country_code:"UK",
                user_id:data.user_id,
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            dispatch({
                type:GET_ALL_GAMES_SUCCESS,
                payload:data.data,
            })
        })
        
        
    } catch (error) {
        dispatch({
            type:GET_ALL_GAMES_FAIL,
            payload:error
        })
    }
}
export const gameEntry=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:GAME_ENTRY_REQUEST
        })
        await fetch(`${baseUrl}/game/entry`,{
            method:'POST',
            body:JSON.stringify({
                catalog:data.catalog,
                playerID:data.user_id,
                machineCode:data.machineCode,
                source:data.source,
                replay:data.replay,
                freeplay:data.freeplay
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            dispatch({
                type:GAME_ENTRY_SUCCESS,
                payload:data.data[0]
            })
        })
        
    } catch (error) {
        dispatch({
            type:GAME_ENTRY_FAILED,
            payload:error
        })
    }
}