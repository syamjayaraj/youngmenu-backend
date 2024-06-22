import mongoose, { Document, Schema } from "mongoose";
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "owner" | "manager" | "counter" | "kitchen" | "waiter";
  isListed: boolean;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "owner", "manager", "counter", "kitchen", "waiter"],
      default: "waiter",
    },
    isListed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
