// Third-party packages
import { DocumentDefinition } from "mongoose";

// Local packages
import User, { UserDocument } from "../models/userModel";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    console.log(error);
    throw new Error("Could not create user.");
  }
}

export async function findUser() {}
