import { Schema, Types, model } from "mongoose";

const LibSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  books: [{ type: Types.ObjectId, ref: "book" }],
});

export const LibraryModel = model("library", LibSchema);
