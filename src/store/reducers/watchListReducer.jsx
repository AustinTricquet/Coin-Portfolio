import {
  ADD_COIN_SUCCESS,
  ADD_COIN_ERROR,
  REMOVE_COIN_SUCCESS,
  REMOVE_COIN_ERROR,
  UPDATE_MARKET_DATA_SUCCESS,
  UPDATE_WATCH_LIST_ERROR,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_ERROR,
  SELECTED_WATCH_LIST_COIN_SUCCESS,
  SELECTED_WATCH_LIST_COIN_ERROR,
  UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
  UPDATE_SEARCH_SUGGESTIONS_ERROR,
  DISPLAY_WATCH_LIST_ERROR,
  UPDATE_HISTORY_LENGTH,
  UPDATE_SELECTED_COIN_SUCCESS,
  UPDATE_CHART_DATA
} from "../actions/actionTypes";
import update from 'immutability-helper';

const INITIAL_STATE = {
  watchList: [
    {
      id:"bitcoin",
      marketData: {}
    },
    {
      id:"ethereum",
      marketData: {}
    },
    {
      id:"polkadot",
      marketData: {}
    },
    {
      id:"tron",
      marketData: {}
    },
    {
      id:"uniswap",
      marketData: {}
    },
    {
      id:"cardano",
      marketData: {}
    },
    {
      id:"usd-coin",
      marketData: {}
    },
    {
      id:"dai",
      marketData: {}
    }
  ],
  selectedCoin: {
      id: "bitcoin",
      marketData: {},
      chartData: {}
    },
  
  suggestions: [],
  searchCoinData: {},
  historyLength: [],
  error: null
  }

export default function watchListReducer(state = INITIAL_STATE, action) {
  if ( 
    // used to display fetch sucess...?
    action.type === FETCH_COIN_DATA_SUCCESS
  ) {
    return { ...state, watchListMsg: "" };
  } else if (
    // used for adding coins to watchList
    action.type === ADD_COIN_SUCCESS
  ) {
    return update(state, {watchList: {$push: [action.payload]}})
  } else if (
    // used for removing coins from watchList
    action.type === REMOVE_COIN_SUCCESS
  ) {
    let index = state.watchList.map(coin => coin.id).indexOf(action.payload.id)
    return update(state, {watchList: {$splice: [[index, 1]]}})
  } else if (
    // used for selecting coin and showing coin details
    action.type === UPDATE_SELECTED_COIN_SUCCESS
  ) {
    return { ...state, selectedCoin: action.payload };
  } else if (
    // used for updating and adding market info to each coin
    action.type === UPDATE_MARKET_DATA_SUCCESS
  ) {    
    return update(state, {watchList: {[state.watchList.map(coin => coin.id).indexOf(action.payload.id)]: {marketData: {$set: action.payload}}}})
  } else if (
    // used for adding and updating chart info on selected coin
    action.type === UPDATE_CHART_DATA
  ) {
    return update(state, {selectedCoin: {[action.id]: {chartData: {$set: action.payload}}}})
  } else if (
    // used for adding or removing suggested coins
    action.type === UPDATE_SEARCH_SUGGESTIONS_SUCCESS
  ) {
    return update(state, {suggestions: {$set: action.payload}});
  } else if (
    // need to investigate use...
    action.type === UPDATE_HISTORY_LENGTH
  ) {
    return { ...state, historyLength: action.payload}
  } else if (
    // not sure if used...
    action.type === SELECTED_WATCH_LIST_COIN_SUCCESS
  ) {
    return { ...state, selectedCoin: action.payload };
  } else if (
    // display errors
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