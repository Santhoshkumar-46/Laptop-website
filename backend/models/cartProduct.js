const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // Ensures that the user ID is always provided
      unique: true, // Ensures that each user has only one cart
    },
    products: [
      {
        productId: {
          type: String,
          required: true, // Ensures that the product ID is always provided
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity when a product is added to the cart
          min: 1, // Prevents the quantity from being less than 1
        },
      },
    ],
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

const addToCartModel = mongoose.model("addToCart", cartProductSchema);

module.exports = addToCartModel;
