import React from 'react'
import styled from 'styled-components';
import PortfolioList from './PortfolioList';

const Div = styled.div`
    max-height: 93vh;
`;

const Portfolio = (props) => {
    return (
        <Div>
        <PortfolioList coinData={props.coinData}/>
        </Div>

    )
}

export default Portfolio;
