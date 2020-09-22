import React from 'react'
import PortfolioCoin from './PortfolioCoin'
import styled from 'styled-components';

const Div = styled.div`
    height: 93vh;
    min-width: 30vh;
    width: 25%;
    overflow: auto;
`;

const PortfolioList = (props) => {
    return (
        <Div>
            {
                props.coinData.map( ({key, name, ticker, price, amount, valueUSD}) => 
                    <PortfolioCoin key={key}
                            handleRefresh={props.handleRefresh}
                            name={name} 
                            ticker={ticker} 
                            showBalance={props.showBalance}
                            amount={amount}
                            price={price}
                            valueUSD={valueUSD}
                            tickerid={key}/> 
                    )
            }
        </Div>
    )
}

export default PortfolioList
