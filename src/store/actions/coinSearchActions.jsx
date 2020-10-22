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
        axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`)
        .then(({ data }) => {
          console.log('Data Receieved!: ', data.currencies)
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
  