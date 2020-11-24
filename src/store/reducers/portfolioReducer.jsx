import {
    CHANGE_PORTFOLIO_VIEW,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    authMsg: "",
    viewPortfolio: true,
    wallets: [{
      address: "woeifjoewifj2oei",
      blockchain: "Ethereum"
    },
    {
      address: "2384h23ofn2938fh230",
      blockchain: "Bitcoin"
    }],
    wallets_Display: [{
      address: "2384h23ofn2938fh230",
      blockchain: "Bitcoin"
    }],
    selectedWallet: [{address: null}],
    portfolioCoins: [{}],
    selectedWalletCoin: [{symbol: null}],
    portfolio_Display: [],
    historyLength: [],
    watchListMsg: null,
    error: null

  };
  
  export default function authReducer(state = INITIAL_STATE, action) {
    if (
      action.type === CHANGE_PORTFOLIO_VIEW
    ) {
      return { ...state, viewPortfolio: action.payload };
    } else {
      return state;
    }
  }