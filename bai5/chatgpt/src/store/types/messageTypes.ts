export interface Message {
  _id?: string;
  room_id?: string;
  question?: string;
  answer?: string;
}

export interface MessageState {
  messages: Message[];
}
