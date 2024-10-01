
// ******IT is the main root reducer where all the slices will be imported **

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
const rootReducer = combineReducers({
  reducer:{
    auth:authReducer,
  }
});

export default rootReducer;