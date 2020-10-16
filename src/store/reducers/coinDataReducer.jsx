import {
    ADD_COIN_SUCCESS,
    ADD_COIN_ERROR,
    REMOVE_COIN_SUCCESS,
    REMOVE_COIN_ERROR,
    FETCH_COIN_DATA_SUCCESS,
    FETCH_COIN_DATA_ERROR,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    coinData: []
    }
  
  export default function(state = INITIAL_STATE, action) {
    if (action.type === ADD_COIN_SUCCESS || action.type === REMOVE_COIN_SUCCESS) {
      return { ...state, authMsg: "" };
    } else if (
      action.type === ADD_COIN_ERROR ||
      action.type === REMOVE_COIN_ERROR ||
      action.type === FETCH_COIN_DATA_SUCCESS ||
      action.type === FETCH_COIN_DATA_ERROR
    ) {
      return { ...state, coinData: action.payload };
    } else {
        return state;
    }
  }