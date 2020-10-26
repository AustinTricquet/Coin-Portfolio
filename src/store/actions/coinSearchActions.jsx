import axios from "axios";
import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  import getState from "redux-thunk";
  import {store} from '../../index';
  
  // Signing up with Firebase
  export const handleInputChange = (inputValue) => async dispatch => {
    try {
      console.log('BEGIN INPUT CHANGE')
      if (inputValue !== "") {
        //const responseGecko = await axios.get('https://api.coingecko.com/api/v3/coins/list')
        console.log('about to set state')
        const state = store.getState();
        console.log('state: ',state);
        const responseGecko = state.onSigninReducer.coinKeys
        console.log("about to set promise")
        const promise1 = axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`)
        console.log("about to await promise")
        const coinPaprikaData = await promise1;
        console.log("about to map response, coinpaprikadata: ", coinPaprikaData)
        const coinDataNewID = coinPaprikaData.data.currencies.map(function(response) { 
          const geckoData = responseGecko.data.find((element) => {return element.name === response.name});
          response.newID = geckoData.id

          //const promise = axios.get('https://api.coingecko.com/api/v3/coins/' + response.newID)
          //const imageData = await promise;
          //response.image = imageData.image

          return {
            key: response.id,
            name: response.name,
            symbol: response.symbol,
            newID: response.newID,
            image: "",
          }});
        
        console.log('CoinDataNewID: ', coinDataNewID);
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
      } 
    } catch (err) {
      dispatch({
        type: UPDATE_SEARCH_ERROR,
        payload:
          "Something went wrong searching for coins."
      });
    }
  };
  