import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomReducer from "./reducers/roomReducer";
import messageReducer from "./reducers/messageReducer";

const rootReducer = combineReducers({
  roomReducer: roomReducer,
  messageReducer: messageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
