import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";
import { isAuthenticated } from "../../graphMiddleWares/isAuthenticated.js";
import { UserModel } from "../../models/user.model.js";
import { deleteUserAccountGraphService } from "./user.graph.services.js";
import { deleteUserResponseType } from "./user.graph.types.js";

export const userGraphController = {
  deleteUser: {
    type: deleteUserResponseType,
    args: {
      auth: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: deleteUserAccountGraphService,
  },
};
