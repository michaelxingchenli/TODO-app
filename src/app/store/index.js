import { createStore, applyMiddleware } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducer'
import * as sagas from './sagas';
//import * as sagas from './sagas.mock';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore (
    reducer,
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}
