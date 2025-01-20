"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";
import Navbar from "@components/components/Navbar";

const About = () => {
  const [productForm, setProductForm] = useState({});
  const [products, setproducts] = useState([]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added successfully:", result);
        setProductForm({ slug: "", quantity: "", price: "" }); // Clear form
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (event) => {
    setProductForm({
      ...productForm,
      [event?.target.name]: event?.target.value,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product", {
        method: "GET",
      });
      let rjson = await response.json();
      setproducts(await rjson.products);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-red-300 p-6">
        <h1 className="text-2xl font-bold mb-4">Add a product</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Stock Form */}
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form className="space-y-4">
              {/* Product Name */}
              <label className="block">
                <span className="text-gray-700">Product Slug</span>
                <input
                  type="text"
                  name="slug"
                  value={productForm?.slug ?? ""}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter Product name"
                />
              </label>

              {/* Quantity */}
              <label className="block">
                <span className="text-gray-700">Quantity</span>
                <input
                  type="number"
                  value={productForm?.quantity ?? ""}
                  onChange={handleChange}
                  name="quantity"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter quantity"
                />
              </label>

              {/* Price */}
              <label className="block">
                <span className="text-gray-700">Price</span>
                <input
                  type="number"
                  name="price"
                  value={productForm?.price ?? ""}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter price"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={addProduct}
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Current Stocks Display */}
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Current Stocks</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Price ($)
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((stock) => (
                  <tr key={stock.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {stock.slug}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stock.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stock.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
