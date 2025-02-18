import { GraphQLString } from "graphql";
import {
  activateEmailGraphService,
  loginGraphService,
  registerGraphService,
} from "./auth.graph.services.js";
import { loginResponseType, signUpResponseType } from "./auth.graph.types.js";

export const authGraphController = {
  login: {
    type: loginResponseType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: loginGraphService,
  },
  register: {
    type: signUpResponseType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      phone: { type: GraphQLString },
    },
    resolve: registerGraphService,
  },

  emailVerificaion: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      otp: { type: GraphQLString },
    },
    resolve: activateEmailGraphService,
  },
};
