import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import apiStatusReducer from "./apiStatusReducer";

export default combineReducers({
  firebaseReducer,
  authReducer,
  apiStatusReducer
});