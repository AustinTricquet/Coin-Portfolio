import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 0.75rem 1.5rem 1.5rem 1.5rem;
    padding: 2rem;
    width: 100%;
    min-width: 25rem;
`;

const CoinChart = () => {
    return (
        <Div>
            <h1>Coin Chart!</h1>
            <canvas id="coinChart"></canvas>
        </Div>
    )
}


export default requireAuth(CoinChart);