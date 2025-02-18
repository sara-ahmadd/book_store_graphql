import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  addNewBookGraphService,
  borrowBookGraphService,
  createLibraryGraphService,
  getAllBooksGraphService,
  getBookByIdGraphService,
  getLibrariesGraphService,
  returnBookGraphService,
} from "./book.graph.services.js";
import {
  addBookResponseType,
  BookType,
  borrowBookResponseType,
  createLibraryRequest,
  getLibrariesResponseType,
  returnBookResponseType,
} from "./book.graph.types.js";
import { verifyToken } from "../../utils/token/token.js";
import { UserModel } from "../../models/user.model.js";
import { BorrowedBookModel } from "../../models/borrowedBook.model.js";
import { BookModel } from "../../models/book.model.js";
import { isAuthenticated } from "../../graphMiddleWares/isAuthenticated.js";
import { LibraryModel } from "../../models/library.model.js";

export const bookGraphController = {
  addNewBook: {
    type: addBookResponseType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      genre: { type: GraphQLString },
      publishedYear: { type: GraphQLString },
      availableCopies: { type: GraphQLInt },
    },
    resolve: addNewBookGraphService,
  },

  borrowBook: {
    type: borrowBookResponseType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
      bookId: { type: GraphQLID },
    },
    resolve: borrowBookGraphService,
  },

  returnBookAvailable: {
    type: returnBookResponseType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
      bookId: { type: GraphQLID },
    },
    resolve: returnBookGraphService,
  },

  createLibrary: {
    type: GraphQLString,
    args: createLibraryRequest,
    resolve: createLibraryGraphService,
  },
};

export const bookQueryGraphController = {
  getAllBooks: {
    type: new GraphQLList(BookType),
    args: { auth: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: getAllBooksGraphService,
  },
  getBookById: {
    type: BookType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: getBookByIdGraphService,
  },
  getAllLibrariesWithTheirBooks: {
    type: getLibrariesResponseType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getLibrariesGraphService,
  },
};
