import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import uuid from 'uuid'

import * as actions from '../store/actions'
import {ConnectedUsername} from './Username'

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
  groups,
  isOwner,
  isComplete,
  sessionID,  

  setTaskCompletion,
  setTaskName,
  setTaskGroup,
  addTaskComment
}) => {
  const classes = useStyles();

  return (
    <div>
      {isOwner ?
        (<div>
          <Input 
            onChange={setTaskName} 
            value={task.name}
            variant="outlined" 
            fullWidth
          /> 
        </div>) 
        :
        (<h3> {task.name}  {isComplete ? '✓' : null}</h3>)
      }

      {isOwner ? 
        <div>
          you are the owner of this task.
          <Button 
            variant="contained" 
            color={isComplete ? "default" : "primary"}
            onClick={()=> setTaskCompletion(id,  !isComplete)}>
              {isComplete ? 'Reopen': 'Complete'}
          </Button>
        </div>
        : 
      <div><ConnectedUsername id={task.owner}/> is the owner of this task.</div>
      }
  
      <div className="comments">
          {comments.map(comment=>(
              <div key={comment.id}>
                  <ConnectedUsername id={comment.owner}/> : {comment.content}
              </div>
          ))}
      </div>

      <TextField
        select
        label="Update group"
        value={task.group}
        onChange={setTaskGroup}
        variant="outlined"
      >
        {groups.map(group=>(
          <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
        ))}
      </TextField>
  
      <form className="form-inline" onSubmit={(e)=>addTaskComment(id,sessionID,e)}>
          <input type="text" name="commentContents" autoComplete="off" placeholder="Add a comment" className="form-control"/>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            className="btn">
              Submit
          </Button>
      </form>

  
      <Link to="/dashboard">
        <Button variant="contained" color="primary">Done </Button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task=>task.id === id);
  let comments= state.comments.filter(comment=>comment.task === id);
  let isOwner = state.session.id === task.owner;
  let groups = state.groups;

  return {
    id,
    comments,
    task,    
    groups,    
    isOwner,
    isComplete: task.isComplete,
    sessionID: state.session.id
  } 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(actions.setTaskCompletion(id, isComplete))
    },
    setTaskGroup(e) {
      dispatch(actions.setTaskGroup(id, e.target.value))
    },
    setTaskName(e) {
      dispatch(actions.setTaskName(id, e.target.value))
    },
    addTaskComment(taskID, ownerID, e) {
      e.preventDefault();
      let input = e.target['commentContents'];
      let commentID = uuid();
      let content = input.value;
      if (content !== '') {
        input.value = '';
        dispatch(actions.addTaskComment(commentID, taskID, ownerID, content));
      }      
    }
  }
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps) (TaskDetail)

