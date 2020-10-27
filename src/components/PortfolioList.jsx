import React from 'react';
import PortfolioCoin from './PortfolioCoin';
import SearchSuggestedCoin from './SearchSuggestedCoin';
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchCoinData } from "../store/actions/coinDataActions";
import { handleInputChange } from '../store/actions/coinSearchActions';

const Div = styled.div`
    height: 87vh;
    min-width: 30vh;
    width: 25%;
    overflow: auto;
`;

const Header = styled.div`
    border-bottom: 1px solid #3A4A5E;
    border-top: 1px solid #3A4A5E;
    display: flex;
    justify-content: space-between;
    padding: 0rem;
    background-color: #28394F;
`;

const Coin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F0F1F3;
`;

const Img = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    pointer-events: none;
    background-color: white;
    border-radius: 100%;
    margin: 0rem 1rem;
`;

const Balance = styled.div`
    color: #F0F1F3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 1rem;
    text-align: right;
`;

const SubText = styled.h5`
    color: #8993A8;
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



const PortfolioList = ({coinData, handleInputChange, suggestions}) => {

    function handleChange(e) {
        handleInputChange(e.target.value);
    }

    function handleClick(e) {
        console.log("CLICKED ",e)
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
                suggestions.map( ({id, name, symbol, logo, balance, price}) => 
                    <SearchSuggestedCoin key={id}
                            name={name} 
                            symbol={symbol} 
                            logo={logo}
                            amount={balance}
                            price={price}
                            valueUSD={price}/> 
                    )
            }
            {
                coinData.map( ({key, name, symbol, balance, price}) => 
                    <PortfolioCoin key={key}
                            coinID={key}
                            name={name} 
                            symbol={symbol} 
                            amount={balance}
                            price={price}
                            valueUSD={price}/> 
                    )
                   
            }
        </Div>
    )
}

function mapStateToProps(state) {
    return {
      coinData: state.coinDataReducer.coinData,
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
  )(PortfolioList);