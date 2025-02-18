import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const addBookResponseType = new GraphQLObjectType({
  name: "addBookResponseType",
  fields: {
    title: { type: GraphQLString },
    id: { type: GraphQLID },
  },
});

export const borrowBookResponseType = new GraphQLObjectType({
  name: "borrowBookResponseType",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    availableCopies: { type: GraphQLInt },
  },
});
export const returnBookResponseType = new GraphQLObjectType({
  name: "returnBookResponseType",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  },
});

export const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { type: GraphQLID }, // References the User type
    publishedYear: { type: GraphQLInt },
    availableCopies: { type: GraphQLInt },
  }),
});
export const createLibraryRequest = {
  books: { type: new GraphQLList(GraphQLString) },
  auth: { type: new GraphQLNonNull(GraphQLString) },
  name: { type: new GraphQLNonNull(GraphQLString) },
  location: { type: new GraphQLNonNull(GraphQLString) },
};

export const getLibrariesResponseType = new GraphQLList(
  new GraphQLObjectType({
    name: "libraryType",
    fields: {
      name: { type: GraphQLString },
      location: { type: GraphQLString },
      books: { type: new GraphQLList(BookType) },
    },
  })
);
