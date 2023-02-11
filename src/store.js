import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/product'


const reducers = combineReducers({
    collectionProducts:productReducer
})
const middleware = [thunk]
const InitialState = {}
const store = createStore(reducers,InitialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;