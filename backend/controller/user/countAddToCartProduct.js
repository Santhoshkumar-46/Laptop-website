const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userID", userId);

    const count = await addToCartModel.findOne({
      userId: userId,
    });

    console.log("count", count);

    res.json({
      data: {
        count: count.products.length,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: false,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
