import { model, Schema, Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  type: string;
  owner: string;
  members: Array<{ user_id: string }>;
  isActived: boolean;
}

export const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  isActived: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true
});

const Group = model<IGroup>("Group", GroupSchema);

export default Group;
