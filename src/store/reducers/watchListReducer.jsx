import {
    ADD_COIN_SUCCESS,
    ADD_COIN_ERROR,
    REMOVE_COIN_SUCCESS,
    REMOVE_COIN_ERROR,
    UPDATE_WATCH_LIST_SUCCESS,
    UPDATE_WATCH_LIST_ERROR,
    FETCH_COIN_DATA_SUCCESS,
    FETCH_COIN_DATA_ERROR,
    SELECTED_WATCH_LIST_COIN_SUCCESS,
    SELECTED_WATCH_LIST_COIN_ERROR,
    UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
    UPDATE_SEARCH_SUGGESTIONS_ERROR,
    DISPLAY_WATCH_LIST_SUCCESS,
    DISPLAY_WATCH_LIST_ERROR,

    UPDATE_HISTORY_LENGTH
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    watchList: [
      {
        id:"bitcoin",
        newID: "bitcoin"
      },
      {
        id:"ethereum",
        newID: "ethereum"
      },
      {
        id:"polkadot",
        newID: "polkadot"
      },
      {
        id:"tron",
        newID: "tron"
      },
      {
        id:"uniswap",
        newID: "uniswap"
      },
      {
        id:"cardano",
        newID: "cardano"
      },
      {
        id:"usd-coin",
        newID: "usd-coin"
      },
      {
        id:"dai",
        newID: "dai"
      },
    ],
    selectedCoin: [],
    suggestions: [],
    watchList_Display: [],
    historyLength: [],
    watchListMsg: null,
    error: null
    }
  
  export default function(state = INITIAL_STATE, action) {
    if (action.type === ADD_COIN_SUCCESS || 
        action.type === REMOVE_COIN_SUCCESS || 
        action.type === FETCH_COIN_DATA_SUCCESS
    ) {
      return { ...state, watchListMsg: "" };
    } else if (
      action.type === DISPLAY_WATCH_LIST_SUCCESS
    ) {
      return { ...state, watchList_Display: action.payload };
    } else if (
      action.type === UPDATE_WATCH_LIST_SUCCESS
    ) {
      return { ...state, watchList: action.payload };
    } else if (
      action.type === UPDATE_SEARCH_SUGGESTIONS_SUCCESS
    ) {
      return { ...state, suggestions: action.payload };
    } else if (
      action.type === UPDATE_HISTORY_LENGTH
    ) {
      return { ...state, historyLength: action.payload}
    } else if (
      action.type === SELECTED_WATCH_LIST_COIN_SUCCESS
    ) {
      return { ...state, selectedCoin: action.payload };
    } else if (
      action.type === ADD_COIN_ERROR ||
      action.type === REMOVE_COIN_ERROR ||
      action.type === FETCH_COIN_DATA_ERROR ||
      action.type === UPDATE_SEARCH_SUGGESTIONS_ERROR ||
      action.type === UPDATE_WATCH_LIST_ERROR ||
      action.type === SELECTED_WATCH_LIST_COIN_ERROR ||
      action.type === DISPLAY_WATCH_LIST_ERROR
    ) {
      return { ...state, error: action.payload };
    } else {
      return state;
    }
  }