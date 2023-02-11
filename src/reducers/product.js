import { GET_ALL_PRODUCT_BY_COLLECTION_FAILED, GET_ALL_PRODUCT_BY_COLLECTION_REQUEST, GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS } from "../constants/product";

export const productReducer = (state={products:[]},action)=>{
    switch (action.type) {
        case GET_ALL_PRODUCT_BY_COLLECTION_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS:
            return{
                ...state,
                loading:false,
                products:action.payload
        }
        case GET_ALL_PRODUCT_BY_COLLECTION_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return{
                ...state,
            }
    }
}