import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            closeMenu();
        }
    };

    return (
        <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 -ml-2 rounded-md transition-colors"
                        >
                            <span className="sr-only">Open menu</span>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-start">
                        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
                            <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-sm">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                                ESSENTIALS
                            </span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8 items-center flex-1 justify-center">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`
                            }
                        >
                            Products
                        </NavLink>
                    </nav>

                    <div className="flex items-center justify-end flex-1 gap-4">
                        <form onSubmit={handleSearch} className="hidden md:flex items-center relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-48 focus:w-64 lg:focus:w-80 pl-10 pr-4 py-2 bg-gray-50 text-gray-900 border border-transparent hover:border-gray-200 rounded-full text-sm placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                            />
                        </form>

                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="group -m-2 p-2 flex items-center relative transition-transform hover:scale-105 active:scale-95"
                        >
                            <ShoppingBag className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
                            <span className="sr-only">items in cart, view bag</span>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white shadow-lg absolute w-full z-50 left-0">
                    <div className="px-4 pt-4 pb-2">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </form>
                    </div>
                    <div className="pt-2 pb-4 space-y-1 px-4">
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${isActive ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${isActive ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
                            }
                        >
                            Products
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
