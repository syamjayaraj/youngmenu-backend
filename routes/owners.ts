import express from "express";
import {
  createOwner,
  listOwners,
  getOwnerDetails,
  updateOwnerDetails,
  deleteOwner,
} from "../controllers/ownerController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// List owners
router.get("/list", protect, authorize("admin"), listOwners);

// Get owner details
router.get("/:id", protect, authorize("admin"), getOwnerDetails);

// Create owner
router.post("/", protect, authorize("admin"), createOwner);

// Update owner
router.put("/:id", protect, authorize("admin"), updateOwnerDetails);

// Delete owner
router.delete("/:id", protect, authorize("admin"), deleteOwner);

export default router;
