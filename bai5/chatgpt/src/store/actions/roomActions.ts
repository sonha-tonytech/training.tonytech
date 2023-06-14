import { createAsyncThunk } from "@reduxjs/toolkit";
import { Room } from "../types/roomTypes";
import { getRoomsAPI, addNewRoomAPI } from "@/api/room";


export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRoomsAPI();
      return res.data;
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const addNewRoom = createAsyncThunk(
  "room/addNewRoom",
  async (body: Room, { rejectWithValue }) => {
    try {
      const res:any  = await addNewRoomAPI(body);
      return res.data;
    } catch (error: any) {
      if (error.name === "AxiosError") {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);
