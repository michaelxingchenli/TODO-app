export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATING = 'AUTHENTICATING';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const SET_STATE = 'SET_STATE';
export const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_CREATE_USER = `REQUEST_CREATE_USER`;

export const requestTaskCreation = (groupID, ownerID)=>({
    type:REQUEST_TASK_CREATION,
    groupID,
    ownerID
});

export const createTask = (taskID, groupID, ownerID)=> ({
    type: CREATE_TASK,
    taskID,
    groupID,
    ownerID
});

export const addTaskComment = (commentID, taskID, ownerID, content) => ({
    type: ADD_TASK_COMMENT,
    id: commentID,
    task: taskID,
    owner: ownerID,
    content
})

export const setTaskCompletion = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskID: id,
    isComplete
});

export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskID: id,
    name
});

export const setTaskGroup = (id, groupID) => ({
    type: SET_TASK_GROUP,
    taskID: id,
    groupID
});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
}); 

export const requestCreateUser = (username,password)=>({
    type:REQUEST_CREATE_USER,
    username,
    password
});