import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList} from './TaskList';

import { makeStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export const Dashboard = ({groups}) => {
    const classes = useStyles();

    return (    
        <div className={classes.container}>
            <h2>Dashboard</h2>
            <Grid container spacing={5} direction="row">
                {groups.map(group=>(
                    <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
                ))}
            </Grid>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        groups:state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard)