import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { authGraphController } from "./modules/auth/auth.graph.controller.js";
import {
  bookGraphController,
  bookQueryGraphController,
} from "./modules/Book/book.graph.controller.js";
import { userGraphController } from "./modules/user/user.graph.controller.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "mainQuery",
    fields: {
      ...bookQueryGraphController,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "mainMutation",
    fields: {
      ...authGraphController,
      ...bookGraphController,
      ...userGraphController,
    },
  }),
});
