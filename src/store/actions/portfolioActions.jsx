import {
    CHANGE_PORTFOLIO_VIEW,
    UPDATE_PORTFOLIO
  } from "./actionTypes";
import {store} from '../../index';
  
  // Signing up with Firebase
  export const changePortfolioView = () => async dispatch => {

    const state = store.getState();
    let viewPortfolio = state.portfolioReducer.viewPortfolio;
    console.log('viewPortfolio: ', viewPortfolio);

    if (viewPortfolio === true) {
        viewPortfolio = false
    } else {
        viewPortfolio = true
    }

    dispatch({
        type: CHANGE_PORTFOLIO_VIEW,
        payload: viewPortfolio
      });
  };

  export const fetchWalletData = () => async dispatch => {
      dispatch({
          type: UPDATE_PORTFOLIO,
          payload: ""
      })
  }
  