import {
    SIGNUP_ERROR,
    FETCH_COIN_DATA_SUCCESS
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import firebase from "../../services/firebase";
  import axios from 'axios';
  
  // Signing up with Firebase
  export const fetchCoinData = (watchList) => async dispatch => {
    try {
        console.log('BEGIN FETCH')
        dispatch(beginApiCall());
        //const COIN_COUNT = 10;
        const formatPrice = price => parseFloat(Number(price).toFixed(2));
        // HOW TO CALL SEARCH VIA COINPAPRIKA
        //'https://api.coinpaprika.com/v1/search/?q=bit'
        //const response = await axios.get('https://api.coinpaprika.com/v1/coins')
        console.log('fetch has been called, about to map watchlist')
        //const coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);
        const promises = watchList.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin.newID));
        //const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
        //const promises = coinIds.map(id => axios.get(tickerUrl + id));
        const coinData = await Promise.all(promises);
        const coinPriceData = coinData.map(function(response) {
          const data = response.data;
          console.log('data: ---', data)
          return {
            id: data.id,
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            image: data.image.small,
            price: data.market_data.current_price.usd
          }
        })
        console.log('This is the coinData= ',coinPriceData)
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
  