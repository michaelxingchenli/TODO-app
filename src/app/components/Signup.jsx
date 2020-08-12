import React from 'react';
import * as actions from './../store/actions';
import { connect } from 'react-redux';

import { Container, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignupComponent = ({requestCreateUserAccount,authenticated})=>{
  const classes = useStyles();

    return (
      <Container className={classes.container} maxWidth="xs">
        <h2 className="MuiTypography-h6">
            Complete the following form to create a new account.
        </h2>

        <form className={classes.form} onSubmit={requestCreateUserAccount}>
            <TextField 
              variant="outlined" 
              margin="normal"
              fullWidth
              label="Username" 
              name="username" 
              placeholder="username"
              autoFocus
              required />

            <TextField 
              variant="outlined" 
              margin="normal"
              fullWidth
              label="password" 
              name="password" 
              placeholder="password"
              autoFocus
              required />

            {authenticated == actions.USERNAME_RESERVED ? <p>A user by that name already exists.</p> : null}
            <Button 
              variant="outlined" 
              color="primary" 
              type="submit"  
              className= {classes.submit}
              fullWidth >Sign Up </Button>
        </form>

      </Container>
    )
};

const mapStateToProps = state=>({
    authenticated:state.session.authenticated
});

const mapDispatchToProps = (dispatch)=>({
    requestCreateUserAccount(e){
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        console.log("Creating!",username,password);
        dispatch(actions.requestCreateUser(username,password));
    }
})

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);