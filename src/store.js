import {combineReducers, applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import PostReducer from './screens/posts/store/PostReducer';
import PostSaga from './screens/posts/store/PostSaga';

const reducers = combineReducers({post: PostReducer});
const sagas = [PostSaga];

const sagaMiddleware = createSagaMiddleware();

// Add Redux DevTools extension
const composeEnhancers =
  (__DEV__ &&
    global.window &&
    global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

sagaMiddleware.run(rootSaga);

export default store;
