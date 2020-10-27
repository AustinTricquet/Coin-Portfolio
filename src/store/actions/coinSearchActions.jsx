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
          coins.forEach(async coin => {
            console.log("coin name is: ", coin.name)
            const geckoData = responseGecko.data.find((element) => { return element.name === coin.name})
            console.log("geckoData ID: ",geckoData)
            axios.get(`https://api.coingecko.com/api/v3/coins/${geckoData.id}`)
            .then(({data}) => {
              coin.logo = data.image.thumb
            })
          }
          .then(() => {
            console.log('Final Data: ', coins)
            dispatch({
              type: UPDATE_SEARCH_SUCCESS,
              payload: coins
            })
          })


        }
      )
          
          
        
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
  