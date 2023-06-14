import { LOGIN_USER, REGISTER_USER } from "../types/authTypes";

const authMiddleware = (store) => (next) => {

  let socket = 2;

  return (action) => {
    if (action === (LOGIN_USER || REGISTER_USER)) {
      next(action);
    }
    //   console.log(action);
    //   console.log(store.getState().authReducer.token);
    next(action);
  };
};

const middleware = [authMiddleware];

export default middleware;

