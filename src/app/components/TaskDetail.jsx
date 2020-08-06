import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import * as mutations from '../store/mutations'

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Input, MenuItem, Typography, Card, CardContent, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskName,
  setTaskGroup
}) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Input 
          onChange={setTaskName} 
          value={task.name}
          variant="outlined" 
          fullWidth
        />
       
      </div>
      <Button 
        variant="contained" 
        color={isComplete ? "default" : "primary"}
        onClick={()=> setTaskCompletion(id,  !isComplete)}>
          {isComplete ? 'Reopen': 'Complete'}
      </Button>
  
      <TextField
        select
        label="Select"
        value={task.group}
        onChange={setTaskGroup}
        variant="outlined"
      >
        {groups.map(group=>(
          <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
        ))}
      </TextField>
  
      <Link to="/dashboard">
        <Button variant="contained" color="primary">Done </Button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task=>task.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete
  } 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete))
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value))
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value))
    }
  }
}

export const ConnectTaskDetail = connect(mapStateToProps, mapDispatchToProps) (TaskDetail)

