import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authreducer";
import groupReducer from "./reducers/groupreducer";
import messageReducer from "./reducers/messagereducer";

const rootReducer = combineReducers({
  authReducer,
  groupReducer,
  messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
