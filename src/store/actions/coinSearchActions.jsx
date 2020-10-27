import axios from "axios";
import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  import {store} from '../../index';
  
  // Signing up with Firebase
  export const handleInputChange = (inputValue) => async dispatch => {
    try {
      if (inputValue !== "") {
        const state = store.getState();
        const responseGecko = state.onSigninReducer.coinKeys
        const promise1 = axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`)
        const coinPaprikaData = await promise1;
        const coinDataNewID = coinPaprikaData.data.currencies.map(function(response) { 
          const geckoData = responseGecko.data.find((element) => {return element.name === response.name});
          response.newID = geckoData.id
          return {
            key: response.id,
            name: response.name,
            symbol: response.symbol,
            newID: response.newID,
            image: "",
          }});

        const promises = coinDataNewID.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin.newID));
        const coinDataImages = await Promise.all(promises);
        const coinData = coinDataImages.map(function(response) {
          const data = response.data
          return {
            id: data.id,
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            image: data.image.small,
            price: data.market_data.current_price.usd
           }});
        console.log('coinDataImages: ', coinData);
  
        //const promises = coins.map(newID => axios.get('https://api.coingecko.com/api/v3/coins/' + newID));
        //const coinData = await Promise.all(promises)
          
        dispatch({
          type: UPDATE_SEARCH_SUCCESS,
          payload: coinData
        })
      } else {
        dispatch({
          type: UPDATE_SEARCH_SUCCESS,
          payload: []
        })
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SEARCH_ERROR,
        payload:
          "Something went wrong searching for coins."
      });
    }
  };
  