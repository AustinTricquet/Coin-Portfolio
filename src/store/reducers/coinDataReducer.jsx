import {
    ADD_COIN_SUCCESS,
    ADD_COIN_ERROR,
    REMOVE_COIN_SUCCESS,
    REMOVE_COIN_ERROR,
    FETCH_COIN_DATA_SUCCESS,
    FETCH_COIN_DATA_ERROR,
    SELECTED_WATCH_LIST_COIN_SUCCESS,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    watchList: [
      {
        newID: "bitcoin"
      },
      {
        newID: "ethereum"
      },
      {
        newID: "polkadot"
      },
      {
        newID: "tron"
      },
      {
        newID: "uniswap"
      },
      {
        newID: "cardano"
      },
      {
        newID: "usd-coin"
      },
      {
        newID: "dai"
      },
    ],
    selectedCoin: [],
    error: null
    }
  
  export default function(state = INITIAL_STATE, action) {
    if (action.type === ADD_COIN_SUCCESS || action.type === REMOVE_COIN_SUCCESS) {
      return { ...state, authMsg: "" };
    } else if (
      action.type === FETCH_COIN_DATA_SUCCESS
    ) {
      return { ...state, watchList: action.payload };
    } else if (
      action.type === SELECTED_WATCH_LIST_COIN_SUCCESS
    ) {
      return { ...state, selectedCoin: action.payload };
    } else if (
      action.type === ADD_COIN_ERROR ||
      action.type === REMOVE_COIN_ERROR ||
      action.type === FETCH_COIN_DATA_ERROR
    ) {
      return { ...state, error: action.payload };
    } else {
      return state;
    }
  }