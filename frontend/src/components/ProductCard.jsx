import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart, cart, updateQuantity } = useCart();
    const cartItem = cart.find((item) => item._id === product._id);

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative bg-gray-50 overflow-hidden h-56">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-white text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
                    {product.category}
                </span>
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-4">₹{product.price.toFixed(2)}</p>

                {cartItem ? (
                    <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl p-1 mt-auto">
                        <button
                            onClick={() => updateQuantity(product._id, cartItem.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-indigo-600" />
                            <span className="font-semibold text-sm text-indigo-700 min-w-[1rem] text-center">{cartItem.quantity}</span>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-auto flex items-center justify-center gap-2 w-full bg-gray-900 text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
