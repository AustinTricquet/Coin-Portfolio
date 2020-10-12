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
    height: 7vh;

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
    
    button {
        padding: 0.5rem 1rem;
        margin-right: 1rem;
    }

    button a {
        color: var(--nav-primary-color);
        font-weight: 900;
    }
`;

const Navbar = (props) => {
    
    return (
        <Nav className="navbar  bg-primary">
            <h1>
                <Link to='/'>Coin Portfolio</Link>
            </h1>
            <ul>
            {
                props.menuOptions.map( ({key, route }) => 
                    <Link key={key} to={route}>{key}</Link> 
                    )
            }
            </ul>
            <button>
                <Link to={props.buttonRoute}>{props.buttonName}</Link>
            </button>
        </Nav>
    )
}

Navbar.defaultProps={
    title: 'Coin Portfolio'
};

export default Navbar
