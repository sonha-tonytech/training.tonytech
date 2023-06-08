import { call, put, all, takeEvery } from "redux-saga/effects";

import {
  getMessageByIdAPI,
  getMessagesByGroupIdAPI,
  addNewMessageAPI,
  updateMessageAPI,
  deleteMessageAPI,
} from "api/message";

import {
  SET_MESSAGES,
  GET_MESSAGE_BY_ID,
  GET_MESSAGES_BY_GROUP_ID,
  GET_MESSAGES_BY_GROUP_ID_SUCCESS,
  GET_MESSAGES_BY_GROUP_ID_FAILURE,
  ADD_NEW_MESSAGE,
  ADD_NEW_MESSAGE_SUCCESS,
  ADD_NEW_MESSAGE_FAILURE,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_FAILURE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
} from "../types/messageTypes";

function* onGetMessageById(action) {
  try {
    const message = yield call(getMessageByIdAPI, action.payload);
    if (message.data) {
      yield put({
        type: GET_MESSAGES_BY_GROUP_ID_SUCCESS,
        payload: message.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_MESSAGES_BY_GROUP_ID_FAILURE,
      payload: error.response.data,
    });
  }
}

function* onGetMessagesByGroupId(action) {
  try {
    const messages = yield call(getMessagesByGroupIdAPI, action.payload);
    yield put({ type: SET_MESSAGES, payload: messages.data });
  } catch (error) {
    yield put({ type: SET_MESSAGES, payload: error.response.data });
  }
}

function* onAddNewMessage(action) {
  try {
    const newMessage = yield call(addNewMessageAPI, action.payload);
    if (Object.values(newMessage.data).length > 0) {
      yield put({ type: ADD_NEW_MESSAGE_SUCCESS, payload: newMessage.data });
    }
  } catch (error) {
    yield put({ type: ADD_NEW_MESSAGE_FAILURE, payload: error.response.data });
  }
}

function* onUpdateMessage(action) {
  try {
    const notice = yield call(updateMessageAPI, action.payload);
    if (notice.data === "Success") {
      yield put({ type: UPDATE_MESSAGE_SUCCESS, payload: action.payload });
    }
  } catch (error) {
    yield put({ type: UPDATE_MESSAGE_FAILURE, payload: error.response.data });
  }
}

function* onDeleteMessage(action) {
  try {
    const notice = yield call(deleteMessageAPI, action.payload);
    if (notice.data === "Success") {
      yield put({ type: DELETE_MESSAGE_SUCCESS, payload: action.payload });
    }
  } catch (error) {
    yield put({ type: DELETE_MESSAGE_FAILURE, payload: error.response.data });
  }
}

export function* messageSagas() {
  yield all([
    takeEvery(GET_MESSAGES_BY_GROUP_ID, onGetMessagesByGroupId),
    takeEvery(ADD_NEW_MESSAGE, onAddNewMessage),
    takeEvery(UPDATE_MESSAGE, onUpdateMessage),
    takeEvery(DELETE_MESSAGE, onDeleteMessage),
    takeEvery(GET_MESSAGE_BY_ID, onGetMessageById),
  ]);
}
