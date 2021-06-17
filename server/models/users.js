import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a mongoose schema for a user with a userName, email, password, and a list of links
const UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  links: [{ site: String, link: String }],
});

// Export a model created from this schema
export const User = mongoose.model("User", UserSchema);
