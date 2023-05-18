import { model, Schema, Document } from "mongoose";

export interface IMessage extends Document {
  group_id: string;
  user_id: string;
  message: string;
  createdAt: Date;
  isActived: boolean;
}

export const MessageSchema = new Schema({
  group_id: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isActived: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true
});

const Message = model<IMessage>("Message", MessageSchema);

export default Message;
