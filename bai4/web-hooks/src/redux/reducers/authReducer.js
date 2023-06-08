import { readCookie, saveCookie, removeCookie } from "utils/cookie";
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
} from "../types/authTypes";

const initialState = {
  token: readCookie(key),
  userLogin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERLOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    case SET_TOKEN:
      saveCookie(action.payload.key, action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGIN_USER:
      return state;
    case LOGIN_USER_SUCCESS:
      saveCookie(action.payload.key, action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        token: null,
      };
    case REGISTER_USER:
      return state;
    case REGISTER_USER_SUCCESS:
      return state;
    case REGISTER_USER_FAILURE:
      return state;
    case LOGOUT_USER:
      removeCookie(action.payload);
      return {
        token: null,
        userLogin: null,
      };
    case GET_USER_PROFILE:
      return state;
    default:
      return state;
  }
};

export default authReducer;
