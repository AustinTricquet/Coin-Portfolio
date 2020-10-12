import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import Login from "./Login";
import Home from "./Home";
import { Switch, Route } from 'react-router-dom';
import About from "./About";
import Navbar from './Navbar';
import Contact from './Contact';

const Div = styled.div`

`;

const Landing = () => {
    return (
      <>
        <Navbar 
          buttonRoute="/login" 
          buttonName="Login"
          menuOptions={[
            {
              key: 'Home',
              route: '/',
            },
            {
              key: 'About',
              route: '/about',
            },
            {
              key: 'Contact',
              route: '/contact'
            }
          ]}>
        </Navbar>
        <Div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
          </Switch>
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
  )(Landing);