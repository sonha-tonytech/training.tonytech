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
} from "../types/messagetypes";

const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { messages: action.payload };

    case GET_MESSAGE_BY_ID:
      return state;

    case GET_MESSAGES_BY_GROUP_ID:
      return state;

    case GET_MESSAGES_BY_GROUP_ID_SUCCESS:
      return { messages: action.payload };

    case GET_MESSAGES_BY_GROUP_ID_FAILURE:
      return state;

    case ADD_NEW_MESSAGE:
      return state;

    case ADD_NEW_MESSAGE_SUCCESS:
      return { messages: state.messages.concat(action.payload) };

    case ADD_NEW_MESSAGE_FAILURE:
      return state;

    case UPDATE_MESSAGE:
      return state;

    case UPDATE_MESSAGE_SUCCESS:
      const updatedMessageIndex = state.messages.findIndex(
        (message) => message._id === action.payload._id
      );
      const newUpdatedMessages = [...state.messages];
      newUpdatedMessages.splice(updatedMessageIndex, 1, action.payload);
      return { messages: newUpdatedMessages };

    case UPDATE_MESSAGE_FAILURE:
      return state;

    case DELETE_MESSAGE:
      return state;

    case DELETE_MESSAGE_SUCCESS:
      const deletedMessageIndex = state.messages.findIndex(
        (message) => message._id === action.payload
      );
      const newDeletedMessages = [...state.messages];
      newDeletedMessages.splice(deletedMessageIndex, 1);
      return { messages: newDeletedMessages };

    case DELETE_MESSAGE_FAILURE:
      return state;

    default:
      return state;
  }
};

export default messageReducer;
