import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductById,
  toggleFavourite,
} from "../controllers/productController.js";
import multer from "multer";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits:{
    files: 4, // Maximum number of files
  }
})

// Product routes
router.post("/", authenticateUser, upload.array("images",4), createProduct); // Create a new product
router.get("/", getAllProducts); // Get all products
router.get("/:slug", getProductById);
router.get("/category/:category", getProductsByCategory); // Get products by category
router.patch("/:id", authenticateUser, upload.array("images", 4),updateProduct); // Update product by ID
router.delete("/:id", authenticateUser, deleteProduct); // Delete product by ID
router.patch("/:id/toggle-favourite", toggleFavourite); // Toggle favourite status

export default router;
