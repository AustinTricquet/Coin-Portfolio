import axios from "axios";
import {
    UPDATE_COIN_GECKO_KEYS_SUCCESS,
    UPDATE_COIN_GECKO_KEYS_ERROR
  } from "./actionTypes";
  
  // Signing up with Firebase
  export const getCoinGeckoKeys = () => async dispatch => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list')
      dispatch({
        type: UPDATE_COIN_GECKO_KEYS_SUCCESS,
        payload: response
      })
      return(response)
      } catch (err) {
      dispatch({
        type: UPDATE_COIN_GECKO_KEYS_ERROR,
        payload:
          "Something went wrong getting keys from CoinGecko API"
      });
    }
  };
  