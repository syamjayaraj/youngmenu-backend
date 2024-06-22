import express from "express";
import {
  createStore,
  listStores,
  getStoreDetails,
  updateStoreDetails,
  deleteStore,
} from "../controllers/storeController";
import { protect, authorize } from "../middleware/authMiddleware";
const router = express.Router();

// List stores
router.get("/list", protect, authorize("admin", "owner"), listStores);

// Get store details
router.get(
  "/:id",
  protect,
  authorize("admin", "owner", "manager"),
  getStoreDetails
);

// Create store
router.post("/", protect, authorize("admin"), createStore);

// Update store
router.put("/:id", protect, authorize("admin"), updateStoreDetails);

// Delete store
router.delete("/:id", protect, authorize("admin"), deleteStore);

export default router;
