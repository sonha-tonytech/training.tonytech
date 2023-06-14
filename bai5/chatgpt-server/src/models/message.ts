import { model, Schema, Document } from "mongoose";

export interface IMessage extends Document {
  room_id: string;
  question: string;
  answer: string;
}

export const MessageSchema = new Schema({
    room_id: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Message = model<IMessage>("Message", MessageSchema);

export default Message;
