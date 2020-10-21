import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  
  // Signing up with Firebase
  export const handleInputChange = (inputValue) => async dispatch => {
    try {
        console.log('BEGIN INPUT CHANGE')
        dispatch({
            type: UPDATE_SEARCH_SUCCESS,
            payload: inputValue
        })
        console.log('value is: ', inputValue)
        return(inputValue)
       
    } catch (err) {
      dispatch({
        type: UPDATE_SEARCH_ERROR,
        payload:
          "Something went wrong updating the input."
      });
    }
  };
  