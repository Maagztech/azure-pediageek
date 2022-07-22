import mongoose from "mongoose";
import { IWork } from "../config/interface";

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a country name"],
    trim: true,
    maxLength: [100, "Your name is up to 100 chars long."],
    minlength: 2,
  },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
});

export default mongoose.model<IWork>("Work", workSchema);
