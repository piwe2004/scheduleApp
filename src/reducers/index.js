import { combineReducers } from 'redux'
import schedule from './schedule';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"SCHEDULE",
    storage,
    whiteList:["schedule"]
}

const rootReducer = combineReducers( {
    schedule
})



export default persistReducer(persistConfig, rootReducer);
