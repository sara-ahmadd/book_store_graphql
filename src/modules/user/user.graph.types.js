import { GraphQLObjectType, GraphQLString } from "graphql";

export const deleteUserResponseType = new GraphQLObjectType({
  name: "deleteUserResponse",
  fields: {
    message: { type: GraphQLString },
  },
});
