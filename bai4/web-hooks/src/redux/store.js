import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import authReducer from "./reducers/authReducer";
import groupReducer from "./reducers/groupReducer";
import messageReducer from "./reducers/messageReducer";

import customMiddleware from "redux/middleware/authMiddlewares";

// const rootReducer = combineReducers({
//   authReducer,
//   groupReducer,
//   messageReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  authReducer,
  groupReducer,
  messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware,...customMiddleware));
sagaMiddleware.run(rootSaga);


export default store;
