import {
    FETCH_COIN_DATA_SUCCESS,
    FETCH_COIN_DATA_ERROR,
    UPDATE_WATCH_LIST_SUCCESS,
    UPDATE_WATCH_LIST_ERROR,
    SELECTED_WATCH_LIST_COIN_SUCCESS,
    SELECTED_WATCH_LIST_COIN_ERROR,
    DISPLAY_WATCH_LIST_SUCCESS,
    DISPLAY_WATCH_LIST_ERROR,
    UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
    UPDATE_SEARCH_SUGGESTIONS_ERROR
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import axios from 'axios';
  import {store} from '../../index';
  
  // Fetch Coin Data for watch list
  export const fetchCoinData = (coinList) => async dispatch => {
    try {
        dispatch(beginApiCall());
        console.log("COINLIST SUBMITTED FOR LOOKUP: ", coinList);
        const coinDataPromises = coinList.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin.newID));
        const coinDataResponses = await Promise.all(coinDataPromises);
        const coinData = coinDataResponses.map(function(response) {
          const data = response.data;
          return {
            key: data.id,
            id: data.id,
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            image: data.image.large,
            price: data.market_data.current_price.usd.toFixed(2),
            website: data.links.homepage[0],
            description: data.description.en,
            marketCap: data.market_data.market_cap.usd,
            dayVolume: data.market_data.total_volume.usd,
            rank: data.market_cap_rank,
            ATH: data.market_data.ath.usd,
            ATHDate: data.market_data.ath_date.usd.slice(0,10),
            ATL: data.market_data.atl.usd,
            ATLDate: data.market_data.atl_date.usd.slice(0,10),
            dayPercentChange: data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)
          }
        })
        console.log('COIN DATA: ',coinData)

        dispatch({
          type: FETCH_COIN_DATA_SUCCESS,
          payload: "Fetch Coin Data from 'Coin Gecko API' Success!"
        })
        
        return(coinData)
       
    } catch (err) {
      dispatch(apiCallError());
      dispatch({
        type: FETCH_COIN_DATA_ERROR,
        payload:
          "Something went wrong using the 'Coin Gecko API'"
      });
    }
  };

  export const updateWatchList = () => async dispatch => {
    try {
      const state = store.getState();
      const watchList = state.watchListReducer.watchList;
      //const selectedCoin = state.watchListReducer.selectCoin;
      const coinData = await dispatch(fetchCoinData(watchList))
      console.log("ABOUT TO DISPATCH COIN DATA: ", coinData)
      dispatch({
          type: UPDATE_WATCH_LIST_SUCCESS,
          payload: coinData
      });

      //if (selectedCoin === []) {
      //dispatch(selectCoin(coinData[0].id));
      //}
      //console.log("SELECTED COIN: ", selectedCoin)
      dispatch(refreshDisplayList())
      
    } catch {
      dispatch({
        type: UPDATE_WATCH_LIST_ERROR,
        payload: "Update Watch List error"
      })
    }
  }

  export const refreshDisplayList = () => async dispatch => {
    try {
      const state = store.getState();
      const watchList = state.watchListReducer.watchList;
      const selectedCoin = state.watchListReducer.selectedCoin;
      console.log('SELECTED COIN: ', selectedCoin[0].id)
      const watchList_Display = watchList.filter(coin => coin.id !== selectedCoin[0].id);
      console.log('ABOUT TO DISPATCH NEW DISPLAY LIST: ', watchList_Display)

      dispatch({
        type: DISPLAY_WATCH_LIST_SUCCESS,
        payload: watchList_Display
      })
    } catch {
      dispatch({
        type: DISPLAY_WATCH_LIST_ERROR,
        payload: "Something went wrong displaying the rest of the coins in watch list."
      })
    }
  }

  export const selectCoin = (coinID) => async dispatch => {
    try {
      console.log('COIN SELECTED: ', coinID);
      const state = store.getState();
      
      const suggestedCoins = state.watchListReducer.suggestions;
      //console.log("WATCHLIST: ",watchList )
      console.log("SUGGESTIONS: ",suggestedCoins)
      let selectedCoin = [];
      //let foundCoinWatchList = watchList.find((coin) => coin.id === coinID)
      //let foundCoinsuggestion = suggestedCoins.find((coin) => coin.id === coinID)

      const coinData = await dispatch(fetchCoinData([{newID: coinID}]));
      //console.log("COIN FOUND WATCHLIST: ", foundCoinWatchList);
      //console.log("COIN FOUND SUGGESTIONS: ", foundCoinsuggestion);
      //if (foundCoinWatchList === undefined) {
        //if (foundCoinsuggestion === undefined) {
          //dispatch({
            //type: SELECTED_WATCH_LIST_COIN_ERROR,
           // payload: "Something went wrong selecting a coin. Selection is not in suggestions or watchlist"
         // })
       // } else { 
          //selectedCoin.push(foundCoinsuggestion)
       // }
      //} else { 
       // selectedCoin.push(foundCoinWatchList)
      //}

      selectedCoin.push(coinData);

      dispatch(refreshDisplayList());

      console.log("ABOUT TO DISPATCH SELECTED COIN: ", coinData);

      dispatch({
        type: SELECTED_WATCH_LIST_COIN_SUCCESS,
        payload: coinData
      })

      

    } catch {
      dispatch({
        type: SELECTED_WATCH_LIST_COIN_ERROR,
        payload: "Something went wrong selecting a coin."
      })
    }
  };

  export const handleInputChange = (inputValue) => async dispatch => {
    console.log('SEARCH INPUT VALUE: ', inputValue)
    try {
      if (inputValue !== "") {
        // Retreive stored coinGecko API database keys
        const state = store.getState();
        const coinKeys = state.onSigninReducer.coinKeys
        
        // how to use interceptor in axios to get HTTP outgoing request

        //const suggestedCoins = axios.create({baseURL:`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`})
        /*suggestedCoins.interceptors.request.use(req => {
          console.log("Request: ", req);
          return req
        })*/

        // Get search suggestions from coin paprikia API
        const suggestedCoinsResponse = await axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`)
        let suggestedCoins_CoinKeys = suggestedCoinsResponse.data.currencies.map(function(response) { 
          console.log("SUGGESTED COINS RESPONSE: ", response);
      
          // Various searching methods to find coins in coinGecko API Database from search suggestions
          let geckoData = coinKeys.data.find((element) => (element.name === response.name));
          if (geckoData === undefined) {
            //console.log('Begging search for symbol instead')
            geckoData = coinKeys.data.find((element) => (element.symbol === response.symbol.toLowerCase()));
          }
          if (geckoData === undefined) {
            //console.log('Begging search for included name instead')
            geckoData = coinKeys.data.find((element) => (element.name.includes(response.name)));
          }
          
          if (geckoData === undefined) {
            //console.log('Resorting to skipping coin :(')
            return {
              newID: "",
            }
          }
        
          response.newID = geckoData.id
          return {
            newID: response.newID,
          }});
  
        // filter out any coins that don't exist in coinGecko API database (returned empty)
        suggestedCoins_CoinKeys = suggestedCoins_CoinKeys.filter((coin) => (coin.newID !== ""));

        if (suggestedCoins_CoinKeys.length < 5) {
          //console.log('LAST ditch effort to find the element using what info was passed to search bar to find directly in coingecko database keys')
          const coinKey = coinKeys.data.filter((element) => (element.name.toLowerCase().includes(inputValue.toLowerCase()))).slice(0, (5 - suggestedCoins_CoinKeys.length));
          coinKey.map(coin => suggestedCoins_CoinKeys.push({ newID: coin.id}))}

        console.log("SUGGESTED COINS KEYS: ", suggestedCoins_CoinKeys)

        let suggestedCoins = await dispatch(fetchCoinData(suggestedCoins_CoinKeys))
        console.log("SUGGESTED COINS AFTER DISPATCH: ", suggestedCoins);
        
        // filter out any duplicate results (can happen during forks of various coins)
        suggestedCoins = suggestedCoins.filter((coin, index, self) => 
           index === self.findIndex((t) => (
             t.place === coin.place && t.name === coin.name
           ))
        )

        console.log('SUGGESTED COINS: ', suggestedCoins);
          
        dispatch({
          type: UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
          payload: suggestedCoins
        })
      } else {
        console.log('else activated')
        dispatch({
          type: UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
          payload: []
        })
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SEARCH_SUGGESTIONS_ERROR,
        payload:
          "Something went wrong searching for coins."
      });
    }
  };
  
  