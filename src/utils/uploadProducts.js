// src/utils/uploadProducts.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import products from "./products"; // or "../utils/products"
import { toast } from "react-toastify";

const uploadProducts = async () => {
  const productsCollection = collection(db, "products");

  try {
    if (!products || products.length === 0) {
      toast.warn("🚫 No products to upload.");
      return;
    }

    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`✅ Uploaded: ${product.name}`);
    }

    toast.success("🎉 All products uploaded successfully.");
  } catch (error) {
    console.error("❌ Upload failed:", error);
    toast.error("❌ Failed to upload products.");
  }
};

export default uploadProducts;
