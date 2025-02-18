import mongoose from "mongoose";

const dbUri = process.env.DB_URI;

export const dbConnection = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB...");
  } catch (error) {
    console.log(error);
  }
};
