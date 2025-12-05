import mongoose from "mongoose";
import Offer from "../models/offerModel.js";
import Product from "../models/productModel.js";

// ==============================
// CREATE NEW OFFER
// ==============================
// export const createOffer = async (req, res) => {
//   try {
//     const {
//       productId,
//       offerType,
//       specialPrice,
//       discountPercent,
//       luckyDrawCode,
//       maxParticipants,
//       startDate,
//       endDate,
//     } = req.body;

//     // Product must exist
//     const productExists = await Product.find({_id:productId});
//     if (!productExists)
//       return res.status(404).json({ message: "Product not found" });

//     const offer = new Offer({
//       productId,
//       offerType,
//       specialPrice,
//       discountPercent,
//       luckyDrawCode,
//       maxParticipants,
//       startDate,
//       endDate,
//     });

//     await offer.save();

//     return res.status(201).json({
//       message: "Offer created successfully",
//       data: offer,
//     });
//   } catch (error) {
//     console.error("Create Offer Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const createOffer = async (req, res) => {
  try {
    const {
      products,     // for 99_STORE can be single or multiple
      productId,      // for single product offer types
      offerType,
      specialPrice,
      discountPercent,
      luckyDrawCode,
      maxParticipants,
      startDate,
      endDate,
    } = req.body;

    let finalProducts = [];

    console.log(req.body);

    /* -----------------------------
       99 STORE OFFER 
       Accepts SINGLE or MULTIPLE products
       ----------------------------- */
    // if (offerType === "99_STORE") {
    //   let ids = products;
    //   console.log(products, ids);

    //   // If productIds is missing but single product is sent
    //   if (!ids && productId) {
    //     ids = [productId];
    //   }

    //   // Validate products field
    //   if (!Array.isArray(ids) || ids.length === 0) {
    //     return res.status(400).json({
    //       message: "99_STORE offer requires productIds as a non-empty array"
    //     });
    //   }

    //   // Check if products exist
    //   const foundProducts = await Product.find({ _id: { $in: ids } });

    //   console.log(foundProducts, ids.length, 'length');

    //   if (foundProducts.length !== ids.length) {
    //     return res.status(404).json({
    //       message: "One or more product IDs are invalid"
    //     });
    //   }

    //   finalProducts = ids;
    // }

    if (offerType === "99_STORE") {
  let ids = products;

  if (!ids && productId) {
    ids = [productId];
  }

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      message: "99_STORE offer requires productIds as a non-empty array"
    });
  }

  // Convert all to ObjectIds safely
  const objectIds = ids.map(id => new mongoose.Types.ObjectId(id.trim()));

  console.log(objectIds);

  const foundProducts = await Product.find({ _id: objectIds });

  console.log("Converted IDs:", objectIds);
  console.log("Found products:", foundProducts);

  if (foundProducts.length !== ids.length) {
    return res.status(404).json({
      message: "One or more product IDs are invalid"
    });
  }

  finalProducts = objectIds;
}


    /* -----------------------------
       DEAL OF DAY / LUCKY DRAW
       Only allow ONE product
       ----------------------------- */
    else {
      if (!productId) {
        return res.status(400).json({
          message: "productId is required for this offer type"
        });
      }

      const singleProduct = await Product.findById(productId);

      if (!singleProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      finalProducts = [productId];
    }

    /* -----------------------------
       CREATE OFFER DOCUMENT
       ----------------------------- */
    const offer = new Offer({
      productIds: finalProducts,
      offerType,
      specialPrice,
      discountPercent,
      luckyDrawCode,
      maxParticipants,
      startDate,
      endDate,
    });

    await offer.save();

    return res.status(201).json({
      message: "Offer created successfully",
      data: offer,
    });

  } catch (error) {
    console.error("Create Offer Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ==============================
// GET ALL OFFERS
// ==============================
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("productIds", "name price");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==============================
// GET ALL 99 STORE OFFERS
// ==============================
export const get99StoreOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ offerType: "99_STORE" })
      .populate("productIds");

    res.status(200).json({
      message: "99 Store offers fetched",
      data: offers,
    });
  } catch (error) {
    console.error("Get 99 Store Offers Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ==============================
// GET OFFERS BY PRODUCT ID
// ==============================
export const getOffersByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const offers = await Offer.find({ productId });

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==============================
// USER JOINS LUCKY DRAW
// ==============================
export const joinLuckyDraw = async (req, res) => {
  try {
    const { offerId } = req.params;
    const userId = req.user.userId; // user id from auth middleware

    const offer = await Offer.findById(offerId);
    if (!offer)
      return res.status(404).json({ message: "Offer not found" });

    if (offer.offerType !== "LUCKY_DRAW")
      return res.status(400).json({ message: "This is not a lucky draw offer" });

    // Check if user already joined
    if (offer.participants.includes(userId))
      return res.status(400).json({ message: "User already joined" });

    // Check max participants limit
    if (offer.participants.length >= offer.maxParticipants)
      return res.status(400).json({ message: "Max participants reached" });

    offer.participants.push(userId);
    await offer.save();

    res.status(200).json({
      message: "User joined the lucky draw",
      participants: offer.participants.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==============================
// SELECT RANDOM WINNER
// ==============================
export const pickLuckyDrawWinner = async (req, res) => {
  try {
    const { offerId } = req.params;

    const offer = await Offer.findById(offerId);
    if (!offer)
      return res.status(404).json({ message: "Offer not found" });

    if (offer.participants.length === 0)
      return res.status(400).json({ message: "No participants to select from" });

    const randomIndex = Math.floor(Math.random() * offer.participants.length);
    const winner = offer.participants[randomIndex];

    offer.winner = winner;
    offer.isActive = false;  // close the lucky draw
    await offer.save();

    res.status(200).json({
      message: "Winner selected successfully",
      winner,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==============================
// DELETE OFFER
// ==============================
export const deleteOffer = async (req, res) => {
  try {
    const { offerId } = req.params;

    await Offer.findByIdAndDelete(offerId);

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
