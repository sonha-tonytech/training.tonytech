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


//sync function
export const handleSetMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});


//async function
export const getMessageById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_MESSAGE_BY_ID });

    try {
      const message = await getMessageByIdAPI(id);
      return message.data;
    } catch (error) {
      return error.response.data;
    }
  };
};

export const getMessagesByGroupId = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_MESSAGES_BY_GROUP_ID });

    try {
      const messages = await getMessagesByGroupIdAPI(id);
      dispatch({
        type: GET_MESSAGES_BY_GROUP_ID_SUCCESS,
        payload: messages.data,
      });
    } catch (error) {
      dispatch({
        type: GET_MESSAGES_BY_GROUP_ID_FAILURE,
        payload: error.response.data,
      });
    }
  };
};

export const addNewMessage = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_MESSAGE });

    try {
      const newMessage = await addNewMessageAPI(data);
      if (Object.values(newMessage.data).length > 0) {
        dispatch({ type: ADD_NEW_MESSAGE_SUCCESS, payload: newMessage.data });
      }
    } catch (error) {
      dispatch({ type: ADD_NEW_MESSAGE_FAILURE, payload: error.response.data });
    }
  };
};

export const updateMessage = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MESSAGE });

    try {
      const notice = await updateMessageAPI(data);
      if (notice === "Success") {
        dispatch({ type: UPDATE_MESSAGE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: UPDATE_MESSAGE_FAILURE, payload: error.response.data });
    }
  };
};

export const deleteMessage = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MESSAGE });

    try {
      const notice = await deleteMessageAPI(id);
      if (notice.data === "Success") {
        dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: id });
      }
    } catch (error) {
      dispatch({ type: DELETE_MESSAGE_FAILURE, payload: error.response.data });
    }
  };
};
