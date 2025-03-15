const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    if (!productId || !currentUser) {
      return res.json({
        message: "Product ID and user ID are required",
        success: false,
        error: true,
      });
    }

    // Find the user's cart
    let userCart = await addToCartModel.findOne({ userId: currentUser });

    if (!userCart) {
      // If the user doesn't have a cart, create one
      userCart = new addToCartModel({
        userId: currentUser,
        products: [{ productId, quantity: 1 }],
      });
    } else {
      // If the user has a cart, check if the product is already in the cart
      const productIndex = userCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (productIndex > -1) {
        // If the product exists in the cart, increment the quantity
        userCart.products[productIndex].quantity += 1;
      } else {
        // If the product does not exist, add it to the cart
        userCart.products.push({ productId, quantity: 1 });
      }
    }

    // Save the updated cart to the database
    await userCart.save();

    return res.json({
      data: userCart,
      message: "Product added to cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
