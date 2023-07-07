import { CONFIGURATION_FAILED, CONFIGURATION_REQUEST, CONFIGURATION_SUCCESS, GAME_ENTRY_FAILED, GAME_ENTRY_REQUEST, GAME_ENTRY_SUCCESS, GET_ALL_GAMES_FAIL, GET_ALL_GAMES_REQUEST, GET_ALL_GAMES_SUCCESS, GET_ALL_PRODUCT_BY_COLLECTION_FAILED, GET_ALL_PRODUCT_BY_COLLECTION_REQUEST, GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS } from "../constants/product";

export const productReducer = (state={products:[]},action)=>{
    switch (action.type) {
        case GET_ALL_PRODUCT_BY_COLLECTION_REQUEST:
            case GET_ALL_GAMES_REQUEST:
                return{
                    ...state,
                    loading:true,
                }
        case GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS:
            case GET_ALL_GAMES_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    products:action.payload
            }
        case GET_ALL_PRODUCT_BY_COLLECTION_FAILED:
            case GET_ALL_GAMES_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload.message
                }
        default:
            return{
                ...state,
            }
    }
}
export const gameEntry = (state={game:{}},action)=>{
    switch (action.type) {
      
            case GAME_ENTRY_REQUEST:
                return{
                    ...state,
                    loading:true,
                }
      
            case GAME_ENTRY_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    game:action.payload
            }
       
            case GAME_ENTRY_FAILED:
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
export const configurationReducer = (state={configuration:{}},action)=>{
    switch (action.type) {
        case CONFIGURATION_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case CONFIGURATION_SUCCESS:
            return{
                ...state,
                loading:false,
                configuration:action.payload
            }
        case CONFIGURATION_FAILED:{
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        }
    
        default:
            return{
                ...state
            }
    }
}