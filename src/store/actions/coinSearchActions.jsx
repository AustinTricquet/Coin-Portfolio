import axios from "axios";
import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  
  // Signing up with Firebase
  export const handleInputChange = (inputValue) => async dispatch => {
    try {
      console.log('BEGIN INPUT CHANGE')
      if (inputValue !== "") {
        const responseGecko = await axios.get('https://api.coingecko.com/api/v3/coins/list')
        
        axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`)
        .then(({ data }) => {
          console.log('Data Receieved!: ', data.currencies)
          const coins = data.currencies
          coins.forEach(coin => {
            console.log("coin name is: ", coin.name)
            const geckoData = responseGecko.data.find((element) => { return element.id === coin.name})
            coin.newID = geckoData
            console.log('coin newID ', coin.newID)
          });
          
          dispatch({
            type: UPDATE_SEARCH_SUCCESS,
            payload: data.currencies
          })
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
  