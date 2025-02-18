import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const signUpResponseType = new GraphQLObjectType({
  name: "signUpResponseType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  },
});

export const loginResponseType = new GraphQLObjectType({
  name: "loginResponseType",
  fields: {
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  },
});
