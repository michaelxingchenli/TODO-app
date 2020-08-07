import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/actions'
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, Card, CardContent, List, ListItem, ListItemText } from '@material-ui/core';

export const TaskList = ({tasks, name, id, createNewTask}) => (
    <Grid container item xs={4} spacing={3} direction="column">
        <Card variant="outlined">
            <CardContent>
                <h3>{name}</h3>                
                <List>             
                    {tasks.map(task=>(
                        <ListItem key={task.id}>
                            <Link to={`/task/${task.id}`}>
                                <ListItemText primary={task.name} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" color="primary" onClick={ ()=>createNewTask(id)}>Add New</Button>
            </CardContent>
        </Card>
    </Grid>    
)

const mapStateToProps = (state, ownProps) => {
    let groupID = ownProps.id;
    return {
        name:ownProps.name,
        id: groupID,
        tasks: state.tasks.filter(task=>task.group === groupID)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTask (id) {
            console.log("Creating new task...", id);
            dispatch(requestTaskCreation(id));
        }
    }
}


export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);

