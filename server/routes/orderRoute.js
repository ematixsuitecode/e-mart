import express from "express";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";
import { createOrder, getOrder } from "../controllers/orderController.js";
import { getAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/", authenticateUser, createOrder);
router.get("/", authenticateUser, getAddress);
router.get("/product", authenticateUser, getOrder);

export default router;
