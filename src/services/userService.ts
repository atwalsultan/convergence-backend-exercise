// Third-party packages
import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";

// Local packages
import User, { UserDocument } from "../models/userModel";

// Create a user
export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    console.log(error);
    throw new Error("Could not create user.");
  }
}

// Get a user
export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

// Validate password
export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
