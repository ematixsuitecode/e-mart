import express from "express";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";
import { createCart, deleteCart, getCartByUser, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add-to-cart', authenticateUser, createCart);
router.get('/', authenticateUser, getCartByUser);
router.patch('/update-cart/:cartId', authenticateUser, updateCart);
router.delete('/delete-cart/:cartId', authenticateUser, deleteCart);

export default router;