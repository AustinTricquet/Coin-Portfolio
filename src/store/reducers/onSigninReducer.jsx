import {
    UPDATE_COIN_GECKO_KEYS_SUCCESS,
    UPDATE_COIN_GECKO_KEYS_ERROR
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    coinKeys: [],
    errorMsg: null
  };
  
  export default function onSigninReducer(state = INITIAL_STATE, action) {
    if (action.type === UPDATE_COIN_GECKO_KEYS_SUCCESS) {
      return { ...state, coinKeys: action.payload };
    } else if (
      action.type === UPDATE_COIN_GECKO_KEYS_ERROR
    ) {
      return { ...state, errorMsg: action.payload };
    } else {
      return state;
    }
  }