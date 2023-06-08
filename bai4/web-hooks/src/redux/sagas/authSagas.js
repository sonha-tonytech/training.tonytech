import { call, put, all, takeEvery } from "redux-saga/effects";
import { loginAPI, registerAPI, getProfileAPI } from "api/auth";
import {
  key,
  SET_USERLOGIN,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT_USER,
  GET_USER_PROFILE,
} from "../types/authTypes";

function* onUserLogin(action) {
  try {
    const login = yield call(loginAPI, action.payload.data);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: { key, token: login.data },
    });
    action.payload.callback(login.data);
  } catch (error) {
    yield put({ type: LOGIN_USER_FAILURE, payload: error.response.data });
    action.payload.callback(null);
  }
}

function* onRegisterUser(action) {
  try {
    const register = yield call(registerAPI, action.payload.data);
    yield put({ type: REGISTER_USER_SUCCESS, payload: register.data });
    action.payload.callback(register.data);
  } catch (error) {
    yield put({ type: REGISTER_USER_FAILURE, payload: error.response.data });
    return null;
  }
}

function* onGetUserProfile() {
  try {
    const userLogin = yield call(getProfileAPI);
    if (userLogin.data) {
      yield put({ type: SET_USERLOGIN, payload: userLogin.data });
    } else {
      yield put({ type: LOGOUT_USER, payload: key });
    }
  } catch (error) {
    yield put({ type: LOGOUT_USER, payload: key });
  }
}

export function* authSagas() {
  yield all([
    takeEvery(LOGIN_USER, onUserLogin),
    takeEvery(REGISTER_USER, onRegisterUser),
    takeEvery(GET_USER_PROFILE, onGetUserProfile),
  ]);
}
