import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]); // Cart data with fetched product details
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  console.log(cart);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }), // Pass the productId in the body
      });

      const productData = await response.json();
      if (productData.success) {
        return productData.data; // Return the product details
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
    return null; // Return null if fetching fails
  };
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cartResponse = await response.json();
      if (cartResponse.success) {
        const cartData = cartResponse.data[0]; // Assuming single cart object

        const productsWithDetails = await Promise.all(
          cartData.products.map(async (product) => {
            const productDetails = await fetchProductDetails(product.productId);
            return { ...product, productId: productDetails }; // Replace `productId` with full product details
          })
        );
        setCart([{ ...cartData, products: productsWithDetails }]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchCart();
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchCart();
        context.fetchUserAddToCart();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const currentCart = cart[0]; // Assuming the cart is always the first object
  const products = currentCart?.products || []; // Safely access products array

  const totalQty = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = products.reduce(
    (sum, product) =>
      sum + product.quantity * (product.productId?.sellingPrice || 0),
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {products.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/*** View Products ***/}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : products.map((product) => (
                <div
                  key={product.productId?._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product.productId?.productImage[0]}
                      alt={product.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteProduct(product.productId?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl line-clamp-1">
                      {product.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product.productId?.sellingPrice * product.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          updateQuantity(
                            product.productId?._id,
                            product.quantity - 1
                          )
                        }
                        disabled={product.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          updateQuantity(
                            product.productId?._id,
                            product.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/*** Summary ***/}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button
                className="bg-blue-600 p-2 text-white w-full mt-2"
                onClick={() => {
                  toast.success("Successfully Placed you order");
                }}
              >
                Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
