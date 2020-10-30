import React from 'react'
import styled from 'styled-components';
import requireAuth from "../components/hoc/requireAuth";


const Div = styled.div`
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
`;

const CoinBasicInfo = () => {
    return (
        <Div>
            <h1>Coin Details!!!</h1>
        </Div>
    )
}


export default requireAuth(CoinBasicInfo);