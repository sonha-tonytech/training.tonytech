import {
  SET_GROUP,
  GET_ALL_GROUPS,
  GET_GROUP_BY_ID,
  ADD_NEW_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  ADD_USER_IN_GROUP,
} from "../types/groupTypes";

export const handleSetGroups = (groups) => ({
  type: SET_GROUP,
  payload: groups,
});

export const getAllGroups = () => ({ type: GET_ALL_GROUPS });

export const getGroupById = (id, callback) => ({
  type: GET_GROUP_BY_ID,
  payload: { id, callback },
});

export const addNewGroup = (data) => ({
  type: ADD_NEW_GROUP,
  payload: { name: data },
});

export const updateGroup = (data) => ({
  type: UPDATE_GROUP,
  payload: {data},
});

export const deleteGroup = (id, callback) => ({
  type: DELETE_GROUP,
  payload: { id, callback },
});

export const addUserInGroup = (idGroup, userName, callback) => ({
  type: ADD_USER_IN_GROUP,
  payload: { idGroup, userName, callback },
});
