import React from 'react';
import WatchListCoin from './WatchListCoin';
import WatchListSelectedCoin from './WatchListSelectedCoin';
import SearchSuggestedCoin from './SearchSuggestedCoin';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { handleInputChange } from '../store/actions/watchListActions';
import { changePortfolioView } from '../store/actions/portfolioActions';
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

const Portfolio = withRouter(({history, watchList_Display, handleInputChange, suggestions, selectedCoin, viewPortfolio, changePortfolioView}) => {

    function handleChange(e) {
        e.preventDefault();
        handleInputChange(e.target.value);
    }

    function changeView(e) {
        e.preventDefault();
        changePortfolioView();
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

    // show and hide using function to set value to reveal or not and then use if statement to display or not.

    return (
        <Div>
            {}
            <InputGroup>
                { viewPortfolio === true ? <h1>Portfolio</h1> : <h1>Wallets</h1>}
                <button onClick={changeView}>{viewPortfolio === true ? "View Wallets" : "View Portfolio"}</button> 
            </InputGroup>
            { viewPortfolio === true ? null :
                <div>
                    <InputGroup onSubmit={handleSubmit} id="watchListSearch">
                        <input type="text"
                            placeholder="Wallet Address"
                            onChange={handleChange}
                        />
                        <button>Add Wallet</button>
                    </InputGroup>
                </div>
            }
            {
                selectedCoin.map( ({id, name, symbol, image, price, dayPercentChange}) =>
                    <WatchListSelectedCoin key={id}
                                coinID={id}
                                name={name} 
                                symbol={symbol} 
                                price={price}
                                image={image}
                                dayPercentChange={dayPercentChange}/> 
                    )
            }
            {
                watchList_Display.map( ({id, name, symbol, image, price, dayPercentChange}) => 
                    <WatchListCoin key={id}
                            coinID={id}
                            name={name} 
                            symbol={symbol} 
                            price={price}
                            image={image}
                            dayPercentChange={dayPercentChange}/> 
                    ) 
            }
        </Div>
    )
})

function mapStateToProps(state) {
    return {
      watchList_Display: state.watchListReducer.watchList_Display,
      suggestions: state.watchListReducer.suggestions,
      selectedCoin: state.watchListReducer.selectedCoin,
      viewPortfolio: state.portfolioReducer.viewPortfolio
    };
  }
  
function mapDispatchToProps(dispatch) {
  return {
    handleInputChange: (query) => dispatch(handleInputChange(query)),
    changePortfolioView: () => dispatch(changePortfolioView())
  };
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Portfolio);