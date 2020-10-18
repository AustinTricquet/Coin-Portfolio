import {
    SIGNUP_ERROR,
    FETCH_COIN_DATA_SUCCESS
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import firebase from "../../services/firebase";
  import axios from 'axios';
  
  // Signing up with Firebase
  export const fetchCoinData = () => async dispatch => {
    try {
        console.log('BEGIN FETCH')
        dispatch(beginApiCall());
        const COIN_COUNT = 10;
        const formatPrice = price => parseFloat(Number(price).toFixed(2));
        const response = await axios.get('https://api.coinpaprika.com/v1/coins')
        const coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);
        const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
        const promises = coinIds.map(id => axios.get(tickerUrl + id));
        const coinData = await Promise.all(promises);
        const coinPriceData = coinData.map(function(response) {
          const coin = response.data;
          return {
            key: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            balance: 0,
            price: formatPrice(coin.quotes.USD.price),
          }
        })
        dispatch({
            type: FETCH_COIN_DATA_SUCCESS,
            payload: coinPriceData
        })
        return(coinPriceData)
       
    } catch (err) {
      dispatch(apiCallError());
      dispatch({
        type: SIGNUP_ERROR,
        payload:
          "Something went wrong using the API coin paprika"
      });
    }
  };
  