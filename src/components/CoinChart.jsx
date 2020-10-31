import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 1rem 2rem 2rem 2rem;
    padding: 2rem;
    width: 100%;
`;

const CoinChart = () => {
    return (
        <Div>
            <h1>Coin Chart!</h1>
        </Div>
    )
}


export default requireAuth(CoinChart);