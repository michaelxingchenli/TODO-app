import {
    take,
    put,
    select
} from 'redux-saga/effects'

import * as actions from './actions';
import uuid from 'uuid';

export function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(actions.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuid();
        yield put(actions.createTask(taskID, groupID, ownerID));
        console.log("Got group ID", groupID);
    }
}

