import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    queryValue: "",
    error: null
    }
  
  export default function(state = INITIAL_STATE, action) {
    if (
      action.type === UPDATE_SEARCH_SUCCESS
    ) {
      return { ...state, queryValue: action.payload };
    } else if (
      action.type === UPDATE_SEARCH_ERROR
    ) {
      return { ...state, error: action.payload };
    } else {
      return state;
    }
  }