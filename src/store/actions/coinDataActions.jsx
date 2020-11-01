import {
    SIGNUP_ERROR,
    FETCH_COIN_DATA_SUCCESS,
    SELECTED_WATCH_LIST_COIN_SUCCESS,
    DISPLAY_COIN_DATA_SUCCESS
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import firebase from "../../services/firebase";
  import axios from 'axios';
  import {store} from '../../index';
  
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
            image: data.image.large,
            price: data.market_data.current_price.usd.toFixed(2),
            website: data.links.homepage[0],
            description: data.description.en,
            marketCap: data.market_data.market_cap.usd,
            dayVolume: data.market_data.total_volume.usd,
            rank: data.market_cap_rank,
            ATH: data.market_data.ath.usd,
            ATHDate: data.market_data.ath_date.usd.slice(0,10),
            ATL: data.market_data.atl.usd,
            ATLDate: data.market_data.atl_date.usd.slice(0,10),
            dayPercentChange: data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)
          }
        })
        console.log('This is the coinData= ',coinPriceData)
        dispatch({
            type: FETCH_COIN_DATA_SUCCESS,
            payload: coinPriceData
        })
        //dispatch({
         // type: SELECTED_WATCH_LIST_COIN_SUCCESS,
         // payload: coinPriceData[0]
        //})
        console.log('about to selectCoin')
        dispatch(selectCoin("bitcoin"))
        console.log('select coin triggered')
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

  export const selectCoin = (coinID) => async dispatch => {
    console.log('Coin Selected: ', coinID);

    const state = store.getState();
    const masterList = state.coinDataReducer.masterList;

    const coin = masterList.find((coin) => coin.id === coinID)
    console.log('coin: ', coin)

    const newWatchList = masterList.filter(coin => coin.id !== coinID);
    
    dispatch({
      type: SELECTED_WATCH_LIST_COIN_SUCCESS,
      payload: coin
    })
    dispatch({
      type: DISPLAY_COIN_DATA_SUCCESS,
      payload: newWatchList
    })
  };
  