import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-expo-dev-plugin';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  // @ts-ignore
  composeWithDevTools(applyMiddleware(sagaMiddleware)) 
)

sagaMiddleware.run(rootSaga)

export default store
