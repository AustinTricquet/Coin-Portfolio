import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import apiStatusReducer from "./apiStatusReducer";
import watchListReducer from "./watchListReducer";
import onSigninReducer from "./onSigninReducer";

export default combineReducers({
  firebaseReducer,
  authReducer,
  apiStatusReducer,
  watchListReducer,
  onSigninReducer,
});