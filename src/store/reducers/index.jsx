import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import apiStatusReducer from "./apiStatusReducer";
import watchListReducer from "./watchListReducer";
import onSigninReducer from "./onSigninReducer";
import portfolioReducer from "./portfolioReducer";

export default combineReducers({
  firebaseReducer,
  authReducer,
  apiStatusReducer,
  watchListReducer,
  onSigninReducer,
  portfolioReducer
});