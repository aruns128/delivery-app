"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Package, ClipboardList, Users, Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("stock");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    if (activeTab === "stock") {
      fetchProducts();
    }
  }, [activeTab]);


  const addProduct = async () => {
    setLoading(true);
    if (!name || !price || !description || !image) {
      toast.error("Please fill in all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("inStock", "true"); // ✅ Default stock status

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      setLoading(false);
      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully");
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Error adding product");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setLoading(false);
    fetchProducts();
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !currentStatus }),
    });
    setLoading(false);
    fetchProducts();
  };

  return (
    <Layout>
      <div className="bg-white shadow-md rounded-xl overflow-hidden w-full">

        {/* Tabs */}
        <div className="flex space-x-4 sm:space-x-6 mb-6 border-b-slate-100 border-b-2 overflow-x-auto">
          {[
            { id: "stock", label: "Stock Management", icon: <Package className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> },
            { id: "orders", label: "Manage Orders", icon: <ClipboardList className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> },
            { id: "users", label: "Manage Users", icon: <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px]" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 sm:pb-3 px-3 sm:px-5 flex items-center gap-1 sm:gap-2 font-medium transition-all duration-300 text-sm sm:text-base ${activeTab === tab.id
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-green-500"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>


        {/* Tab Content */}
        {activeTab === "stock" && (

          <>
            {loading ?
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="animate-spin text-orange-500" size={40} />
              </div> :
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    Product Stock Management
                  </h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                  >
                    <Plus size={18} /> Add Product
                  </button>
                </div>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                  {products.length === 0 ? (
                    <p className="p-6 text-gray-500 text-center">No products available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px] text-sm text-left">
                        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10">
                          <tr>
                            <th className="p-4 font-semibold text-gray-700">Image</th>
                            <th className="p-4 font-semibold text-gray-700">Name</th>
                            <th className="p-4 font-semibold text-gray-700 text-center">Price</th>
                            <th className="p-4 font-semibold text-gray-700 text-center">Stock</th>
                            <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product: any, idx: number) => (
                            <tr
                              key={product._id}
                              className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } hover:bg-blue-50`}
                            >
                              <td className="p-4">
                                <img
                                  src={
                                    product.image
                                      ? `data:image/jpeg;base64,${product.image}`
                                      : "/tomoto.jpg"
                                  }
                                  alt={product.name}
                                  className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
                                />
                              </td>
                              <td className="p-4 font-medium text-gray-800">{product.name}</td>
                              <td className="p-4 font-semibold text-gray-900 text-center">
                                ₹{product.price}
                              </td>
                              <td className="p-4 text-center">
                                {product.inStock ? (
                                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Out of Stock
                                  </span>
                                )}
                              </td>
                              <td className="p-4 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => toggleStock(product._id, product.inStock)}
                                  className="px-3 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition flex items-center gap-1"
                                  title={
                                    product.inStock
                                      ? "Mark as Out of Stock"
                                      : "Mark as In Stock"
                                  }
                                >
                                  {product.inStock ? "Set Out" : "Set In"}
                                </button>
                                <button
                                  onClick={() => deleteProduct(product._id)}
                                  className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-1"
                                  title="Delete Product"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>


              </>
            }
          </>

        )}

        {activeTab === "orders" && (
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <p className="text-gray-500">Order management UI coming soon...</p>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <p className="text-gray-500">User management UI coming soon...</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-white/30">
              <h1 className="font-bold text-xl mb-4">Add New Product</h1>
              <input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 block my-2 w-full rounded-lg"
              />
              <input
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 block my-2 w-full rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 block my-2 w-full rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="border p-2 block my-2 w-full rounded-lg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addProduct}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
