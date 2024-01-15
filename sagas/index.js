import { indexWatcher } from "./index.saga";
import { all, take, select } from "redux-saga/effects";

//quan sát toàn bộ các action
const watchAndLog = function* () {
  while (true) {
    const action = yield take("*");
    const state = yield select();
    //console.log('action', action);
  }
};

const rootSaga = function* () {
  yield all([
    watchAndLog(), 
    indexWatcher(), 
  ]);
};

export default rootSaga;