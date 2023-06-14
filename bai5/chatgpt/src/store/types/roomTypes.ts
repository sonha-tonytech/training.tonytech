export interface Room {
  _id?: string;
  name?: string;
}

export interface RoomState {
  rooms: Room[];
  room: Room;
}
