import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import uuid from 'uuid'

import * as actions from '../store/actions'
import {ConnectedUsername} from './Username'

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, Input, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },

  comments: {
    background: '#f5f6f5',
  },
}));

const TaskComments = ({
  id,
  comments,
  sessionID,  

  addTaskComment
}) => {
  const classes = useStyles();

  return (
    <div className={classes.comments}>
      <Divider />
      <Container className={classes.container}>
        <h3 className="title">Conversation</h3>
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
      </Container>
    </div>
  )
}
//<Container className={classes.container}></Container>
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.id;
  let comments= state.comments.filter(comment=>comment.task === id);

  return {
    id,
    comments,
    sessionID: state.session.id
  } 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {    
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

export const ConnectedTaskComments = connect(mapStateToProps, mapDispatchToProps) (TaskComments)

