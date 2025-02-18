import { UserModel } from "../models/user.model.js";
import { verifyToken } from "../utils/token/token.js";

/**
 * check if the user that owns this token is authenticated, then add this user to **args** object to be accessible.
 * @param {Object} args
 */
export const isAuthenticated = async (args) => {
  //authenticate user
  const payload = verifyToken(args.auth);

  const user = await UserModel.findOne({
    email: payload.email,
    _id: payload._id,
    isActivated: true,
  });

  if (!user || user.isDeleted)
    throw new Error("user is not found or not activated");
  args.user = user;
};
