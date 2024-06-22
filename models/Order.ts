import mongoose, { ObjectId, Schema } from "mongoose";

interface IOrder extends Document {
  tableNumber: string;
  addres: string;
  owner: ObjectId;
  manager: ObjectId;
  waiter: ObjectId;
  kitchen: ObjectId;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "served"
    | "completed"
    | "canceled";
}
const orderSchema: Schema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: false },
    items: [{ name: String, quantity: Number, price: Number }],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    waiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    kitchen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "served",
        "completed",
        "canceled",
      ],
      default: "pending",
    },
    isListed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
