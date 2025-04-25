import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { require: true, type: String, unique: true, max: 50 },
  password: { require: true, type: String, max: 50 },
  firstname: { require: true, type: String, max: 100 },
  lastname: { require: true, type: String, max: 100 },
});

export const usermodel = mongoose.model("user", userSchema);
