"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [products, setProducts] = useState([]);

  // Fetch products from API
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    if (!name || !price || !description || !image) {
      alert("Please fill in all fields and select an image");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    alert("Product added");
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    fetchProducts();
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Toggle Stock Status
  const toggleStock = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !currentStatus }),
    });
    fetchProducts();
  };

  return (
    <Layout>
      <div className="p-5 max-w-4xl mx-auto">
        {/* Add Product Form */}
        <div className="bg-white shadow p-5 rounded-xl mb-8">
          <h1 className="font-bold text-2xl mb-4">Add New Product</h1>
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 block my-2 w-full rounded"
          />
          <input
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 block my-2 w-full rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 block my-2 w-full rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="border p-2 block my-2 w-full rounded"
          />
          <button
            onClick={addProduct}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="bg-white shadow p-5 rounded-xl">
          <h2 className="font-bold text-xl mb-4">Manage Products</h2>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">
                      {product.inStock ? (
                        <span className="text-green-600 font-semibold">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() =>
                          toggleStock(product._id, product.inStock)
                        }
                        className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        Toggle Stock
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
