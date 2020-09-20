import React from 'react'
import styled from 'styled-components';
import PortfolioList from './PortfolioList';

const Div = styled.div`
    text-align: center;
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
    margin: auto;
    width: 50%;
`;

const Portfolio = (props) => {
    return (
        <>
        <h1>Portfolio</h1>
        <PortfolioList coinData={props.coinData}/>
        </>

    )
}

export default Portfolio;
