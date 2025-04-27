import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  username: { require: true, type: String, unique: true, max: 50 },
  password: { require: true, type: String, max: 50 },
  firstname: { require: true, type: String, max: 100 },
  lastname: { require: true, type: String, max: 100 },
});

const accountSchema = new Schema({
  userid: { type: mongoose.Types.ObjectId, require: true, ref: "user" },
  balance: { type: Number, require: true },
});

const recieverSchema = new Schema({
  userid: { type: mongoose.Types.ObjectId, require: true, ref: "user" },
  recieverid: { type: mongoose.Types.ObjectId },
});

export const usermodel = mongoose.model("user", userSchema);
export const accountmodel = mongoose.model("account", accountSchema);
export const recievermodel = mongoose.model("reciever", recieverSchema);
