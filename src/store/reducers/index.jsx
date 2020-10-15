import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import apiStatusReducer from "./apiStatusReducer";
import coinDataReducer from "./coinDataReducer";

export default combineReducers({
  firebaseReducer,
  authReducer,
  apiStatusReducer,
  coinDataReducer
});