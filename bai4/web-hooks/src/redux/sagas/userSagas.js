import { call, all, takeEvery } from "redux-saga/effects";
import { updateUserAPI } from "api/user";
import { UPDATE_USER } from "../types/userTypes";


function* onUpdateUser(action){
    try {
        const notice = yield call(updateUserAPI,action.payload.data);
        return action.payload.callback(notice.data);
      } catch (error) {
        return action.payload.callback(null);
      }
}

export function* userSagas() {
    yield all([
      takeEvery(UPDATE_USER, onUpdateUser),
    ]);
  }