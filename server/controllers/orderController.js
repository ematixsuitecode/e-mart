import productModel from "../models/productModel.js";
import Order from '../models/orderModel.js'
import addressModel from "../models/addressModel.js";
import { StatusCodes } from "http-status-codes";
import userModel from "../models/userModel.js";
import cartModel from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { mobileNo, address, paymentMethod, items } = req.body;
    const addressId = address?._id;

    if (!mobileNo || !addressId || !paymentMethod || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch address
    const selectedAddress = await addressModel.findById(addressId);
    if (!selectedAddress) {
      return res.status(400).json({ message: "Address not found" });
    }

    // Fetch user's cart
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    let subTotal = 0;

    // Loop through each ordered item
    for (let orderedItem of items) {
      const product = await productModel.findById(orderedItem.product);

      if (!product)
        return res.status(400).json({ message: "Invalid product" });

      // Check stock
      if (orderedItem.quantity > product.stock)
        return res.status(400).json({
          message: `Product ${product.name} is out of stock`,
        });

      // Add price to subtotal
      subTotal += product.price * orderedItem.quantity;

      // Deduct stock from Product Collection
      await productModel.findByIdAndUpdate(product._id, {
        $inc: { stock: -orderedItem.quantity },
      });

      // --- UPDATE CART LOGIC ---
      let cartItem = cart.items.find(
        (item) => item.product.toString() === orderedItem.product
      );

      if (cartItem) {
        if (cartItem.quantity > orderedItem.quantity) {
          // Reduce cart qty
          cartItem.quantity -= orderedItem.quantity;
          cartItem.totalPrice = cartItem.quantity * cartItem.price;
        } else {
          // Remove from cart
          cart.items = cart.items.filter(
            (item) => item.product.toString() !== orderedItem.product
          );
        }
      }
    }

    // Recalculate cart totals
    let newSubTotal = 0;
    cart.items.forEach((item) => {
      newSubTotal += item.totalPrice;
    });

    cart.subTotal = newSubTotal;
    cart.discount = 0;
    cart.grandTotal = newSubTotal;

    await cart.save(); // ✔ save updated cart

    // Order totals
    const discount = 0;
    const deliveryCharges = 40;
    const grandTotal = subTotal - discount + deliveryCharges;

    // Create new order
    const order = await Order.create({
      user: userId,
      mobileNo,
      address: addressId,
      items,
      subTotal,
      discount,
      deliveryCharges,
      grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Pending",
      expectedDelivery: new Date(Date.now() + 3 * 86400000),
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      cartUpdated: cart,
      order,
    });

  } catch (error) {
    console.log("Create Order Error:", error);
    return res.status(500).json({ message: error.message });
  }
};


// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const { mobileNo, address, paymentMethod, items } = req.body;

//     const addressId = address?._id;

//     if (!mobileNo || !addressId || !paymentMethod) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Fetch address
//     const selectedAddress = await addressModel.findById(addressId);
//     if (!selectedAddress) {
//       return res.status(400).json({ message: "Address not found" });
//     }

//     // Validate products & calculate totals
//     let subTotal = 0;

//     for (let item of items) {
//       const product = await productModel.findById(item.product);

//       if (!product)
//         return res.status(400).json({ message: "Invalid product" });

//       if (item.quantity > product.stock)
//         return res.status(400).json({
//           message: `Product ${product.name} is out of stock`,
//         });

//       subTotal += product.price * item.quantity;

//       // Deduct stock
//       await productModel.findByIdAndUpdate(product._id, {
//         $inc: { stock: -item.quantity },
//       });
//     }

//     const discount = 0;
//     const deliveryCharges = 40;
//     const grandTotal = subTotal - discount + deliveryCharges;

//     // Create order
//     const order = await Order.create({
//       user: userId,
//       mobileNo,
//       address: addressId,
//       items,
//       subTotal,
//       discount,
//       deliveryCharges,
//       grandTotal,
//       paymentMethod,
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
//       orderStatus: "Pending",
//       expectedDelivery: new Date(Date.now() + 3 * 86400000),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });

//   } catch (error) {
//     console.log("Create Order Error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const getOrder = async(req,res) =>{
//   try {
//     const user = req.user.userId;
//     console.log(user);
//     const findOrder = await Order.find({user: user});
//     if(!findOrder) return res.status(StatusCodes.BAD_REQUEST).json("unauthorized user");
//     console.log(findOrder);
//     return res.status(StatusCodes.OK).json({findOrder});
//   } catch (error) {
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
//   }
// }

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
console.log(userId)
    // 1️⃣ Fetch user details
    const user = await userModel.findById(userId).select("customerName email");
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json("Unauthorized user");
    }
console.log(user, 'user details')
    // 2️⃣ Fetch order and populate product + address + user
    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name price category", // fields from Product
      })
      .populate({
        path: "user",
        select: "userName email", // fields from User
      })
      // .populate({
      //   path: "address",
      //   select: "fullName street city state pincode", // optional
      // })
      .sort({ createdAt: -1 });
      console.log(orders, "order details")

    return res.status(StatusCodes.OK).json({
      success: true,
      user: user.userName,
      email: user.email,
      orders,
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};