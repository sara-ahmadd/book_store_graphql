import { isAuthenticated } from "../../graphMiddleWares/isAuthenticated.js";
import { UserModel } from "../../models/user.model.js";

/**
 * Check if user exists.
 * @param {String} id
 * @param {String} email
 */
export const checkUser = async ({ id, email }) => {
  if (!id) {
    //check if user exists
    const user = await UserModel.findOne({ email });
    if (!user || user.isDeleted || !user.isActivated)
      throw new Error("user is not found");
    return user;
  }
  //check if user exists
  const user = await UserModel.findOne({ _id: id, email });
  if (!user || user.isDeleted || !user.isActivated)
    throw new Error("user is not found");

  return user;
};

export const deleteUserAccountGraphService = async (parent, args) => {
  //get user id from auth
  await isAuthenticated(args);
  const user = args.user;
  const updateUser = await UserModel.findByIdAndUpdate(user._id, {
    isDeleted: true,
  });
  return {
    message: "User deleted his account successfully",
  };
};
