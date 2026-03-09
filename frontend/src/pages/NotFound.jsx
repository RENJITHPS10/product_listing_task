import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <h1 className="text-9xl font-black text-gray-200 tracking-tighter">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
            <Link
                to="/"
                className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
