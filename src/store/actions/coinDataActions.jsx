import {
    SIGNUP_ERROR,
    FETCH_COIN_DATA_SUCCESS,
    SELECTED_WATCH_LIST_COIN_SUCCESS,
    DISPLAY_COIN_DATA_SUCCESS,
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import axios from 'axios';
  import {store} from '../../index';
  
  // Signing up with Firebase
  export const fetchCoinData = (watchList) => async dispatch => {
    try {
        console.log('BEGIN FETCH')
        dispatch(beginApiCall());
        //const COIN_COUNT = 10;
        const formatPrice = price => parseFloat(Number(price).toFixed(2));
        // HOW TO CALL SEARCH VIA COINPAPRIKA
        //'https://api.coinpaprika.com/v1/search/?q=bit'
        //const response = await axios.get('https://api.coinpaprika.com/v1/coins')
        console.log('fetch has been called, about to map watchlist')
        //const coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);
        const promises = watchList.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin.newID));
        //const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
        //const promises = coinIds.map(id => axios.get(tickerUrl + id));
        const coinData = await Promise.all(promises);
        const coinPriceData = coinData.map(function(response) {
          const data = response.data;
          console.log('data: ---', data)
          return {
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
        console.log('This is the coinData= ',coinPriceData)
        dispatch({
            type: FETCH_COIN_DATA_SUCCESS,
            payload: coinPriceData
        })
        console.log('about to selectCoin')
        dispatch(selectCoin(coinPriceData[0].id))
        console.log('select coin triggered')
        return(coinPriceData)
       
    } catch (err) {
      dispatch(apiCallError());
      dispatch({
        type: SIGNUP_ERROR,
        payload:
          "Something went wrong using the API coin paprika"
      });
    }
  };


  export const selectCoin = (coinID) => async dispatch => {
    console.log('Coin Selected: ', coinID);

    const state = store.getState();
    const masterList = state.coinDataReducer.masterList;

    const coin = masterList.find((coin) => coin.id === coinID)
    console.log('coin: ', coin)

    const newWatchList = masterList.filter(coin => coin.id !== coinID);
    
    dispatch({
      type: SELECTED_WATCH_LIST_COIN_SUCCESS,
      payload: coin
    })
    dispatch({
      type: DISPLAY_COIN_DATA_SUCCESS,
      payload: newWatchList
    })
  };


  export const handleInputChange = (inputValue) => async dispatch => {
    console.log('SEARCH IS: ', inputValue)
    try {
      if (inputValue !== "") {
        // Retreive stored coinGecko API database keys
        const state = store.getState();
        const responseGecko = state.onSigninReducer.coinKeys

        const instance = axios.create({baseURL:`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`})

        instance.interceptors.request.use(req => {
          console.log("Request: ", req);
          return req
        })

        // Get search suggestions from coin paprikia API
        const promise1 = instance.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`)
        const coinPaprikaData = await promise1;
        const coinDataNewID = coinPaprikaData.data.currencies.map(function(response) { 
          console.log("Coin Paprika API Response: ", response);
      
          // Various searching methods to find coins in coinGecko API Database from search suggestions
          let geckoData = responseGecko.data.find((element) => (element.name === response.name));
          if (geckoData === undefined) {
            console.log('Begging search for symbol instead')
            geckoData = responseGecko.data.find((element) => (element.symbol === response.symbol.toLowerCase()));
          }
          if (geckoData === undefined) {
            console.log('Begging search for included name instead')
            geckoData = responseGecko.data.find((element) => (element.name.includes(response.name)));
          }
          
          console.log("GeckoData Found: ", geckoData)
          if (geckoData === undefined) {
            console.log('Resorting to skipping coin :(')
            return {
              newID: "",
            }
          }
        
          response.newID = geckoData.id
          return {
            newID: response.newID,
          }});

        console.log('coin paprika data: ', coinDataNewID);
  
        // filter out any coins that don't exist in coinGecko API database (returned empty)
        const filteredData = coinDataNewID.filter((coin) => (coin.newID !== ""));
        console.log('Filtered data set: ', filteredData);

        if (filteredData.length < 5) {
          console.log('LAST ditch effort to find the element using what info was passed to search bar to find directly in coingecko database keys')
          console.log('filtered data len: ', filteredData.length)
          const geckoData = responseGecko.data.filter((element) => (element.name.toLowerCase().includes(inputValue.toLowerCase()))).slice(0, (5 - filteredData.length));
          console.log('geckoData: ', geckoData, inputValue)
          geckoData.map((coin) => { 
          let data = {
            newID: coin.id
          }
          filteredData.push(data)
          return {}
        })}

        const promises = filteredData.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin.newID));
        const coinDataImages = await Promise.all(promises);
        const coinData = coinDataImages.map(function(response) {
          const data = response.data
          return {
            id: data.id,
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            image: data.image.small,
            price: data.market_data.current_price.usd
           }});
        
        // filter out any duplicate results (can happen during forks of various coins)
        const filteredcoinData = coinData.filter((coin, index, self) => 
           index === self.findIndex((t) => (
             t.place === coin.place && t.name === coin.name
           ))
        )

        console.log('coinDataImages: ', filteredcoinData);
          
        dispatch({
          type: UPDATE_SEARCH_SUCCESS,
          payload: filteredcoinData
        })
      } else {
        console.log('else activated')
        dispatch({
          type: UPDATE_SEARCH_SUCCESS,
          payload: []
        })
      }
    } catch (err) {
      dispatch({
        type: UPDATE_SEARCH_ERROR,
        payload:
          "Something went wrong searching for coins."
      });
    }
  };
  
  