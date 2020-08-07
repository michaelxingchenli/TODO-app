import {
  take,
  put,
  select
} from 'redux-saga/effects';

import uuid from 'uuid';
import axios from 'axios';
import * as actions from './actions';
import { history } from './history';

const url = process.env.NODE_ENV == 'production' ? '' : "http://localhost:8888";


export function* taskCreationSaga() {
  while (true) {
      const { groupID } = yield take(actions.REQUEST_TASK_CREATION);
      const ownerID = `U1`;
      const taskID = uuid();
      yield put(actions.createTask(taskID, groupID, ownerID));
      const { res } = yield axios.post(url + `/task/new`, {
        task: {
          id: taskID,
          group: groupID,
          owner: ownerID,
          isComplete: false,
          name: "New task"
        }
      });
      //console.log("Got response", res);
  }
}

export function* commentCreationSaga() {
  while(true) {
    const comment = yield take (actions.ADD_TASK_COMMENT)
    const { res } = yield axios.post(url + `/comment/new`, {
      comment
    });

  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      actions.SET_TASK_GROUP,
      actions.SET_TASK_NAME,
      actions.SET_TASK_COMPLETE
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete
      }
    });
  }
}

export function* userAuthenticationSaga() {
  while(true) {
    const {username, password} = yield take(actions.REQUEST_AUTHENTICATE_USER);
    try {
      const { data } = yield axios.post(url + '/authenticate', {username, password});
      if (!data) {
        throw new Error();
      }
      
      console.log('authenticated!', data);
      yield put(actions.setState(data.state));
      yield put(actions.processAuthenticateUser(actions.AUTHENTICATED));
      history.push('/dashboard');
   
    } catch (e) {
      console.log("Can't authenticate");
      yield put(actions.processAuthenticateUser(actions.NOT_AUTHENTICATED));
      
    }

  }
}