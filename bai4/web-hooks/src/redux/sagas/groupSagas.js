import { call, put, all, takeEvery } from "redux-saga/effects";
import {
  getGroupsAPI,
  getGroupByIdAPI,
  addNewGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
  addUserInGroupAPI,
} from "api/group";

import {
  GET_ALL_GROUPS,
  GET_ALL_GROUP_SUCCESS,
  GET_ALL_GROUP_FAILURE,
  GET_GROUP_BY_ID,
  ADD_NEW_GROUP,
  ADD_NEW_GROUP_SUCCESS,
  ADD_NEW_GROUP_FAILURE,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAILURE,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
  ADD_USER_IN_GROUP,
  ADD_USER_IN_GROUP_SUCCESS,
  ADD_USER_IN_GROUP_FAILURE,
  SET_CALLBACK_VALUE,
} from "../types/groupTypes";

function* onGetAllGroups() {
  try {
    const groups = yield call(getGroupsAPI);
    if (groups.data) {
      yield put({ type: GET_ALL_GROUP_SUCCESS, payload: groups.data });
    }
  } catch (error) {
    yield put({ type: GET_ALL_GROUP_FAILURE, payload: error.response.data });
  }
}

function* onGetGroupById(action) {
  try {
    const group = yield call(getGroupByIdAPI, action.payload.id);
    if (typeof group.data === "object") {
      return action.payload.callback(group.data);
    }
    action.payload.callback(null);
  } catch (error) {
    action.payload.callback(null);
  }
}

function* onAddNewGroups(action) {
  try {
    const newGroup = yield call(addNewGroupAPI, action.payload);
    if (newGroup.data) {
      yield put({ type: ADD_NEW_GROUP_SUCCESS, payload: newGroup.data });
    }
  } catch (error) {
    yield put({ type: ADD_NEW_GROUP_FAILURE, payload: error.response.data });
  }
}

function* onUpdateGroup(action) {
  try {
    const notice = yield call(updateGroupAPI, action.payload.data);
    if (notice.data === "Success") {
      yield put({ type: UPDATE_GROUP_SUCCESS, payload: action.payload.data });
    }
  } catch (error) {
    yield put({ type: UPDATE_GROUP_FAILURE, payload: error.response.data });
  }
}

function* onDeleteGroup(action) {
  try {
    const notice = yield call(deleteGroupAPI, action.payload.id);
    if (notice.data === "Success") {
      yield put({ type: DELETE_GROUP_SUCCESS, payload: action.payload.id });
      return action.payload.callback(true);
    }
    return action.payload.callback(false);
  } catch (error) {
    yield put({ type: DELETE_GROUP_FAILURE, payload: error.response.data });
    return action.payload.callback(false);
  }
}

function* onAddUserInGroup(action) {
  try {
    const user = yield addUserInGroupAPI(action.payload.idGroup, {
      userName: action.payload.userName,
    });
    if (typeof user.data === "object") {
      yield put({
        type: ADD_USER_IN_GROUP_SUCCESS,
        payload: { idGroup: action.payload.idGroup, user: user.data },
      });
      yield put({ type: SET_CALLBACK_VALUE, payload: null });
    } else {
      yield put({ type: SET_CALLBACK_VALUE, payload: user.data });
    }
    return action.payload.callback(user.data);
  } catch (error) {
    yield put({
      type: ADD_USER_IN_GROUP_FAILURE,
      payload: error.response.data,
    });
    return action.payload.callback(null);
  }
}

export function* groupSagas() {
  yield all([
    takeEvery(GET_ALL_GROUPS, onGetAllGroups),
    takeEvery(GET_GROUP_BY_ID, onGetGroupById),
    takeEvery(ADD_NEW_GROUP, onAddNewGroups),
    takeEvery(UPDATE_GROUP, onUpdateGroup),
    takeEvery(DELETE_GROUP, onDeleteGroup),
    takeEvery(ADD_USER_IN_GROUP, onAddUserInGroup),
  ]);
}
