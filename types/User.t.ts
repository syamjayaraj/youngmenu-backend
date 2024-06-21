import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "owner" | "manager" | "counter" | "kitchen" | "waiter";
  createdAt: Date;
  updatedAt: Date;
}
