import { loginAPI, registerAPI, getProfileAPI } from "api/auth";
import {
  key,
  SET_USERLOGIN,
  SET_TOKEN,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,   
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT_USER,
  GET_USER_PROFILE,
} from "../types/authtypes";


export const handleSetUserLogin = (userLogin) => ({
  type: SET_USERLOGIN,
  payload: userLogin,
});

export const handleSetToken = (token) => ({
  type: SET_TOKEN,
  payload: {key, token: token}
})

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });

    try {
      const login = await loginAPI(data);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: {key, token: login.data }});
      return login.data;
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data });
      return null;
    }
  };
};

export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER });

    try {
      const register = await registerAPI(data);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: register.data });
      return register.data;
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAILURE, payload: error.response.data });
    }
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: key,
});

export const handleGetUserProfile = () => {
  return async (dispatch) => {
    try {
      const users = await getProfileAPI();
      return users.data;
    } catch (error) {
      return error.response.data;
    }
  };
};

export const getUserProfile = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_PROFILE });

    try {
      const userLogin = await getProfileAPI();
      if (userLogin.data) {
        dispatch({ type: SET_USERLOGIN, payload: userLogin.data });
      } else {
        dispatch({ type: LOGOUT_USER, payload: key });
      }
    } catch (error) {
      dispatch({ type: LOGOUT_USER, payload: key });
    }
  };
};
