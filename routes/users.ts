import express from "express";
import { getUsers, deleteUser } from "../controllers/userController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// Get all users (admin only)
router.get("/", protect, authorize("admin"), getUsers);

// Delete a user (admin only)
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
