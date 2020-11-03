import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";
import requireAuth from "../components/hoc/requireAuth";

const Div = styled.div`
    max-height: 87vh;
`;

const PortfolioPage = ({ auth }) => {
  return (
    <>
    </>
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
)(PortfolioPage);
/*<PortfolioList coinData={props.coinData}/>*/