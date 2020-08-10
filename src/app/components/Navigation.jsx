import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { ConnectedUsername } from './Username'
import * as actions from '../store/actions'

import {Typography, Container} from '@material-ui/core';


const Navigation = ({id, authenticated}) => (
    <Container>
        <Link to="/dashboard">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            TODO
        </Typography>
        </Link>

        { authenticated ? 
        (<Typography component="h3" variant="h6" color="primary" gutterBottom>
            Welcome, <ConnectedUsername id={id} />
        </Typography>)
            : null }
    </Container>
);

const mapStateToProps = ({session})=>({
    id:session.id,
    authenticated:session.authenticated == actions.AUTHENTICATED
});

export const ConnectedNavigation = connect (mapStateToProps) (Navigation);