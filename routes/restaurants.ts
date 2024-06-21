import express from "express";
import {
  getRestaurants,
  createRestaurant,
} from "../controllers/restaurantController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// Get all restaurants (admin and owner)
router.get("/", protect, authorize("admin", "owner"), getRestaurants);

// Create a new restaurant (admin only)
router.post("/", protect, authorize("admin"), createRestaurant);

export default router;
