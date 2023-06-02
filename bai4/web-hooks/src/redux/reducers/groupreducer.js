import {
  SET_GROUP,
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
} from "../types/grouptypes";

const initialState = {
  groups: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP:
      return { groups: action.payload };

    case GET_ALL_GROUPS:
      return state;

    case GET_ALL_GROUP_SUCCESS:
      return { groups: action.payload };

    case GET_ALL_GROUP_FAILURE:
      return state;

    case GET_GROUP_BY_ID:
      return state;

    case ADD_NEW_GROUP:
      return state;

    case ADD_NEW_GROUP_SUCCESS:
      return { groups: state.groups.concat(action.payload) };

    case ADD_NEW_GROUP_FAILURE:
      return state;

    case UPDATE_GROUP:
      return state;

    case UPDATE_GROUP_SUCCESS:
      const updateGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload._id
      );
      const newUpdatedGroups = [...state.groups];
      newUpdatedGroups.splice(updateGroupIndex, 1, action.payload);
      return { groups: newUpdatedGroups };

    case UPDATE_GROUP_FAILURE:
      return state;

    case DELETE_GROUP:
      return state;
    case DELETE_GROUP_SUCCESS:
      const deleteGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload
      );
      const newDeletedGroups = [...state.groups];
      newDeletedGroups.splice(deleteGroupIndex, 1);
      return { groups: newDeletedGroups };

    case DELETE_GROUP_FAILURE:
      return state;

    case ADD_USER_IN_GROUP:
      return state;

    case ADD_USER_IN_GROUP_SUCCESS:
      const updatedGroup = state.groups.find(
        (group) => group._id === action.payload.idGroup
      );
      updatedGroup.members.push(action.payload.user);
      const updatedGroupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.idGroup
      );
      const newGroups = [...state.groups];
      newGroups.splice(updatedGroupIndex, 1, updatedGroup);
      return { groups: newGroups };

    case ADD_USER_IN_GROUP_FAILURE:
      return state;

    default:
      return state;
  }
};


export default groupReducer;
