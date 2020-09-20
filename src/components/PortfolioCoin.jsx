import React from 'react'
import styled from 'styled-components';
import logo from './logo.svg';

const Div = styled.div`
    border: 1px solid #cccccc;
    width: 30vh;
    display: flex;
    justify-content: space-between;
    padding: 2rem 0rem;
`;

const Img = styled.img`
    height: 3rem;
    pointer-events: none;
`;


const PortfolioCoin = (props) => {
    return (
        <Div>
            <div>
            <Img src={logo} alt="React logo" className="App-logo" />
            </div>
            <div>
                <h3>{props.name}</h3>
                <h5>{props.ticker}</h5>
                <h6>${props.price}/{props.ticker}</h6>
            </div>
            <div>
                <h3>${props.valueUSD}</h3>
                <h4>{props.amount}</h4>
            </div> 
        </Div>
    )
}

export default PortfolioCoin
