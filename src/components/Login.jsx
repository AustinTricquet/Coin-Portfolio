import React, { useState } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { signup, signin, resetPassword } from "../store/actions/authActions";
import useForm from "../utils/useForm";
import validate from "../utils/validateLoginForm";
import Spinner from "./Spinner";

const Div = styled.div`
  text-align: center;
  background-color: var(--nav-primary-color);
  border-radius: 1rem;
  color: var(--nav-text-color);
  padding: 3rem 0.5rem;
  margin: 2em auto 2em auto;
  width: 35vw;

  h1 {
    text-align: center;
    margin-bottom: 1em; }

  h2 {
    text-align: center;
    color: #29b1cc;
    margin-bottom: 2em; }
`;

const AuthMsg = styled.p`
  text-align: center;
  color: yellow;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;

  label {
    margin-bottom: 0.8em; }

  input {
    outline: none;
    border: 1px solid #dfe2e6;
    color: #6b6c6f;
    border-radius: 20px;
    padding: 1.2em 1.5em; }

  input.input-error {
    border: 1px solid red; }

  small {
    font-size: 0.6em;
    margin: 0.6em 0 0 1.7em;
    color: red; }
`;

const Btn = styled.button`
  padding: 1em 3em;
  border-radius: 20px;
  font-weight: bold;
  border: none;
  outline: none;
  border: 2px solid #29b1cc;

  :hover {
    cursor: pointer;
    background-color: #29b1cc;
    color: #fff; }

.btn-switch {
  background-color: #fff;
  color: #29b1cc; }

.btn-login:hover {
  box-shadow: 0 10px 20px rgba(41, 177, 204, 0.3); }
`;

const BtnLink = styled.button`
  color: #29b1cc;
  border: none;
  border-bottom: 2px solid #29b1cc;
  padding: 0;
  margin-left: 2em; }
  :hover {
    border-bottom: none;
    cursor: pointer; }
`;




const Login = ({
  signup,
  signin,
  resetPassword,
  authMsg,
  history,
  loading,
  auth
}) => {
  const [newUser, setNewUser] = useState(false);
  const [reset, SetReset] = useState(false);
  const [credentials, handleChange, handleSubmit, errors] = useForm(
    login,
    validate,
    reset
  );

  function login() {
    if (newUser) {
      // signup
      signup(credentials.email, credentials.password);
    } else {
      if (reset) {
        // reset password
        resetPassword(credentials.email);
      } else {
        // signin
        signin(credentials.email, credentials.password, () =>
          history.push("/")
        );
      }
    }
  }

  return (
    <Div>
      <h1>Coin Portfolio</h1>
      <p>{!auth.isEmpty ? "You are Authenticated" : "You are not Authenticated"}</p>
      <h2>
        {reset ? "Reset password" : newUser ? "Create an account" : "Log In"}
      </h2>
      {authMsg && <AuthMsg>{authMsg}</AuthMsg>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <InputGroup>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Your e-mail"
            onChange={handleChange}
            className={
              (errors.emailIsEmpty || errors.emailFormatInvalid) &&
              "input-error"
            }
          />
          {errors.emailIsEmpty && <small>{errors.emailIsEmpty}</small>}
          {errors.emailFormatInvalid && (
            <small>{errors.emailFormatInvalid}</small>
          )}
        </InputGroup>

        {/* PASSWORD */}
        {!reset && (
          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              placeholder="Your password"
              onChange={handleChange}
              className={
                (errors.passIsStrong || errors.passIsEmpty) && "input-error"
              }
            />
            {errors.passIsStrong && <small>{errors.passIsStrong}</small>}
            {errors.passIsEmpty && <small>{errors.passIsEmpty}</small>}
          </InputGroup>
        )}

        {/* BUTTONS */}
        <div>
          <Btn type="submit">
            {loading ? (
              <Spinner />
            ) : reset ? (
              "Reset password"
            ) : newUser ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </Btn>
          {!newUser && !reset && (
            <BtnLink onClick={() => SetReset(true)}>
              Forgot password?
            </BtnLink>
          )}
          {reset && (
            <BtnLink onClick={() => SetReset(false)}>
              Back to sign in
            </BtnLink>
          )}
        </div>
      </form>
      <Footer>
        <p>
          {newUser ? "Already have an account?" : "Don't have an account yet?"}
        </p>
        <Btn
          onClick={() => {
            setNewUser(!newUser);
            if (reset) SetReset(false);
          }}>
          {newUser ? "Sign in" : "Create an account"}
        </Btn>
      </Footer>
    </Div>
  );
};

function mapStateToProps(state) {
  return {
    authMsg: state.authReducer.authMsg,
    loading: state.apiStatusReducer.apiCallsInProgress > 0,
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
      dispatch(signin(email, password, callback)),
    resetPassword: email => dispatch(resetPassword(email))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);