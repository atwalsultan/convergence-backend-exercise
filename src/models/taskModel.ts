// Third-party packages
import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';

// Local packages
import { UserDocument } from "./userModel";

export interface TaskDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  body: string;
}

const TaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuid(),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: true },
    done: { type: Boolean, default: false },
  }
);

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;