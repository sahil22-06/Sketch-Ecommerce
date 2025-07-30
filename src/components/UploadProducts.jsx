import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const UploadProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    mrp: "",
    brand: "",
    image: "",
    stock: "",
    type: "",
    showOnHome: false,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const productData = {
        ...product,
        price: Number(product.price),
        mrp: Number(product.mrp),
        stock: Number(product.stock),
        lastSold: serverTimestamp(),
      };
      await addDoc(collection(db, "products"), productData);
      toast.success("Product uploaded!");
      setProduct({
        name: "",
        description: "",
        price: "",
        mrp: "",
        brand: "",
        image: "",
        stock: "",
        type: "",
        showOnHome: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Upload a Product</h2>
      <div className="grid grid-cols-1 gap-4">
        {[
          { name: "name", label: "Product Name" },
          { name: "brand", label: "Brand" },
          { name: "type", label: "Type" },
          { name: "price", label: "Price (₹)", type: "number" },
          { name: "mrp", label: "MRP (₹)", type: "number" },
          { name: "stock", label: "Stock", type: "number" },
          { name: "image", label: "Image URL" },
        ].map(({ name, label, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={label}
            value={product[name]}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 rounded h-24"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={product.showOnHome}
            onChange={handleChange}
          />
          <span>Show on Home Page</span>
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload Product"}
        </button>
      </div>
    </div>
  );
};

export default UploadProducts;
