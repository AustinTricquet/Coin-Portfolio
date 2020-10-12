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

      .auth-message {
        text-align: center;
        color: orange; }
        
      .login-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1em; }
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
      {authMsg && <p className="auth-message">{authMsg}</p>}
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
          <button type="submit" className="btn-login">
            {loading ? (
              <Spinner />
            ) : reset ? (
              "Reset password"
            ) : newUser ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
          {!newUser && !reset && (
            <button onClick={() => SetReset(true)} className="btn-link">
              Forgot password?
            </button>
          )}
          {reset && (
            <button onClick={() => SetReset(false)} className="btn-link">
              Back to sign in
            </button>
          )}
        </div>
      </form>
      <footer className="login-footer">
        <p>
          {newUser ? "Already have an account?" : "Don't have an account yet?"}
        </p>
        <button
          onClick={() => {
            setNewUser(!newUser);
            if (reset) SetReset(false);
          }}
          className="btn-switch"
        >
          {newUser ? "Sign in" : "Create an account"}
        </button>
      </footer>
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