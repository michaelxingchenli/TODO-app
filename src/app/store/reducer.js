import { combineReducers } from 'redux';
import * as actions from './actions';

let defaultState = {
  session: {},
  tasks: [],
  comments: [],
  groups: [],
  users: [],
};

export const reducer = combineReducers({
  session(userSession = defaultState.session || {}, action) {
      let {type, authenticated, session} = action;
      switch (type) {
          case actions.SET_STATE:
              return {...userSession, id:action.state.session.id}
          case actions.REQUEST_AUTHENTICATE_USER:
              return {...userSession, authenticated: actions.AUTHENTICATING}
          case actions.PROCESSING_AUTHENTICATE_USER:
              return {...userSession, authenticated}
          default: 
              return userSession;
      }
  },
  tasks: (tasks = defaultState.tasks, action) => {
      switch(action.type) {
          case actions.SET_STATE:
              return action.state.tasks;
          case actions.CREATE_TASK:
              //console.log(action);
              return [...tasks, {
                  id: action.taskID,
                  name: "New Task",
                  group: action.groupID,
                  owner: action.ownerID,
                  isComplete: false
              }]
          case actions.SET_TASK_COMPLETE:
              return tasks.map(task=>{
                  return (task.id === action.taskID) ? 
                  {...task, isComplete:action.isComplete} : 
                  task;
              });
          case actions.SET_TASK_NAME:
              return tasks.map(task=>{
                  return (task.id === action.taskID) ? 
                  {...task, name:action.name} : 
                  task;
              });
          case actions.SET_TASK_GROUP:
              return tasks.map(task=>{
                  return (task.id === action.taskID) ? 
                  {...task, group:action.groupID} : 
                  task;
              });
      }
      return tasks;
  },
  comments: (comments = defaultState.comments, action) => {
    switch(action.type) {
      case actions.ADD_TASK_COMMENT:
        return [...comments, {
          owner: action.ownerID,
          id: action.commentID,
          task: action.taskID,
          content: action.content
        }];  
      case actions.SET_STATE:
        console.log(action.state);
        return action.state.comments;
    }      
    return comments;
  },
  groups: (groups = defaultState.groups, action) => {
      switch (action.type) {
          case actions.SET_STATE:
              return action.state.groups;
      }
      return groups;
  },
  users: (users = defaultState.users, action) => {
    switch (action.type) {
      case actions.SET_STATE:
          return action.state.users;
    }
    return users;
  }
})