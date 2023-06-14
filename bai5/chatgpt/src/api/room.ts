import instance from "./axios";
import { Room } from "@/store/types/roomTypes";

export const getRoomsAPI = async () => {
  return await instance.get<Room[]>("/rooms");
};
export const addNewRoomAPI = async (data: Room) => {
  return await instance.post<Room>("/rooms", data);
};
