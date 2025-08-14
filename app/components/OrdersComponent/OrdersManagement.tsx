import React from "react";
import { Check, Trash2 } from "lucide-react";

interface OrdersManagementProps {
  orders: any[];
  updateOrderStatus: (id: any, status: any) => void;
  cancelOrder: (id: any) => void;
}

const OrdersManagement: React.FC<OrdersManagementProps> = ({
  orders,
  updateOrderStatus,
  cancelOrder,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No orders found</p>
      ) : (
        <div className="bg-white border-gray-100 max-h-[400px] overflow-y-auto border overflow-x-auto rounded-lg">
          <table className="w-full min-w-[700px] text-sm text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10">
              <tr>
                <th className="p-3 font-semibold text-gray-700">Order ID</th>
                <th className="p-3 font-semibold text-gray-700">Items</th>
                <th className="p-3 font-semibold text-gray-700 text-center">Total</th>
                <th className="p-3 font-semibold text-gray-700 text-center">Address</th>
                <th className="p-3 font-semibold text-gray-700 text-center">Payment</th>
                <th className="p-3 font-semibold text-gray-700 text-center">Status</th>
                <th className="p-3 font-semibold text-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any, idx: number) => {
                const total = order.cart.reduce(
                  (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
                  0
                );

                return (
                  <tr
                    key={order._id}
                    className={`transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="p-3 font-medium text-gray-800">{order._id.slice(-6)}</td>
                    <td className="p-3">
                      <ul className="list-disc list-inside">
                        {order.cart.map((item: any) => (
                          <li key={item._id}>
                            {item.name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 text-center font-semibold text-gray-900">₹{total}</td>
                    <td className="p-3 text-center text-gray-700">{order.address || "—"}</td>
                    <td className="p-3 text-center text-gray-700">{order.payment}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      {order.status === "Pending" && (
                        <>
                          {/* Desktop Buttons */}
                          <div className="hidden sm:flex gap-2">
                            <button
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs"
                              onClick={() => updateOrderStatus(order._id, "Delivered")}
                            >
                              Mark Delivered
                            </button>
                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                              onClick={() => cancelOrder(order._id)}
                            >
                              Cancel Order
                            </button>
                          </div>

                          {/* Mobile Icons */}
                          <div className="flex sm:hidden gap-2">
                            <button
                              className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                              onClick={() => updateOrderStatus(order._id, "Delivered")}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                              onClick={() => cancelOrder(order._id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
