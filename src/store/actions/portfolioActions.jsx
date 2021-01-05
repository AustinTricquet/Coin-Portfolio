import {
    CHANGE_PORTFOLIO_VIEW,
    UPDATE_ERC20_BALANCES,
    GET_ERC20_TXS,
    ADD_ETH_WALLET,
    TOGGLE_COIN_WALLET_VIEW,
    TOGGLE_ADD_WALLET_VIEW
  } from "./actionTypes";
import {store} from '../../index';
  
  // Signing up with Firebase
    export const portfolioToggle = (view) => async dispatch => {
        console.log("View please: ", view)
        if (view === 'coinToggle' || view === 'walletToggle') {
            let payload;
            if (view === 'coinToggle') {
                payload = true;
            } else {
                payload = false;
            }
            dispatch({
                type: TOGGLE_COIN_WALLET_VIEW,
                payload: payload
            })
        }
        if (view === 'addWalletToggle') {
            dispatch({
                type: TOGGLE_ADD_WALLET_VIEW,
                payload: true
            })
        }
        if (view === "cancelAddWallet") {
            dispatch({
                type: TOGGLE_ADD_WALLET_VIEW,
                payload: false
            })
        }
    };


    export const Add_ETH_Wallet = (walletAddress, walletName) => async dispatch => {
        const state = store.getState();
        let portfolio = state.portfolioReducer.portfolio;
        let data = { walletAddress: walletAddress, walletName: walletName }
    
        portfolio.push( data )

        console.log("state: ", state)

        dispatch({
            type: ADD_ETH_WALLET,
            payload: portfolio
        });
    }

    export const Remove_ETH_Wallet = (walletAddress) => async dispatch => {

    

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
          //type: UPDATE_PORTFOLIO,
          payload: ""
      })
  }
  