const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const { productId, quantity } = req.body;

    // Find the user's cart
    const findUser = await addToCartModel.findOne({ userId: currentUserId });

    if (!findUser) {
      return res.status(404).json({
        message: "Cart not found for this user",
        error: true,
        success: false,
      });
    }

    // Find the product in the cart
    const product = findUser.products.find(
      (product) => product.productId === productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found in the cart",
        error: true,
        success: false,
      });
    }

    // Update the product's quantity
    product.quantity = quantity;

    // Save the updated cart
    await findUser.save();

    // Return the updated cart data
    res.json({
      message: "Product Updated",
      data: findUser.products,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
