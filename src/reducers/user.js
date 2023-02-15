import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/user";

export const userReducer=(state={user:[]},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
            return{
                loading:true,
                authenticated:false
            }
        case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
            return{
                loading:false,
                user:action.payload.data,
                status:action.payload.status,
                authenticated:true,
            }
        case LOGIN_FAIL:
            case REGISTER_FAIL:
            return{
                loading:false,
                authenticated:false,
                error:action.payload
            }
        default:
            return{
                ...state
            }
    }
}