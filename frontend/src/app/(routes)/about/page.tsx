import Navbar from "@components/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-red-300 p-6">
        <h1 className="text-2xl font-bold mb-4">Add a stock</h1>
        <h1 className="text-2xl font-bold mb-6">Display current stocks</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Stock Form */}
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Add Stock</h2>
            <form className="space-y-4">
              {/* Stock Name */}
              <label className="block">
                <span className="text-gray-700">Stock Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter stock name"
                />
              </label>

              {/* Quantity */}
              <label className="block">
                <span className="text-gray-700">Quantity</span>
                <input
                  type="number"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter quantity"
                />
              </label>

              {/* Price */}
              <label className="block">
                <span className="text-gray-700">Price</span>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter price"
                />
              </label>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Add Stock
              </button>
            </form>
          </div>

          {/* Current Stocks Display */}
          <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold mb-4">Current Stocks</h2>
            <ul className="space-y-3">
              <li className="p-4 bg-gray-100 rounded-md">
                <span className="font-bold">Stock 1:</span> 100 units | $50.00
              </li>
              <li className="p-4 bg-gray-100 rounded-md">
                <span className="font-bold">Stock 2:</span> 150 units | $75.00
              </li>
              <li className="p-4 bg-gray-100 rounded-md">
                <span className="font-bold">Stock 3:</span> 200 units | $120.00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
