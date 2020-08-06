import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const Navigation = () => (
    <div>
        <Link to="/dashboard">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            TODO
        </Typography>
        </Link>
    </div>
);

export const ConnectedNavigation = connect (state=>state) (Navigation);