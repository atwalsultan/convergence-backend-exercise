// Third-party packages
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Local packages
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { 
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

// Hash password and add salt before saving user
UserSchema.pre("save", async function (next: (err?: Error) => void) {
  let user = this as UserDocument;

  // Hash password if it has been modified
  if (!user.isModified("password")) return next();

  // Add salt
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = bcrypt.hashSync(user.password, salt);

  // Replace password with hash
  user.password = hash;

  return next();
});

// For logging in
UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;

  return bcrypt.compare(password, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;