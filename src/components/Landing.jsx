import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
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
    margin: auto;
    width: 50%;
`;

const Landing = ({ signin, signout, auth, history}) => {
    return (
        <Div>
            <h1>Welcome to Coin Portfolio</h1>
            <h2>Track all your crypto trades!</h2>
            <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
            <button onClick={() => history.push('/login') } >Log in</button>
        </Div>
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
  )(Landing);