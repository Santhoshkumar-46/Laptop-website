const ProductModel = require("../../models/productModel"); // Adjust with your actual Product model

const deleteProduct = async (req, res) => {
  console.log("1");
  try {
    const { productId } = req.params; // Assuming the productId is passed in the URL as a parameter

    // Find the product by ID and delete it
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Respond with a success message
    res.json({
      message: "Product deleted successfully",
      error: false,
      success: true,
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "An error occurred while deleting the product",
      error: true,
      success: false,
    });
  }
};

module.exports = deleteProduct;
