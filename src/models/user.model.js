import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  borrowedBooks: [{ type: Types.ObjectId, ref: "Book" }],
  isActivated: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model("user", UserSchema);
