import { isAuthenticated } from "../../graphMiddleWares/isAuthenticated.js";
import { BookModel } from "../../models/book.model.js";
import { BorrowedBookModel } from "../../models/borrowedBook.model.js";
import { LibraryModel } from "../../models/library.model.js";
import { UserModel } from "../../models/user.model.js";
import { verifyToken } from "../../utils/token/token.js";
import { checkUser } from "../user/user.graph.services.js";

export const addNewBookGraphService = async (parent, args) => {
  //get book data from args
  const { title, genre, publishedYear, availableCopies, auth } = args;

  await isAuthenticated(args);
  const user = args.user;

  //check if same book already exists
  const book = await BookModel.findOne({ title });
  if (book) throw Error("Book already exists");

  const newBook = await BookModel.create({
    title,
    genre,
    author: user._id,
    publishedYear,
    availableCopies,
  });
  return {
    title: newBook.title,
    id: newBook.id,
  };
};

export const borrowBookGraphService = async (parent, args) => {
  try {
    //get book id
    const { bookId, auth } = args;
    //check if book exists
    const book = await BookModel.findById(bookId);
    if (!book || book.availableCopies == 0)
      throw new Error("book is not found");

    //get user id from auth
    await isAuthenticated(args);
    const user = args.user;

    await checkUser({ id: user._id, email: user.email });

    const currentTime = new Date();
    //add due date : after 2 days
    const dueDate = new Date(currentTime.getTime() + 2 * 24 * 60 * 60 * 1000);
    //create new borrowed book
    const newBorrowedBook = await BorrowedBookModel.create({
      bookId,
      userId: user._id,
      dueDate,
      borrowedAt: currentTime,
    });
    book.availableCopies -= 1;
    await book.save();
    const updatedBook = await BookModel.findById(bookId);
    return {
      message: "Book is borrowed successfully",
      statusCode: 201,
      id: newBorrowedBook.id,
      title: book.title,
      availableCopies: updatedBook.availableCopies,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const returnBookGraphService = async (parent, args) => {
  try {
    await isAuthenticated(args);
    const user = args.user;

    const { bookId } = args;
    //make a borrowed book available for borrowing
    const book = await BorrowedBookModel.findOne({
      userId: user._id,
      _id: bookId,
    });
    if (!book)
      throw new Error("book is not borrowed by this user or is not found");

    if (book.returned)
      return {
        message: "Book is already available for borrowing",
        statusCode: 200,
      };

    book.returned = true;
    await book.save();
    return {
      message: "Book is now available for borrowing again",
      statusCode: 200,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllBooksGraphService = async (parent, args) => {
  await isAuthenticated(args);
  const books = await BookModel.find();
  return books;
};

export const getBookByIdGraphService = async (parent, args) => {
  await isAuthenticated(args);
  const book = await BookModel.findById(args.id);
  if (!book) throw Error("book is not found");
  return book;
};

export const createLibraryGraphService = async (parent, args) => {
  await isAuthenticated(args);
  //check if any of ids is not found
  for (const book of args.books) {
    const checkBook = await BookModel.findById(book);
    if (!checkBook) {
      throw Error("on of provided books is not found");
    }
  }
  const library = await LibraryModel.create({
    name: args.name,
    location: args.location,
    books: args.books,
  });
  return "Library is created successfully";
};

export const getLibrariesGraphService = async (parent, args) => {
  try {
    await isAuthenticated(args);
    const libs = await LibraryModel.find().populate({
      path: "books",
      select: "title genre publishedYear author availableCopies",
    });

    return libs;
  } catch (error) {
    throw Error(error.message);
  }
};
