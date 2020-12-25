import {
    FETCH_COIN_DATA_SUCCESS,
    FETCH_COIN_DATA_ERROR,
    UPDATE_SELECTED_COIN_SUCCESS,
    UPDATE_WATCH_LIST_ERROR,
    UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
    UPDATE_SEARCH_SUGGESTIONS_ERROR,
    ADD_COIN_SUCCESS,
    REMOVE_COIN_SUCCESS,
    UPDATE_MARKET_DATA_SUCCESS,
    UPDATE_CHART_DATA
  } from "./actionTypes";
  import { beginApiCall, apiCallError } from "./apiStatusActions";
  import axios from 'axios';
  import {store} from '../../index';
  
  // Fetch Coin Data for watch list
  export const updateMarketData = (coinIDs = [], selectedCoinID = "", days = 1, suggestions=false) => async dispatch => {
    console.log("COIN ID INPUT in FETCH COIN DATA: ", coinIDs)
    try {
        // UPDATE SELECTED COIN FIRST

        if (selectedCoinID !== "") {
          const coinChart = await dispatch(fetchCoinChart(selectedCoinID, days));
          console.log("coinChart: ", coinChart)
          axios.get('https://api.coingecko.com/api/v3/coins/' + selectedCoinID).then((response) => {
            const data = response.data;
            let price = data.market_data.current_price.usd
            if (price > 999.99) {
              price = price.toFixed(0);
            } else if ( price < 1.99) {
              price = price.toFixed(4);
            } else {
              price = price.toFixed(2);
            }

            let payload = { 
              id: selectedCoinID,
              marketData: {
                key: data.id,
                id: data.id,
                name: data.name,
                symbol: data.symbol.toUpperCase(),
                image: data.image.large,
                price: price,
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
              },
              coinChart: {
                dates: coinChart.dates,
                prices: coinChart.prices,
                days: days
              }
            }
            dispatch({
              type: UPDATE_SELECTED_COIN_SUCCESS,
              payload: payload,
              id: selectedCoinID
            })
            // need to add price data to chart ( could use separate chart data structure or embed inside selectedCoin)
            // if chosen path is to add chart data to selectedCoin, then reducer will need to accomidate to only affect updating market data and not erasing any chart data.
          });
        };

        async function updateRemainingWatchList(filteredCoinIDs) {
          dispatch(beginApiCall());
          const coinDataPromises = filteredCoinIDs.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin));
          const coinDataResponses = await Promise.all(coinDataPromises);
          const marketData = coinDataResponses.map(function(response) {
            const data = response.data;
            let price = data.market_data.current_price.usd
            if (price > 999.99) {
              price = price.toFixed(0);
            } else if ( price < 1.99) {
              price = price.toFixed(4);
            } else {
              price = price.toFixed(2);
            }

            let payload = {
              key: data.id,
              id: data.id,
              name: data.name,
              symbol: data.symbol.toUpperCase(),
              image: data.image.large,
              price: price,
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

            if (!suggestions) {
              dispatch({
                type: UPDATE_MARKET_DATA_SUCCESS,
                payload: payload
              })
            } 
            
            return payload
            
            //else {
              //let suggestion = {
                //id: payload.id,
                //marketData: payload
              //}
              //console.log("id: passed -", payload.id)
              //dispatch({
                //type: UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
                //payload: suggestion,
                //id: payload.id
              //})
            //}
          });
          console.log("marketData: ", marketData)
          if (suggestions) {
            dispatch({
              type: UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
              payload: marketData,
            })
          }
        };

        if (coinIDs !== []) {
          if (selectedCoinID !== "") {
            const selectedInWatchList = coinIDs.find((coin) => (coin === selectedCoinID)) !== undefined ? true : false;
            console.log("selectedInWatchList: ", selectedInWatchList);

            if (selectedInWatchList) {
              // filter out the coin already updated and selected then update watchList
              const filteredCoinIDs = coinIDs.filter((coin) => (coin.id !== selectedCoinID));
              updateRemainingWatchList(filteredCoinIDs);
            } else {
              // Since the selected coin is not in the watchList - update the watchList as normal
              updateRemainingWatchList(coinIDs);
            };
          } else {
            updateRemainingWatchList(coinIDs);
          }
        };
        
        dispatch({
          type: FETCH_COIN_DATA_SUCCESS,
          payload: "Fetch Coin Data from 'Coin Gecko API' Success!"
        })
       
    } catch (err) {
      dispatch(apiCallError());
      dispatch({
        type: FETCH_COIN_DATA_ERROR,
        payload:
          "Something went wrong using the 'Coin Gecko API'"
      });
    }
  };

  export const add = (selectedCoin) => async dispatch => {
    const state = store.getState();
    const watchList = state.watchListReducer.watchList;
    const newWatchList = watchList;
    newWatchList.push(selectedCoin[0]);
    console.log("NEW WATCH LIST: ", newWatchList)
    dispatch({
      type: ADD_COIN_SUCCESS,
      payload: newWatchList
    })
  }

  export const remove = (selectedCoin) => async dispatch => {
    const state = store.getState();
    const watchList = state.watchListReducer.watchList;
    const newWatchList = watchList.filter((coin) => (coin.id !== selectedCoin[0].id));
    console.log('newWatchList: ', newWatchList)
    dispatch({
      type: REMOVE_COIN_SUCCESS,
      payload: newWatchList
    })
  }

  export const selectCoin = (selectedCoinID) => async dispatch => {
    try {
     
      dispatch({
        type: UPDATE_SELECTED_COIN_SUCCESS,
        payload: selectedCoinID
      });
        
    } catch {
      dispatch({
        type: UPDATE_WATCH_LIST_ERROR,
        payload: "Update Watch List error"
      })
    }
  }

  // Everything to do with searching for new coins to add
  export const handleInputChange = (inputValue) => async dispatch => {
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
        const suggestedCoinsResponse = await axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`)
        let suggestedCoins_CoinKeys = suggestedCoinsResponse.data.currencies.map(function(response) { 
          //console.log("SUGGESTED COINS RESPONSE: ", response);
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
              id: "",
            }
          }
        
          response.id = geckoData.id;
          return response.id
        });
  
        // filter out any coins that don't exist in coinGecko API database (returned empty)
        suggestedCoins_CoinKeys = suggestedCoins_CoinKeys.filter((coin) => (coin.id !== ""));

        if (suggestedCoins_CoinKeys.length < 3) {
          //console.log('LAST ditch effort to find the element using what info was passed to search bar to find directly in coingecko database keys')
          const coinKey = coinKeys.data.filter((element) => (element.name.toLowerCase().includes(inputValue.toLowerCase()))).slice(0, (5 - suggestedCoins_CoinKeys.length));
          coinKey.map(coin => suggestedCoins_CoinKeys.push(coin.id))}

        //console.log("SUGGESTED COINS KEYS: ", suggestedCoins_CoinKeys)
        console.log("CALLING 'FETCH COIN DATA' FROM 'HANDLE INPUT CHANGE'", suggestedCoins_CoinKeys);
        let suggestedCoins = await dispatch(updateMarketData(suggestedCoins_CoinKeys, "", 1, true))
        //console.log("SUGGESTED COINS AFTER DISPATCH: ", suggestedCoins);
        
        // filter out any duplicate results (can happen during forks of various coins)
        suggestedCoins = suggestedCoins.filter((coin, index, self) => 
           index === self.findIndex((t) => (
             t.place === coin.place && t.name === coin.name
           ))
        )
        console.log("'HANDLE INPUT CHANGE' (SUGGESTED COINS) OUTPUT: ", suggestedCoins);
        dispatch({
          type: UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
          payload: suggestedCoins
        })
      } else {
        //console.log('else activated')
        console.log("'HANDLE INPUT CHANGE' (SUGGESTED COINS) OUTPUT: []");
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

  export const fetchCoinChart = (coinID, days) => async dispatch => {
    try {

        //const state = store.getState();
        //const watchList = state.watchListReducer.watchList;

        dispatch(beginApiCall());
        //console.log('BEGIN CHART FETCH')
        const coinChartDataResponse = await axios.get('https://api.coingecko.com/api/v3/coins/' + coinID + '/market_chart?vs_currency=usd&days=' + days);
        //console.log("Chart Data Response: ", coinChartDataResponse.data.prices);
        const prices = [];
        const dates = [];
        const priceData = coinChartDataResponse.data.prices;

        priceData.forEach((arr) => {
          //console.log(arr[0])
          const date = arr[0];
          let price = arr[1];
          if (arr[1] > 999.99) {
            price = arr[1].toFixed(0);
          } else if ( arr[1] < 9.99) {
            price = arr[1].toFixed(4);
          } else {
            price = arr[1].toFixed(2);
          }
          
          dates.push(date);
          prices.push(price);
        })

        //let result = watchList.find(coin => { return coin.id === coinID})

        //console.log("RESULT OF FIND: ", result)

        return {dates, prices};
        
       
    } catch (err) {
      dispatch(apiCallError());
      dispatch({
        type: FETCH_COIN_DATA_ERROR,
        payload:
          "Something went wrong using the 'Coin Gecko API'"
      });
    }
  }  
  
  