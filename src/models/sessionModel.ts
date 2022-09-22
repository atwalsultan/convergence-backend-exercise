// Third-party packages
import mongoose from "mongoose";

// Local packages
import { UserDocument } from "./userModel";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    valid: {
      type: Boolean,
      default: true
    },
    userAgent: {
      type: String 
    },
  }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;