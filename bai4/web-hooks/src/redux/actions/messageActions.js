import {
  SET_MESSAGES,
  GET_MESSAGE_BY_ID,
  GET_MESSAGES_BY_GROUP_ID,
  ADD_NEW_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from "../types/messageTypes";

export const handleSetMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const getMessageById = (id) => ({
  type: GET_MESSAGE_BY_ID,
  payload: id,
});

export const getMessagesByGroupId = (id) => ({
  type: GET_MESSAGES_BY_GROUP_ID,
  payload: id,
});

export const addNewMessage = (data) => ({
  type: ADD_NEW_MESSAGE,
  payload: data,
});

export const updateMessage = (data) => ({
  type: UPDATE_MESSAGE,
  payload: data,
});

export const deleteMessage = (id) => ({ type: DELETE_MESSAGE, payload: id });
