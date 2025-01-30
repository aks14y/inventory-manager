"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";
import Navbar from "@components/components/Navbar";

const About = () => {
  const [productForm, setProductForm] = useState({});
  const [products, setproducts] = useState([]);
  const [dropdown, setDropdown] = useState([
    {
      slug: "fdf",
      quantity: "2",
      price: "23",
    },
    {
      slug: "jeans",
      quantity: "21",
      price: "234",
    },
    {
      slug: "choc",
      quantity: "3",
      price: "13",
    },
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

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
      const response = await fetch("/api/search?query", {
        method: "GET",
      });
      let rjson = await response.json();
      setproducts(await rjson.products);
    };
    fetchProducts();
  }, []);

  const onDropDownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value.length >= 3) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      let rjson = await response.json();
      setDropdown(await rjson.products);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };

  const buttonAction = async (action, slug, initialQuantity) => {
    // upadate the product and dropdown collections
    const dropDownIndex = dropdown.findIndex(
      (item) => parseInt(item.quantity) == parseInt(initialQuantity)
    );
    if (action === "add") {
      setDropdown((prev) => {
        return prev.map((item, index) =>
          index === dropDownIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } else {
      setDropdown((prev) => {
        return prev.map((item, index) =>
          index === dropDownIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });
    }
    setLoadingAction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let r = await response.json();
    console.log(r);
    setLoadingAction(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Add a Product</h1>

        <h2 className="text-lg font-semibold text-gray-700 mb-2">Search</h2>
        <input
          type="text"
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Search stock by name..."
          onChange={onDropDownEdit}
        />

        {loading && (
          <div className="flex justify-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                strokeWidth="5"
                stroke="blue"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="125"
                strokeDashoffset="0"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        )}

        {dropdown.length > 0 && (
          <div className="absolute w-[42vw] bg-white shadow-lg border border-gray-300 rounded-md mt-2 z-10">
            {dropdown.map((item) => (
              <div
                key={item.slug}
                className="flex justify-between items-center p-3 border-b border-gray-200"
              >
                <span className="text-gray-700">
                  {item.slug} ({item.quantity} available at ${item.price})
                </span>
                <div className="flex items-center space-x-3 w-1/3">
                  <button
                    disabled={loadingAction}
                    className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 disabled:bg-white"
                    onClick={() =>
                      buttonAction("sub", item.slug, item.quantity)
                    }
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-6">
                    {item.quantity}
                  </span>
                  <button
                    disabled={loadingAction}
                    className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 disabled:bg-white"
                    onClick={() =>
                      buttonAction("add", item.slug, item.quantity)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Stock Form */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Product
            </h2>
            <form className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Product Slug</span>
                <input
                  type="text"
                  name="slug"
                  value={productForm?.slug ?? ""}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter product name"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  value={productForm?.quantity ?? ""}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter quantity"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Price</span>
                <input
                  type="number"
                  name="price"
                  value={productForm?.price ?? ""}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
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
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Current Stocks
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Price ($)
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {stock.slug}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {stock.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${stock.price}
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
