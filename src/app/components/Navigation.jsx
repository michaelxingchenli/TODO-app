import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { ConnectedUsername } from './Username'
import * as actions from '../store/actions'

import Typography from '@material-ui/core/Typography';


const Navigation = ({id, authenticated}) => (
    <div>
        <Link to="/dashboard">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            TODO
        </Typography>
        </Link>

        { authenticated ? 
        (<h3>
            Welcome, <ConnectedUsername id={id} />
        </h3>)
            : null }
    </div>
);

const mapStateToProps = ({session})=>({
    id:session.id,
    authenticated:session.authenticated == actions.AUTHENTICATED
});

export const ConnectedNavigation = connect (mapStateToProps) (Navigation);