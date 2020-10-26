import {
    UPDATE_COIN_GECKO_KEYS_SUCCESS,
    UPDATE_COIN_GECKO_KEYS_ERROR
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    coinKeys: [],
    errorMsg: null
  };
  
  export default function(state = INITIAL_STATE, action) {
    if (action.type === UPDATE_COIN_GECKO_KEYS_SUCCESS) {
      console.log("update successful! Keys: ", action.payload);
      return { ...state, coinKeys: action.payload };
    } else if (
      action.type === UPDATE_COIN_GECKO_KEYS_ERROR
    ) {
      return { ...state, errorMsg: action.payload };
    } else {
      return state;
    }
  }