import { all } from 'redux-saga/effects';
import surveySaga from './survey';

function* rootSaga() {
  yield all([
    surveySaga(),
  ]);
}

export default rootSaga;
