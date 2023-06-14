import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRooms, addNewRoom } from "../actions/roomActions";
import { Room, RoomState } from "../types/roomTypes";

const initialState: RoomState = {
  rooms: [],
  room:{}
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setSelectedRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getRooms.fulfilled, (state, action) => {                
      state.rooms = action.payload;
    });
    builder.addCase(addNewRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
      state.room = action.payload;
    });
  },
});

export const {setSelectedRoom} = roomSlice.actions
export default roomSlice.reducer;