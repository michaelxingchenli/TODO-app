import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import uuid from 'uuid'

import * as actions from '../store/actions'
import {ConnectedUsername} from './Username'

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Input, MenuItem, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    padding: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(3),
  }
  
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
    <Container className={classes.container}>
      <div className={classes.control}>
        {isOwner ? 
          <span>
            you are the owner of this task.
            
            <Button 
              variant="contained" 
              color={isComplete ? "default" : "primary"}
              onClick={()=> setTaskCompletion(id,  !isComplete)}>
                {isComplete ? 'Reopen': 'Complete'}
            </Button>
          </span>
          : 
        <span><ConnectedUsername id={task.owner}/> is the owner of this task.</span>
        }


        <TextField
        select
        label="group"
        value={task.group}
        onChange={setTaskGroup}
        variant="outlined"
      >
        {groups.map(group=>(
          <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
        ))}
      </TextField>
      </div>
      
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

      <div className="comments">
        <h4 className="title">Comments</h4>
        {comments.map(comment=>(
            <div key={comment.id}>
                <h4><ConnectedUsername id={comment.owner}/> : </h4>
                <p>{comment.content}</p>
            </div>
        ))}      
  
        <form className="form-inline" onSubmit={(e)=>addTaskComment(id,sessionID,e)}>
            <Input type="text" name="commentContents" autoComplete="off" placeholder="Add a comment" className="form-control"/>
            <Button 
              variant="outlined" 
              color="primary" 
              type="submit" 
              className="btn">
                Comment
            </Button>
        </form>
      </div>

      <Link to="/dashboard">
        <Button variant="contained" color="primary">Done </Button>
      </Link>
    </Container>
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

