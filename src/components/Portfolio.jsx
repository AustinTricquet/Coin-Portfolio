import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import PortfolioList from './PortfolioList';
import {Link} from 'react-router-dom';

const Div = styled.div`
    max-height: 93vh;
`;

const Portfolio = ({ signout, auth }) => {
    return (
        <Div>
            <p>Portfolio page</p>
            <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
            <button className="btn-switch" onClick={() => signout()}>Log out</button>
        </Div>

    )
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
    requireAuth
  )(Portfolio);

/*<PortfolioList coinData={props.coinData}/>*/