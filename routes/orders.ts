import express from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// Get all orders (admin, owner, counter, kitchen)
router.get(
  "/",
  protect,
  authorize("admin", "owner", "counter", "kitchen"),
  getOrders
);

// Create a new order (waiter only)
router.post("/", protect, authorize("waiter"), createOrder);

// Update order status (kitchen only)
router.put("/:id", protect, authorize("kitchen"), updateOrderStatus);

export default router;
