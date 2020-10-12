import React from 'react';
import styled from  'styled-components';
import {Link} from 'react-router-dom';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    width: 100%;
    opacity: 0.9;
    background: var(--nav-primary-color);
    color: var(--nav-text-color);
    height: 4rem;
    position: absolute;
    bottom: 0px;

    a {
        color: var(--nav-text-color);
        padding: 1rem;
        margin: 0 0.25rem;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover {
        color: var(--nav-a-hov-color);
    }

    li {
        margin: auto 1em;
    }

    li a:focus {
        color: var(--nav-primary-color);
        background-color: #fff;
        padding: 1rem 1rem 4rem 1rem;
        border-radius: 1rem;
    }

    ul {
        text-align: center;
        justify-content: center;
        display: flex;
        list-style: none;
    }

`;

const Footer = (props) => {
    
    return (
        <Nav className="navbar  bg-primary">
            <h1>
                <Link to='/'>Coin Portfolio</Link>
            </h1>
            <ul>
                <li>Contact Support</li>
                <li>Hire Me</li>
                <li>Legal Disclosures</li>
            </ul>
        </Nav>
    )
}

Footer.defaultProps={
    title: 'Coin Portfolio'
};

export default Footer