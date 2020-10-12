import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import {Link} from 'react-router-dom';
import Login from "./Login";
import { Route } from 'react-router-dom';
import requireAuth from "./hoc/requireAuth";

const Div = styled.div`
    text-align: center;
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
    margin: 2em auto;
    width: 80%;
`;

const Home = ({ signin, signout, auth, history}) => {
    return (
        <>
        <Div>
            <h1>Coin Portfolio</h1>
            <div>
              <h3>Review your Portfolio</h3>
              <h3>Scout the Markets</h3>
              <h3>Track your Trades and Taxes</h3>
            </div>
            
            <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
        </Div>
        <Div>
          <h1>Portfolio</h1>
          <h3>See all your wallets in one place!</h3>
          <h3>Track your portfolio value over time!</h3>
        </Div>
        <Div>
          <h1>Markets</h1>
          <h3>Create Watch Lists and study the markets</h3>
          <h3>Discover deep insights from live news coverage and tools to analyze your prospective coins</h3>
        </Div>
        <Div>
          <h1>Trades</h1>
          <h3>See all our trades in one place</h3>
          <h3>Filter by wallet, date, coins and more!</h3>
        </Div>
        <Div>
          <h1>Taxes</h1>
          <h3>Take the headache out of Crypto Taxes</h3>
          <h3>Choose what accounting method and print out your report to file on your taxes! (U.S. Only)</h3>
        </Div>
        </>
    );
}

function mapStateToProps(state) {
    return {
      auth: state.firebaseReducer.auth
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      signout: () => dispatch(signout("/"))
    };
  }
  
  export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
  )(Home);