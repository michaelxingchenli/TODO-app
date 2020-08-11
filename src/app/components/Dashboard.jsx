import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList} from './TaskList';

import { Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    body: {
        textAlign: 'center',
    }
}));

export const Dashboard = ({groups}) => {
    const classes = useStyles();

    return (    
        <Container className={classes.container}>
            <h2>Dashboard</h2>

            <Grid className={classes.body} container spacing={5} direction="row">
                {groups.map(group=>(
                    <ConnectedTaskList key={group.id} groupID={group.id} ownerID={group.owner} name={group.name} />
                ))}
            </Grid>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        groups:state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps) (Dashboard)