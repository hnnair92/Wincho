import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { configurationReducer, gameEntry, productReducer } from './reducers/product'
import { profileReducer, userReducer } from './reducers/user'


const reducers = combineReducers({
    collectionProducts:productReducer,
    userData:userReducer,
    gameEntry:gameEntry,
    configuration:configurationReducer,
    profile:profileReducer
})
const middleware = [thunk]
const InitialState = {
    // profile:localStorage.getItem("user")?{
    //     loading:false,
    //     user:JSON.parse(localStorage.getItem("user")),
    //     authenticated:true
    // }:[],
    userData:localStorage.getItem("user")?{
        loading:false,
        user:JSON.parse(localStorage.getItem("user")),
        authenticated:true
    }:[]
}
const store = createStore(reducers,InitialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;