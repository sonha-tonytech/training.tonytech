import {
  key,
  SET_USERLOGIN,
  SET_TOKEN,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER_PROFILE,
} from "../types/authTypes";

export const handleSetUserLogin = (userLogin) => ({
  type: SET_USERLOGIN,
  payload: userLogin,
});

export const handleSetToken = (token) => ({
  type: SET_TOKEN,
  payload: { key, token: token },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
  payload: key,
});


// ASYNC actions

export const loginUser = (data, callback) => ({
  type: LOGIN_USER,
  payload: { data, callback },
});

export const registerUser = (data, callback) => ({
  type: REGISTER_USER,
  payload: { data, callback },
});


export const getUserProfile = () => ({ type: GET_USER_PROFILE });
