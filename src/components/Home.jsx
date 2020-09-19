import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
    text-align: center;
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
    margin: auto;
    width: 50%;
`;

const Home = () => {
    return (
        <Div>
            <h1>Welcome to Coin Portfolio</h1>
            <h2>Track all your crypto trades!</h2>
        </Div>
    );
}


export default Home;