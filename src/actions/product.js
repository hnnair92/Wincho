import { GET_ALL_PRODUCT_BY_COLLECTION_FAILED, GET_ALL_PRODUCT_BY_COLLECTION_REQUEST,GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS } from "../constants/product"
const baseUrl = "https://uat.wincha-online.com"
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