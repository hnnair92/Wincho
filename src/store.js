import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { gameEntry, productReducer } from './reducers/product'
import { userReducer } from './reducers/user'


const reducers = combineReducers({
    collectionProducts:productReducer,
    userData:userReducer,
    gameEntry:gameEntry
})
const middleware = [thunk]
const InitialState = {
    userData:localStorage.getItem("user")?{
        loading:false,
        user:JSON.parse(localStorage.getItem("user")).data,
        authenticated:true
    }:[]
}
const store = createStore(reducers,InitialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;