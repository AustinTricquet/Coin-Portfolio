import React from 'react';
import PortfolioCoin from './PortfolioCoin';
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
    padding: 1.5rem 0rem;
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



const PortfolioList = ({coinData, handleInputChange, queryValue}) => {

    function handleChange(e) {
        handleInputChange(e.target.value);
    }

    return (
        <Div>
            <Header>
            <form>
                <input
                    placeholder="Search for..."
                    onChange={handleChange}
                />
                <p>{queryValue}</p>
                </form>
            </Header>
            {
                coinData.map( ({key, name, symbol, balance, price}) => 
                    <PortfolioCoin key={key}
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
      queryValue: state.coinSearchReducer.queryValue
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      handleInputChange: (queryValue) => dispatch(handleInputChange(queryValue))
    };
  }


export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(PortfolioList);