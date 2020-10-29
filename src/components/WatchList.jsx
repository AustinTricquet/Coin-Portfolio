import React from 'react';
import PortfolioCoin from './WatchListCoin';
import SearchSuggestedCoin from './SearchSuggestedCoin';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { handleInputChange } from '../store/actions/coinSearchActions';

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

const WatchList = ({watchList, handleInputChange, suggestions}) => {

    function handleChange(e) {
        handleInputChange(e.target.value);
    }

    return (
        <Div>
            <InputGroup>
                <input
                    placeholder="Search"
                    onChange={handleChange}
                />
            </InputGroup>
            {
                suggestions.map( ({id, name, symbol, image, price}) => 
                    <SearchSuggestedCoin key={id}
                            coinID={id}
                            name={name} 
                            symbol={symbol} 
                            price={price}
                            image={image}/> 
                    )
            }
            {
                watchList.map( ({id, name, symbol, image, price}) => 
                    <PortfolioCoin key={id}
                            coinID={id}
                            name={name} 
                            symbol={symbol} 
                            price={price}
                            image={image}/> 
                    )
                   
            }
        </Div>
    )
}

function mapStateToProps(state) {
    return {
      watchList: state.coinDataReducer.watchList,
      suggestions: state.coinSearchReducer.suggestions
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      handleInputChange: (query) => dispatch(handleInputChange(query))
    };
  }


export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WatchList);