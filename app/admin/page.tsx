"use client";
import { useState } from "react";
import Layout from "../components/Layout";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    });
    alert("Product added");
  };

  return (
     <Layout>
        <div className="p-5">
        <h1 className="font-bold text-xl">Admin Dashboard</h1>
        <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 block my-2"
        />
        <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 block my-2"
        />
        <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Product
        </button>
        </div>
    </Layout>
  );
}
