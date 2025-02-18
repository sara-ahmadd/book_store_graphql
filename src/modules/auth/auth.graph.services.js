import otpGenerator from "otp-generator";
import { OTPModel } from "../../models/otp.model.js";
import { UserModel } from "../../models/user.model.js";
import { otpVerificationTemplate } from "../../utils/emails/otpVerifyEmail.js";
import { myEventEmitter } from "../../utils/emails/sendEmail.js";
import { encryptText } from "../../utils/encryption/encryption.js";
import { compareHashedText, hashText } from "../../utils/hashing/hashing.js";
import { generateToken } from "../../utils/token/token.js";
import { checkUser } from "../user/user.graph.services.js";
/**
 * - handle sending otp to the email to be verified
 * @param {String} email
 */
export const sendOtp = async (email, subject) => {
  //generate verification otp
  const otp = otpGenerator.generate(Math.random() * 10, {
    digits: true,
    specialChars: false,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
  });
  const checkEmail = await OTPModel.findOne({ email });
  if (checkEmail) {
    checkEmail.otp = otp;
    await checkEmail.save();
  } else {
    // cretae otp to send to the email
    await OTPModel.create({ email, otp });
  }

  myEventEmitter.emit(
    process.env.SEND_EMAIL_EVENT,
    email,
    subject,
    otpVerificationTemplate(otp)
  );
};

export const registerGraphService = async (parent, args) => {
  const { name, email, password, phone } = args;
  //check if email exists
  const user = await UserModel.findOne({ email });
  if (user) throw new Error("user already exists");

  //hash password & encrypt phone
  const hashedPassw = hashText(password);
  const encryptedPhone = encryptText(phone);
  await sendOtp(email, "Confirmation Email");
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassw,
    phone: encryptedPhone,
  });
  const res = {
    message: "Success",
    statusCode: 201,
    id: newUser.id,
    email: newUser.email,
  };
  return res;
};

export const activateEmailGraphService = async (parent, args) => {
  const { otp, email } = args;

  //check if user exists
  const user = await UserModel.findOne({ email });
  if (!user || user.isDeleted) throw new Error("user is not found");

  //check if otp exists & is for that email
  const checkOtp = await OTPModel.findOne({ email, otp });
  if (!checkOtp) throw new Error("invalid otp");

  user.isActivated = true;
  await user.save();
  return "Email is verified successfully 👍";
};

export const loginGraphService = async (parent, args) => {
  try {
    //get credintials from args
    const { email, password } = args;

    const user = await checkUser({ id: undefined, email });

    //compare passwords
    const comparePasswords = compareHashedText({
      plainText: password,
      hashedValue: user.password,
    });
    if (!comparePasswords) throw Error("invalid credetials");

    const token = generateToken(
      { email, _id: user._id },
      process.env.ACCESS_EXPIRY_TIME
    );

    return { message: "Logged in successfully", token, statusCode: 200 };
  } catch (error) {
    throw new Error(error.message);
  }
};
