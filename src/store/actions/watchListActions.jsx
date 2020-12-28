import {
    UPDATE_SELECTED_COIN_SUCCESS,
    UPDATE_WATCH_LIST_ERROR,

    UPDATE_SEARCH_SUGGESTIONS_SUCCESS,
    UPDATE_SEARCH_SUGGESTIONS_ERROR,

    ADD_COIN_SUCCESS,
    ADD_COIN_ERROR,

    REMOVE_COIN_SUCCESS,
    REMOVE_COIN_ERROR,

    UPDATE_MARKET_DATA_SUCCESS,
    UPDATE_MARKET_DATA_ERROR,

    //SEARCH_START,
    //SEARCH_FAIL,
    //SEARCH_SUCCESS
  } from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import axios from 'axios';
import {store} from '../../index';

// Function used internally for updateMarketData ... move to inside of updateMarketData
const fetchCoinChart = async (coinID, days) => {
  try {
      const coinChartDataResponse = await axios.get('https://api.coingecko.com/api/v3/coins/' + coinID + '/market_chart?vs_currency=usd&days=' + days);
      const prices = [];
      const dates = [];
      const priceData = coinChartDataResponse.data.prices;
      priceData.forEach((arr) => {
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
      return {dates, prices};
  } catch {
    return "Error"
  }
}  

export const searchStart = () => dispatch => {
  dispatch({
    //type: SEARCH_START,
  });
};

export const searchFail = () => dispatch => {
  dispatch({
    //type: SEARCH_FAIL,
  });
};

export const searchSuccess = (data) => dispatch => {
  dispatch({
    //type: SEARCH_SUCCESS,
    payload: data
  });
};


const resources = {};
const makeRequestCreator = () => {
  let cancel;
  console.log("make request started")
  return async query => {
    console.log('async return query is triggered')
    if (cancel) {
      // Cancel the previous request before making a new request
      console.log("canceled request!")
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    console.log("cancel token reassigned")
    try {
      if (resources[query]) {
        // Return result if it exists
        console.log("querying prior results")
        return resources[query];
      }
      console.log("about to use axios call")
      const res = await axios(query, { cancelToken: cancel.token });
      const result = res;
      // Store response
      console.log("storing response: ", result)
      resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log("Request canceled", error.message);
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message);
      }
    }
  };
};
export const search = makeRequestCreator();


// Fetch Coin Data for watch list
export const updateMarketData = (coinIDs = [], selectedCoinID = "", days = 1, suggestions=false, onWatchList = true) => async dispatch => {
  console.log("COIN ID INPUT in FETCH COIN DATA: ", coinIDs)
  try {
      // UPDATE SELECTED COIN FIRST
      if (selectedCoinID !== "") {

        // Get coin chart data.
        const coinChart = await fetchCoinChart(selectedCoinID, days);
        if (coinChart === "Error") {
          console.log("ERROR GETTING CHART DATA")
          dispatch({
            type: UPDATE_MARKET_DATA_ERROR,
            payload: "Error - Not able to fetch coin chart."
          })
        }
        console.log("CHART DATA: ", coinChart)

        // Get coin market data.
        // create public function to handle basic market data calls?
        // handle error here?
        axios.get('https://api.coingecko.com/api/v3/coins/' + selectedCoinID).then((response) => {
          const data = response.data;
          if (
            data.market_data.price_change_percentage_24h_in_currency.usd === undefined
          ) {
            console.log("token data partial")
            data.market_data.price_change_percentage_24h_in_currency.usd = 0
          }

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
              dayPercentChange: data.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2),
              onWatchList: false
            },
            coinChart: {
              dates: coinChart.dates,
              prices: coinChart.prices,
              days: days
            }
          }
          if (onWatchList) {
            payload.marketData.onWatchList = true
          }

          dispatch({
            type: UPDATE_SELECTED_COIN_SUCCESS,
            payload: payload,
            id: selectedCoinID
          })
        });
      };

      // use external function to handle api calls 
      async function updateRemainingWatchList(filteredCoinIDs) {
        dispatch(beginApiCall());
        const coinDataPromises = filteredCoinIDs.map(coin => axios.get('https://api.coingecko.com/api/v3/coins/' + coin));
        const coinDataResponses = await Promise.all(coinDataPromises);
        const marketData = coinDataResponses.map(function(response) {
          const data = response.data;

          // check if data is missing info... 
          if (
            data.market_data.price_change_percentage_24h_in_currency.usd === undefined
          ) {
            console.log("token data partial")
            data.market_data.price_change_percentage_24h_in_currency.usd = 0
          }

          let price = data.market_data.current_price.usd
          if (price > 999.99) {
            price = price.toFixed(0);
          } else if ( price < 1.99) {
            price = price.toFixed(4);
          } else {
            price = price.toFixed(2);
          }

          console.log("COIN: ", data.id, " DATA: ", data
          )

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
          };

          console.log("Suggestions: ", suggestions)
          if (!suggestions) {
            payload.onWatchList = true
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

        if (suggestions) {
          // check and remove any duplicate data from suggestions
          let dupCheck = [];
          marketData.forEach((coin) => {
            console.log("makretData: ", marketData)
            if(dupCheck.includes(coin.id)) {
              marketData.splice(dupCheck.length, 1);
            } else {
              dupCheck.push(coin.id);
            }
          })
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
      
  } catch (err) {
    dispatch(apiCallError());
    dispatch({
      type: UPDATE_MARKET_DATA_ERROR,
      payload:
        "Something went wrong updating the watchList."
    });
  }
};

// Add coin to watchList
export const add = (selectedCoin) => async dispatch => {
  dispatch({
    type: ADD_COIN_SUCCESS,
    payload: selectedCoin
  })
}

// Remove coin from watchList
export const remove = (selectedCoin) => async dispatch => {
  dispatch({
    type: REMOVE_COIN_SUCCESS,
    payload: selectedCoin
  })
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
      //const suggestedCoinsResponse = await axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`)

      const suggestedCoinsResponse = await search(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=3`);
      console.log("suggestions: ", suggestedCoinsResponse);



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
        const coinKey = coinKeys.data.filter((element) => (element.name.toLowerCase().includes(inputValue.toLowerCase()))).slice(0, (3 - suggestedCoins_CoinKeys.length));
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

  