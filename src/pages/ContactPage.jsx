import React from 'react'
import styled from 'styled-components';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/authActions";

const Div = styled.div`
    text-align: center;
    background-color: var(--nav-primary-color);
    border-radius: 1rem;
    color: var(--nav-text-color);
    padding: 3rem 0.5rem;
    margin: 2em auto 2em auto;
    width: 60%;
`;

const ContactPage = ({ auth }) => {
    return (
        <Div>
            <h1>Contact</h1>
            <h2>You can reach out to me here.</h2>
            <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
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
  )(ContactPage);