import { model, Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
}

export const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model<IRoom>("Room", GroupSchema);

export default Room;
