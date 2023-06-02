import {
  getGroupsAPI,
  getGroupByIdAPI,
  addNewGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
  addUserInGroupAPI,
} from "api/group";

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

export const handleSetGroups = (groups) => ({
  type: SET_GROUP,
  payload: groups,
});

export const getAllGroups = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_GROUPS });

    try {
      const groups = await getGroupsAPI();
      if (groups.data){
        dispatch({ type: GET_ALL_GROUP_SUCCESS, payload: groups.data });
      }
    } catch (error) {
      dispatch({ type: GET_ALL_GROUP_FAILURE, payload: error.response.data });
    }
  };
};

export const getGroupById = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_GROUP_BY_ID });

    try {
      const group = await getGroupByIdAPI(id);
      if (typeof group.data === "object") {
        return group.data;
      }
      return null;
    } catch (error) {
      return error.response.data;
    }
  };
};

export const addNewGroup = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_GROUP });

    try {
      const newGroup = await addNewGroupAPI({ name: data });
      if (newGroup.data) {
        dispatch({ type: ADD_NEW_GROUP_SUCCESS, payload: newGroup.data });
      }
      return newGroup.data;
    } catch (error) {
      dispatch({ type: ADD_NEW_GROUP_FAILURE, payload: error.response.data });
      return null;
    }
  };
};

export const updateGroup = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_GROUP });

    try {
      const notice = await updateGroupAPI(data);
      if (notice.data === "Success") {
        dispatch({ type: UPDATE_GROUP_SUCCESS, payload: data });
        return true;
      } 
      return false;
    } catch (error) {
      dispatch({ type: UPDATE_GROUP_FAILURE, payload: error.response.data });
      return false;
    }
  };
};

export const deleteGroup = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_GROUP }); 

    try {
      const notice = await deleteGroupAPI(id);
      if (notice.data === "Success") {
        dispatch({ type: DELETE_GROUP_SUCCESS, payload: id });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: DELETE_GROUP_FAILURE, payload: error.response.data });
      return false;
    }
  };
};

export const addUserInGroup = (idGroup, userName) => {
  return async (dispatch) => {
    dispatch({ type: ADD_USER_IN_GROUP });

    try {
      const user = await addUserInGroupAPI(idGroup, { userName: userName });
      if (user.data) {
        dispatch({
          type: ADD_USER_IN_GROUP_SUCCESS,
          payload: { idGroup, user: user.data },
        });
      }
      return user.data;
    } catch (error) {
      dispatch({  
        type: ADD_USER_IN_GROUP_FAILURE,
        payload: error.response.data,
      });
      return null;
    }
  };
};
