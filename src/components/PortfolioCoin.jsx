import React from 'react'
import styled from 'styled-components';
import logo from './logo.svg';

const Div = styled.div`
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

const PortfolioCoin = ({name, ticker, valueUSD, amount}) => {
    return (
        <Div>
            <Coin>
                <Img src={logo} alt="React logo" className="App-logo" />
                <div>
                    <h3>{name}</h3>
                    <SubText>{ticker}</SubText>
                </div>
            </Coin>
            <Balance>
                <div>
                    <h3>${valueUSD}</h3>
                    <SubText>{amount}</SubText>
                </div>
            </Balance> 
        </Div>
    )
}

export default PortfolioCoin
