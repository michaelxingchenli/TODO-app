import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions'

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

const LoginComponent = ({authenticateUser, authenticated}) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="xs">
      <h2 className="MuiTypography-h3">Please Login</h2>
      <form className={classes.form} onSubmit={authenticateUser}>
        <TextField 
          variant="outlined" 
          margin="normal"
          fullWidth
          label="Username" 
          name="username" 
          placeholder="username" 
          defaultValue="Dev"
          autoFocus
          required />
        <TextField 
          variant="outlined" 
          margin="normal" 
          fullWidth
          label="Password"
          name="password" 
          placeholder="password"
          required />
        {authenticated === actions.NOT_AUTHENTICATED ? <p> Login incorrect</p> : null
        }
        <Button 
          variant="outlined" 
          color="primary" 
          type="submit"  
          className= {classes.submit}
          fullWidth >Login </Button>
        <Grid container>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </form>
    </Container>
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
      dispatch(actions.requestAuthenticateUser(username, password)); 
    }
  });
}


export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps) (LoginComponent);