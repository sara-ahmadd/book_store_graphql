import { model, Schema, Types } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
});

export const BookModel = model("book", BookSchema);
