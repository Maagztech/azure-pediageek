import mongoose from "mongoose";
import { IPreferance } from "../config/interface";

const preferanceSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, ref: "user" },
  locality: {
    type: String,
    trim: true,
    maxLength: 40,
  },
  city: { type: mongoose.Types.ObjectId, ref: "city" },
  state: { type: mongoose.Types.ObjectId, ref: "state" },
  country: { type: mongoose.Types.ObjectId, ref: "country" },
  language: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  interest: [{ type: mongoose.Types.ObjectId, ref: "category" }],
  isdark: {
    type: Boolean,
    default: true,
  },
  birthday: {
    type: Date,
  },
  now: { type: mongoose.Types.ObjectId, ref: "work" },
  then: { type: mongoose.Types.ObjectId, ref: "work" },
});

export default mongoose.model<IPreferance>("prefernce", preferanceSchema);
