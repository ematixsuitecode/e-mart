import express from "express";
import {
  createOffer,
  getAllOffers,
  getOffersByProduct,
  joinLuckyDraw,
  pickLuckyDrawWinner,
  deleteOffer,
  get99StoreOffers,
} from "../controllers/offerController.js";

import { authenticateUser } from "../middlewares/authenticateMiddleware.js"; // if you have JWT auth

const router = express.Router();

// CREATE OFFER
router.post("/", createOffer);

router.get("/99_store", get99StoreOffers);

// GET ALL OFFERS
router.get("/", getAllOffers);

// GET OFFERS BY PRODUCT
router.get("/product/:productId", getOffersByProduct);

// JOIN LUCKY DRAW (USER AUTH REQUIRED)
router.post("/lucky_draw/join/:offerId", authenticateUser, joinLuckyDraw);

// PICK WINNER (Admin only)
router.post("/lucky_draw/pick-winner/:offerId", pickLuckyDrawWinner);

// DELETE OFFER
router.delete("/:offerId", deleteOffer);

export default router;
