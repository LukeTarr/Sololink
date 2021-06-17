import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  links: [{ site: String, link: String }],
});

export const UserModel = mongoose.model("UserModel", UserSchema);
