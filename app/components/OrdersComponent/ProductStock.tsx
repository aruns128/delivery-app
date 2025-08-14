import React from 'react'


interface ProductStockProps {
  products: any[];
  toggleStock: (id: any, stock: any) => void;
  deleteProduct: (id: any) => void;
}


const ProductStock: React.FC<ProductStockProps> = ({ products, toggleStock, deleteProduct }) => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                {products.length === 0 ? (
                    <p className="p-6 text-gray-500 text-center">No products available</p>
                ) : (
                    <div className="bg-white border-gray-100 max-h-[400px] overflow-y-auto border  overflow-x-auto">
                        <table className="w-full min-w-[700px] text-sm text-left border-collapse">
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
                                        className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                                    >
                                        <td className="p-4">
                                            <img
                                                src={product.image ? `data:image/jpeg;base64,${product.image}` : "/tomoto.jpg"}
                                                alt={product.name}
                                                className="w-14 h-14 object-cover rounded-lg shadow-sm border border-gray-200"
                                            />
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                        <td className="p-4 font-semibold text-gray-900 text-center">₹{product.price}</td>
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
                                                className="px-3 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition text-xs"
                                            >
                                                {product.inStock ? "Set Out" : "Set In"}
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-xs"
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
        </div>
    )
}

export default ProductStock
