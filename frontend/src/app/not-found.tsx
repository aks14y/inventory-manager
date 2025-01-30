import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">
        The path dissolves to nothing—
      </p>
      <p className="text-xl text-gray-600 italic">An empty mirage.</p>
      <a
        href="/home"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Return Home
      </a>
    </div>
  );
}
