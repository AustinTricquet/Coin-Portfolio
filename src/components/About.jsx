import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";

const Div = styled.div`
    text-align: center;
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
    margin: 2em auto 2em auto;
    width: 60%;
`;

const About = ({ auth }) => {
  return (
    <Div>
      <h1>About page</h1>
      <h2>This app is to help track your crypto.</h2>
      <h4>Built using React, Redux and Firebase</h4>
      <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
    </Div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}
  
export default compose(
  connect(
    mapStateToProps
  ),
)(About);