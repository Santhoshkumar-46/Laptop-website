import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import { json } from "react-router-dom";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchData, setAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    try {
      // Make the API call using SummaryApi
      const response = await fetch(
        SummaryApi.deleteProduct.url.replace(":productId", productId),
        {
          method: SummaryApi.deleteProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Product deleted successfully");
        setAllProduct((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>

          <div
            className="w-fit ml-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => handleDelete(data._id)}
          >
            <MdDelete />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
