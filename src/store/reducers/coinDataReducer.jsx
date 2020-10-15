import {
    ADD_COIN_SUCCESS,
    ADD_COIN_ERROR,
    REMOVE_COIN_SUCCESS,
    REMOVE_COIN_ERROR,
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 11000,
          valueUSD: 500,
          amount: 0.05
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 390,
          valueUSD: 500,
          amount: 1.5
        },
        {
          name: 'Polkadot',
          ticker: 'DOT',
          price: 5,
          valueUSD: 0,
          amount: 0
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          price: 225,
          valueUSD: 10,
          amount: 0.005
        },
        {
          name: 'Chainlink',
          ticker: 'LINK',
          price: 10,
          valueUSD: 100,
          amount: 10
        },
        {
          name: 'Cardano',
          ticker: 'ADA',
          price: 0.05,
          valueUSD: 50,
          amount: 200
        },
        {
          name: 'Cosmos',
          ticker: 'ATOM',
          price: 5,
          valueUSD: 200,
          amount: 50
        },
        {
          name: 'Polkastarter',
          ticker: 'POLS',
          price: 5,
          valueUSD: 200,
          amount: 50
        },
        {
          name: 'Uniswap',
          ticker: 'UNI',
          price: 5,
          valueUSD: 200,
          amount: 50
        },
        {
          name: 'TrustSwap',
          ticker: 'SWAP',
          price: 5,
          valueUSD: 200,
          amount: 50
        },
        {
          name: 'Utrust',
          ticker: 'UTK',
          price: 5,
          valueUSD: 200,
          amount: 50
        },
      ]
    }
  
  export default function(state = INITIAL_STATE, action) {
    if (action.type === ADD_COIN_SUCCESS || action.type === REMOVE_COIN_SUCCESS) {
      return { ...state, authMsg: "" };
    } else if (
      action.type === ADD_COIN_ERROR ||
      action.type === REMOVE_COIN_ERROR
    ) {
      return { ...state, authMsg: action.payload };
    } else {
        return state;
    }
  }