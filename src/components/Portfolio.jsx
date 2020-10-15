import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import requireAuth from "./hoc/requireAuth";
import PortfolioList from './PortfolioList';
import Navbar from "./Navbar";

const Div = styled.div`
    max-height: 93vh;
`;

const Portfolio = ({ auth }) => {
  return (
    <div className="page">
      <div>
        <span className="emoji" role="img" aria-label="House With Garden">
          🏡
        </span>
      </div>
      <h1>Welcome on Home</h1>
      <p>You have successfully signed in, congrats!</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signout: (cb) => dispatch(signout(cb))
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