
// ******IT is the main root reducer where all the slices will be imported **

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
const rootReducer = combineReducers({

    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,

});

export default rootReducer;