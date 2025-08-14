"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Package, ClipboardList, Users, Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import ProductStock from "../components/OrdersComponent/ProductStock";
import OrdersManagement from "../components/OrdersComponent/OrdersManagement";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("stock");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setLoadingProducts(false);
    setProducts(data);
  };

  // Fetch orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setLoadingOrders(false);
    setOrders(data);
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "stock") {
      fetchProducts();
    } else if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  // Add product
  const addProduct = async () => {
    if (!name || !price || !description || !image) {
      toast.error("Please fill in all fields and select an image");
      return;
    }

    setLoadingProducts(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("inStock", "true");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully");
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoadingProducts(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setLoadingProducts(false);
    fetchProducts();
  };

  // Toggle stock status
  const toggleStock = async (id: string, currentStatus: boolean) => {
    setLoadingProducts(true);
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !currentStatus }),
    });
    setLoadingProducts(false);
    fetchProducts();
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  // Cancel order
  const cancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
    fetchOrders();
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
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Stock Tab */}
        {activeTab === "stock" && (
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full">
            {loadingProducts ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="animate-spin text-blue-500" size={40} />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Stocks
                  </h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    <Plus size={18} /> Add Product
                  </button>
                </div>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                  <ProductStock
                    products={products}
                    toggleStock={toggleStock}
                    deleteProduct={deleteProduct}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Orders</h2>

            {loadingOrders ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin text-blue-500" size={30} />
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <OrdersManagement
                  orders={orders}
                  updateOrderStatus={updateOrderStatus}
                  cancelOrder={cancelOrder}
                /></div>)}
          </div>
        )}

        {/* Users Tab */}
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
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
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
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
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
