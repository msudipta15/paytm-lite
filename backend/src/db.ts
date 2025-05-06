import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  email: { required: true, type: String, unique: true, max: 50 },
  password: { required: true, type: String, max: 50 },
  firstname: { required: true, type: String, max: 100 },
  lastname: { required: true, type: String, max: 100 },
});

const accountSchema = new Schema({
  userid: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  balance: { type: Number, required: true },
});

const recieverSchema = new Schema({
  userid: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  recieverid: { type: mongoose.Types.ObjectId },
  recieveremail: { type: String },
  recieverfirstname: { type: String },
  recieverlastname: { type: String },
});

const guestSchema = new Schema({
  email: { type: String, required: true, unique: true, max: 100 },
});

export const usermodel = mongoose.model("user", userSchema);
export const accountmodel = mongoose.model("account", accountSchema);
export const recievermodel = mongoose.model("reciever", recieverSchema);
export const guestModel = mongoose.model("guest", guestSchema);
