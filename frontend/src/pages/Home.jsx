import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-white flex flex-col pt-20 px-4">
            <div className="max-w-3xl mx-auto text-center flex-grow flex flex-col justify-center">
                <div className="mb-6">
                    <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-indigo-100 shadow-sm">
                        New Collection 2025
                    </span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                    Premium <br />
                    <span className="text-indigo-600">Essentials</span>
                </h1>
                <p className="max-w-xl text-lg text-gray-500 mx-auto mb-10">
                    Discover our curated collection of high-quality products designed for your everyday life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/products"
                        className="inline-block bg-indigo-600 text-white font-semibold py-3.5 px-10 rounded-full hover:bg-indigo-700 hover:shadow-lg transition-all shadow-md transform hover:-translate-y-0.5"
                    >
                        Shop Now
                    </Link>
                    <Link
                        to="/products"
                        className="inline-block bg-gray-50 text-gray-900 border border-gray-200 font-semibold py-3.5 px-10 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Browse Categories
                    </Link>
                </div>
            </div>

            <div className="mt-16 mb-24 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-2xl mx-auto text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-t border-gray-100 pt-10">
                <div className="pt-6 sm:pt-0">
                    <p className="text-4xl font-black text-gray-900">100+</p>
                    <p className="text-sm tracking-wide text-gray-500 mt-2 font-medium">Curated Products</p>
                </div>
                <div className="pt-6 sm:pt-0">
                    <p className="text-4xl font-black text-gray-900">24h</p>
                    <p className="text-sm tracking-wide text-gray-500 mt-2 font-medium">Fast Dispatch</p>
                </div>
                <div className="pt-6 sm:pt-0">
                    <p className="text-4xl font-black text-gray-900">4.9★</p>
                    <p className="text-sm tracking-wide text-gray-500 mt-2 font-medium">Customer Review</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
