import express from "express";
import {
  createManager,
  listManagers,
  getManagerDetails,
  updateManagerDetails,
  deleteManager,
} from "../controllers/managerController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// List manager
router.get("/list", protect, authorize("admin", "owner"), listManagers);

// Get manager details
router.get("/:id", protect, authorize("admin", "owner"), getManagerDetails);

// Create manager
router.post("/", protect, authorize("admin", "owner"), createManager);

// Update manager
router.put("/:id", protect, authorize("admin", "owner"), updateManagerDetails);

// Delete manager
router.delete("/:id", protect, authorize("admin", "owner"), deleteManager);

export default router;
