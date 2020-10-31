import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    margin: 2rem 2rem 1rem 1rem;
    padding: 2rem;
    width: 40%;
`;

const CoinNews = () => {
    return (
        <Div>
            <h1>Coin News!</h1>
        </Div>
    )
}


export default requireAuth(CoinNews);