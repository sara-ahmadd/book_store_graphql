import { Schema, Types, model } from "mongoose";

const BorrowedBookSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowedAt: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
});

export const BorrowedBookModel = model("borrowedBook", BorrowedBookSchema);
