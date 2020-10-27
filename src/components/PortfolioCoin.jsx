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
    :hover {
        background-color: #c9bcbe;
    }
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

const PortfolioCoin = ({coinID, name, symbol, image, price}) => {
    
    function handleClick() {
        console.log("CLICKED ",coinID)
    }

    return (
        <Div id={coinID} onClick={handleClick}>
            <Coin>
                <Img src={image} alt="React logo" className="App-logo" />
                <div>
                    <h3>{name}</h3>
                    <SubText>{symbol}</SubText>
                </div>
            </Coin>
            <Balance>
                <div>
                    <h3>${price}</h3>
                    <SubText></SubText>
                </div>
            </Balance> 
        </Div>
    )
}

export default PortfolioCoin
