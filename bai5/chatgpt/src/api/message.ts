import instance from "./axios";
import { Message } from "@/store/types/messageTypes";

export const getMessagesAPI = async (id: string) => {
  return await instance.get<Message[]>(`/rooms/${id}/messages`);
};
export const addNewMessageAPI = async (data: Message) => {    
  return await instance.post<Message>("/messages", data);
};