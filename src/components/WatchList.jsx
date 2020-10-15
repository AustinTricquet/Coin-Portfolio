import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import requireAuth from "./hoc/requireAuth";
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

const WatchList = ({auth}) => {
    return (
        <Div>
            <h1>Watch List</h1>
            <h2>Money Money Money</h2>
            <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
        </Div>
    )
}

  
  
export default requireAuth(WatchList);