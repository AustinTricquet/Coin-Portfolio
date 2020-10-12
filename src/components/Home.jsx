import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import Login from "./Login";
import Landing from "./Landing";
import { Switch, Route } from 'react-router-dom';
import About from "./About";

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
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
        </Switch>
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
  )(Home);