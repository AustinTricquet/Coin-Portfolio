import React from 'react';
import PortfolioCoin from './PortfolioCoin';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import { fetchCoinData } from "../store/actions/coinDataActions";

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

const PortfolioList = ({coinData}) => {
    return (
        <Div>
            <Header>
                <Coin>
                    <div>
                        <h3>Header</h3>
                        <SubText>SubHeading</SubText>
                    </div>
                </Coin>
                <Balance>
                    <div>
                        <h3>Test</h3>
                        <SubText>Test subtext</SubText>
                    </div>
                </Balance> 
            </Header>
            {
                coinData.map( ({name, ticker, price, amount, valueUSD}) => 
                    <PortfolioCoin key={name}
                            name={name} 
                            ticker={ticker} 
                            amount={amount}
                            price={price}
                            valueUSD={valueUSD}
                            tickerid={name}/> 
                    )
            }
        </Div>
    )
}

function mapStateToProps(state) {
    return {
      coinData: state.coinDataReducer.coinData
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchCoinData: () => dispatch(fetchCoinData())
    };
  }


export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(PortfolioList);