import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <div className="bg-gray-50 min-h-screen pt-12 pb-24 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10">Shopping Bag</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
                        <div className="bg-gray-50 p-6 rounded-full inline-block mb-6">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Your bag is empty</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your bag yet. Let's change that.</p>
                        <Link
                            to="/products"
                            className="bg-indigo-600 text-white font-medium py-3.5 px-10 rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-x-12 gap-y-10">
                        <div className="lg:w-2/3">
                            <ul role="list" className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                                {cart.map((item) => (
                                    <li key={item._id} className="p-6 sm:p-8 flex items-center group">
                                        <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col justify-between h-32">
                                            <div className="flex justify-between w-full">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900 ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="p-2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-50 rounded-l-full transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="p-2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-50 rounded-r-full transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="font-medium flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-28">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                                <dl className="space-y-4 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <dt>Subtotal</dt>
                                        <dd className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Shipping estimate</dt>
                                        <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Tax estimate</dt>
                                        <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                                        <dt className="text-base font-bold text-gray-900">Estimated Total</dt>
                                        <dd className="text-2xl font-black text-gray-900">₹{totalPrice.toFixed(2)}</dd>
                                    </div>
                                </dl>

                                <button
                                    className="w-full mt-8 bg-gray-900 text-white font-semibold py-4 px-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200/50 flex items-center justify-center gap-2 group"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link
                                            to="/products"
                                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                        >
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
