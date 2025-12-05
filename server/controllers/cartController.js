import cartModel from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createCart = async (req, res) => {
  try {
    const userId = req.user.userId; // from authenticate middleware
    const { productId, quantity } = req.body;
    console.log(userId);

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    // Fetch product from DB
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    const price = product.price;
    const totalPrice = price * quantity;

    // Check if user already has a cart
    let cart = await cartModel.findOne({ user: userId });

    // If no cart exists → create new cart
    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity, price, totalPrice }],
        subTotal: totalPrice,
        grandTotal: totalPrice,
      });

      return res.status(201).json({
        message: "Cart created successfully",
        cart,
      });
    }

    // If cart exists → check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update existing item quantity
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].totalPrice =
        cart.items[itemIndex].quantity * price;
    } else {
      // Push new item
      cart.items.push({ product: productId, quantity, price, totalPrice });
    }

    // Recalculate totals
    cart.subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.grandTotal = cart.subTotal; // apply discount logic later

    await cart.save();

    return res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.log("Add to cart error", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCartByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    let cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    // CASE 1: User has no cart yet
    if (!cart) {
      return res.status(200).json({
        items: [],
        totalAmount: 0,
        totalItems: 0,
      });
    }

    // CASE 2: Cart exists but empty
    if (!cart.items || cart.items.length === 0) {
      return res.status(200).json({
        items: [],
        totalAmount: 0,
        totalItems: 0,
      });
    }

    // CASE 3: Normal cart
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    res.status(200).json({
      items: cart.items,
      totalAmount,
      totalItems,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartId = req.params.cartId;
    console.log(cartId)
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "ProductId & quantity required" });
    }

    let cart = await cartModel.findOne({ user: userId, _id: cartId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find item index
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate price
    const price = cart.items[itemIndex].price;
    // if(discount>0){
    //   const discountAmount = (price * discount) / 100;
    //   price = price - discountAmount;
    // }
    cart.items[itemIndex].totalPrice = price * quantity;

    // Recalculate totals
    cart.subTotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.grandTotal = cart.subTotal;

    await cart.save();

    cart = await cart.populate("items.product");

    return res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartId = req.params.cartId;

    const deletedCart = await cartModel.findOneAndDelete({ user: userId, _id: cartId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
