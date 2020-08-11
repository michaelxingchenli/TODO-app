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

export function* userAuthenticationSaga(){
    while (true){
        const {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        yield delay(250);
        yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
            id:"U1",
            token:"ABCD-1234",
        }));

        history.push(`/dashboard`)
    }
}