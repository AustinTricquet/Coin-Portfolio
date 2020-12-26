import React, { useEffect} from 'react';
import WatchListCoin from './WatchListCoin';
//import WatchListSelectedCoin from './WatchListSelectedCoin';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { handleInputChange } from '../store/actions/watchListActions';
import { withRouter } from 'react-router-dom';

const Div = styled.div`
  height: 87vh;
  min-width: 30vh;
  width: 25%;
  overflow: auto;
`;

const InputGroup = styled.form`
  border-bottom: 1px solid #3A4A5E;
  border-top: 1px solid #3A4A5E;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
  background-color: #28394F;

  input {
      -webkit-flex: 1;
    
      outline: none;
      border: 1px solid #dfe2e6;
      color: #6b6c6f;
      border-radius: 20px;
      padding: 0.5rem 0.5rem; 
      
      }
      input.input-error {
      border: 1px solid red; }
`;

const WatchList = withRouter(({history, handleInputChange, suggestions, watchList, selectedCoin }) => {

    function handleChange(e) {
        e.preventDefault();
        handleInputChange(e.target.value);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      document.getElementById("watchListSearch").reset();
      handleInputChange("");
      // if statement helps prevent error when submitting form before suggestions are pulled.
      if (suggestions.length > 0) {
        let targetSuggestion = suggestions[0].id;
        let route = "/watch-list/" + targetSuggestion;
        history.push(route);
      } else {
        // essentially it needs to act similar to handleinputchange function where it looks up suggestions based on text input and returns the first suggestion for submission.
        console.log("BUILD FUNCTION TO HANDLE PRESUBMITTED SUGGESTIONS") 
      }
      
    }

    try {
      return (
        <Div>
            <InputGroup onSubmit={handleSubmit} id="watchListSearch">
                <input type="text"
                    placeholder="Search"
                    onChange={handleChange}
                />
            </InputGroup>
            {
              suggestions.map( ({id, name, symbol, price, image, dayPercentChange}) => 
                <WatchListCoin key={id}
                        coinID={id}
                        name={name} 
                        symbol={symbol} 
                        price={price}
                        image={image}
                        dayPercentChange={dayPercentChange}
                        selected={null}/> 
                ) 
            }
            <WatchListCoin key={selectedCoin.id}
                            coinID={selectedCoin.id}
                            name={selectedCoin.marketData.name} 
                            symbol={selectedCoin.marketData.symbol} 
                            price={selectedCoin.marketData.price}
                            image={selectedCoin.marketData.image}
                            dayPercentChange={selectedCoin.marketData.dayPercentChange}
                            selected="selected"/> 
                    
            {
                Object.values(watchList).filter((coin) => (coin.id !== selectedCoin.id)).sort((a,b) => (b.marketData.marketCap - a.marketData.marketCap)).map( ({id, marketData}) => 
                    <WatchListCoin key={id}
                            coinID={id}
                            name={marketData.name} 
                            symbol={marketData.symbol} 
                            price={marketData.price}
                            image={marketData.image}
                            dayPercentChange={marketData.dayPercentChange}
                            selected={null}/> 
                    ) 
            }
        </Div>
      )

    } catch {
      return ( <h1>test</h1>)
    }
    
})
    

function mapStateToProps(state) {
    return {
      watchList: state.watchListReducer.watchList,
      suggestions: state.watchListReducer.suggestions,
      selectedCoin: state.watchListReducer.selectedCoin
      //selectedCoin: state.watchListReducer.selectedCoin
    };
  }
  
function mapDispatchToProps(dispatch) {
  return {
    handleInputChange: (query) => dispatch(handleInputChange(query)),
  };
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WatchList);