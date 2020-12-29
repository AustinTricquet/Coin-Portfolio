import {
    CHANGE_PORTFOLIO_VIEW,
    UPDATE_ERC20_BALANCES,
    UPDATE_PORTFOLIO,
    GET_ERC20_TXS,
    ADD_ETH_WALLET,
    REMOVE_ETH_WALLET
  } from "../actions/actionTypes";
  
  const INITIAL_STATE = {
    portfolio: [
      {
        walletName: "Coinbase",
        walletAddress: "0x0123456",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.dh8MiT39wCbH-moKzmMNJQHaHa%26pid%3DApi&f=1",
        walletPL: 34.7,
        walletValue_USD: 548.43,
        walletTokens: [
          {
            tokenName: "ChainLink",
            id: "chainlink",
            tokenAddress: "chainlink_address",
            tokenBalance: 5.4,
            tokensValue_USD: 140.37,
            TXs_Block_last_updated: 120312314,
            marketData: {
              ATH: 19.83,
              ATHDate: "2020-08-16",
              ATL: 0.148183,
              ATLDate: "2017-11-29",
              dayPercentChange: "1.35",
              dayVolume: 1274156450,
              description: "Chainlink is a decentralized oracle service, the first of its kind. When <a href='https://www.coingecko.com/en/coins/ethereum'>Ethereum</a> went live in 2015, it revolutionized what blockchain could bring to enterprise solution and traditional business. Blockchain was no longer just a medium for new age financial transaction, confined to <a href='https://www.coingecko.com/en/coins/bitcoin'>Bitcoin’s</a> potential to disrupt traditional currency exchange. With Ethereum powered smart contracts, Vitalik Buterin opened up a Pandora’s Box of use cases for blockchain technology. Problem is, per their design, smart contracts can only manage data on the blockchain. Their potential, the ability to provide tamperproof, decentralized applications for uses the world over, is still largely untapped, as many of the smart contract programs built on Ethereum lack a bridge to the real world industries they’re trying to improve. Chainlink’s first component consists of on-chain contracts deployed on Ethereum’s blockchain.  These oracle contracts process the data requests of users looking to take advantage of the network’s oracle services. If a user or entity wants access to off-chain data, they submit a user contract (or requesting contract) to Chainlink’s network, and the blockchain processes these requests into their own contracts. These contracts are responsible for matching the requesting contract up with the appropriate oracles. The contracts include a reputation contract, an order-matching contract, and an aggregating contract. The first of these, the reputation contract, is exactly as it sounds: it checks an oracle provider’s track record to verify its integrity. In turn, the order-matching contract logs the user contract’s service level agreement on the network and collects bids from responsible oracle providers. Finally, the aggregating contract accumulates the collective data of the chosen oracles and balances them to find the most accurate result. Unfortunately, the Chainlink team does not offer a roadmap, but a testnet of Chainlink’s services should come sometime within Q1 of 2018. Generally, the project’s general lack of marketing and concrete updates have frustrated community members in the past. Sergey Nazarov, the project’s CEO, is known for a quiet community presence that favors of behind-the-scenes work on Chainlink. The team may not hype their project much, but for what it’s worth, they sacrifice brand marketing in favor of product development–and some community members find this focus to be refreshing. For instance, they’ve established an oracle with Swift Bank, and have a few quiet partnerships with zepplin_os and Request Network. Chainlink has the potential to connect smart contracts with the outside world. It may allow parties to smart contracts to be able to receive external inputs that prove performance and create payment outputs that end users want to receive, such as bank payments. This has the potential to allow smart contract to mimic the vast majority of financial agreements currently available in the market. With the Chainlink Network, anyone can securely provide smart contracts with access to key external data and any other API capabilities, in exchange for financial reward. Although it remains to be seen how the incentive system will operate, there is potential for rewards similar to those available for crypto miners to be available to Node Operators that provide useful data to the Chainlink network. Check out <a href='https://www.coinbureau.com/review/chainlink-link/'>CoinBureau</a> for the complete review on Chainlink.",
              id: "chainlink",
              image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
              key: "chainlink",
              marketCap: 4989797755,
              name: "Chainlink",
              onWatchList: true,
              price: "12.50",
              rank: 10,
              symbol: "LINK",
              website: "https://chain.link/"
            },
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
    
    selectedPortfolioWallet:  {
      walletName: "Coinbase",
      walletAddress: "0x0123456",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.dh8MiT39wCbH-moKzmMNJQHaHa%26pid%3DApi&f=1",
      walletPL: 34.7,
      walletValue_USD: 548.43,
      walletTokens: [
        {
          tokenName: "ChainLink",
          id: "chainlink",
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
    selectedPortfolioCoin: {},
    selectedWalletCoin: {},
    viewPortfolio: true,
    historyLength: [],
    error: null,
    

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