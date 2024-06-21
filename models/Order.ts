import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  status: { type: String, default: "pending" },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
