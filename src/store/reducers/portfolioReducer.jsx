import {
    CHANGE_PORTFOLIO_VIEW,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    authMsg: "",
    viewPortfolio: true,
    wallets: [{
      name: "coinbase",
      address: "asfe8302029e3ur0w82ede0",
      blockchain: "Ethereum",
      totalValue: "103.45",
      dayPercentChange: "7"
    },
    {
      address: "2384h23ofn2938fh230",
      blockchain: "Bitcoin"
    }],
    wallets_Display: [{
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      name: "Coinbase",
      address: "asfe8302029e3ur0w82ede0",
      blockchain: "Ethereum",
      totalValue: "103.45",
      dayPercentChange: "7"
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