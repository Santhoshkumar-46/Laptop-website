const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId; // Assuming middleware sets userId in the request
    const { productId } = req.body; // Extract productId from the request body

    const findUser = await addToCartModel.findOne({ userId: currentUserId });

    if (!findUser) {
      return res.status(404).json({
        message: "Cart not found for this user",
        error: true,
        success: false,
      });
    }

    // Filter out the product to be deleted
    const updatedProducts = findUser.products.filter(
      (product) => product.productId !== productId
    );

    // If no product was removed, return a message
    if (updatedProducts.length === findUser.products.length) {
      return res.status(404).json({
        message: "Product not found in the cart",
        error: true,
        success: false,
      });
    }

    // Update the cart and save the document
    findUser.products = updatedProducts;
    await findUser.save();

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: updatedProducts,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAddToCartProduct;
