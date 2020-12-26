import {
    CHANGE_PORTFOLIO_VIEW,
    UPDATE_ERC20_BALANCES,
    UPDATE_PORTFOLIO,
    GET_ERC20_TXS,
    ADD_ETH_WALLET,
    REMOVE_ETH_WALLET
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    viewPortfolio: true,
    wallets_Display: [{
      image: "",
      name: "Coinbase",
      address: "address123123123",
      blockchain: "Ethereum",
      totalValue: "103.45",
      dayPercentChange: "7"
    }],
    selectedWallet: [
      {
        image: "",
        name: "Coinbase",
        address: "address123123123",
        blockchain: "Ethereum",
        totalValue: "103.45",
        dayPercentChange: "7"
      }
    ],
    selectedWalletCoin: [{symbol: null}],
    portfolio_Display: [{
      name: "USD Coin",
      symbol: "USDC",
      amount: "500.00",
      value: "500.00",
      image: ""
    }],
    historyLength: [],
    watchListMsg: null,
    error: null,
    portfolio: [
      {
        walletName: "nickname",
        walletAddress: "0x0123456",
        image: "",
        walletPL: 34.7,
        walletValue_USD: 548.43,
        walletTokens: [
          {
            tokenName: "ChainLink",
            tokenAddress: "chainlink_address",
            tokenBalance: 5.4,
            tokensValue_USD: 140.37,
            TXs_Block_last_updated: 120312314,
            tokenTXs: [
              {
                TX_hash: "TX_hash",
                blockNumber: 12312412,
                timestamp: 1234456,
                TX_action: "Received or Sent",
                TX_to: "to_address",
                TX_from: "from_address",
                TX_amount: 4
              }
            ]
          }
        ]
      },
    ],

  };
  
  export default function authReducer(state = INITIAL_STATE, action) {
    if (
      action.type === CHANGE_PORTFOLIO_VIEW
    ) {
      return { ...state, viewPortfolio: action.payload };
    } else if (
      action.type === ADD_ETH_WALLET
    ) {
      return { ...state, portfolio: action.payload };
    } else {
      return state;
    }
  }