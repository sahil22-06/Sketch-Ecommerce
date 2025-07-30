// src/pages/DevTools.jsx
import React from "react";
import uploadProducts from "../utils/uploadProducts";

const DevTools = () => {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Developer Tools</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={uploadProducts}
      >
        Upload Demo Products
      </button>
    </div>
  );
};

export default DevTools;
