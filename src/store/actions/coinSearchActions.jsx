import axios from "axios";
import {
    UPDATE_SEARCH_SUCCESS,
    UPDATE_SEARCH_ERROR
  } from "./actionTypes";
  import {store} from '../../index';
  
  // Get search suggestions from coinpaprika API and images and price info from Coin Gecko
  export const handleInputChange = (inputValue) => async dispatch => {
    try {
      if (inputValue !== "") {
        // Retreive stored coinGecko API database keys
        const state = store.getState();
        const responseGecko = state.onSigninReducer.coinKeys

        

        const instance = axios.create({baseURL:`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`})

        instance.interceptors.request.use(req => {
          return console.log("request issssss: ",req)
         }
        );
        
        console.log('inst. created about to get it')
        const promise3 = await instance.get()
        console.log ("promise3 ",promise3)

        // Get search suggestions from coin paprikia API
        //const promise1 = await axios.get(`https://api.coinpaprika.com/v1/search/?q=${inputValue}&c=currencies&limit=5`)
        //console.log('promise.cong ', axios.config)
        const coinPaprikaData = await promise3;
        //console.log('DATA FROM PAPRIKA: ', promise3);
        const coinDataNewID = coinPaprikaData.map(function(response) { 
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
  