import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  passWord: string;
  name: string;
  role: string;
  isActived: boolean;
}

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
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

const User = model<IUser>("User", UserSchema);

export default User;
