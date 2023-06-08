import { fork, all } from "redux-saga/effects";
import { authSagas } from "./authSagas";
import { groupSagas } from "./groupSagas";
import { userSagas } from "./userSagas";
import { messageSagas } from "./messageSagas";

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(groupSagas),
    fork(userSagas),
    fork(messageSagas),
  ]);
}
