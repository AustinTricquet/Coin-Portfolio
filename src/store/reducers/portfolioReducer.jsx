import {
    CHANGE_PORTFOLIO_VIEW,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    authMsg: "",
    viewPortfolio: true
  };
  
  export default function authReducer(state = INITIAL_STATE, action) {
    if (
      action.type === CHANGE_PORTFOLIO_VIEW
    ) {
      return { ...state, viewPortfolio: action.payload };
    } else {
      return state;
    }
  }