import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations'

const LoginComponent = ({authenticateUser, authenticated}) => {
  return (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser}>
        <input type="text" name="username" placeholder="username" defaultValue="Dev"/>
        <input type="text" name="password" placeholder="password"/>
        {authenticated === mutations.NOT_AUTHENTICATED ? <p> Login incorrect</p> : null
        }
        <button type="submit" className="login">Login </button>
      </form>
    </div>
  )
};

const mapStateToProps = ({session}) => {
  return ({authenticated: session.authenticated});
}

const mapDispatchToProps = (dispatch)=> {
  return ({
    authenticateUser(e) {
      e.preventDefault();
      let username = e.target['username'].value;
      let password = e.target['password'].value;
      dispatch(mutations.requestAuthenticateUser(username, password)); 
    }
  });
}


export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps) (LoginComponent);