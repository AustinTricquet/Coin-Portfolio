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

const Taxes = () => {
    return (
        <Div>
            <h1>Taxes</h1>
            <h2>Pay the tax man! Bye bye gains!</h2>
        </Div>
    )
}

export default Taxes

