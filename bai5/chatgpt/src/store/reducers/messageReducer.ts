import { createSlice } from "@reduxjs/toolkit";
import { getMessages,addNewMessage } from "../actions/messageActions";
import { MessageState } from "../types/messageTypes";

const initialState: MessageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMessages.fulfilled, (state, action) => {        
      state.messages = action.payload;
    });
    builder.addCase(addNewMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export default messageSlice.reducer;