import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../types/messageTypes";
import { getMessagesAPI, addNewMessageAPI } from "@/api/message";

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getMessagesAPI(id);
      return res.data;
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);
export const addNewMessage = createAsyncThunk(
  "message/addNewMessage",
  async (body: Message, { rejectWithValue }) => {
    try {
      const res = await addNewMessageAPI(body);
      return res.data;
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);
