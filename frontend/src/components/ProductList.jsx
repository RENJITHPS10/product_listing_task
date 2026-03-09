import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Furniture'];

const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const activeCategory = searchParams.get('category') || 'All';

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products', keyword],
        queryFn: () => fetchProducts(keyword),
    });

    const { data: allProducts } = useQuery({
        queryKey: ['products', ''],
        queryFn: () => fetchProducts(''),
        enabled: keyword.length > 0,
    });

    const noResultsForKeyword = keyword && products && products.length === 0;
    const baseProducts = noResultsForKeyword ? allProducts : products;

    const displayProducts = activeCategory === 'All'
        ? baseProducts
        : baseProducts?.filter((p) => p.category === activeCategory);

    const handleCategoryChange = (cat) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete('keyword');
            if (cat === 'All') {
                next.delete('category');
            } else {
                next.set('category', cat);
            }
            return next;
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="animate-pulse flex flex-col">
                            <div className="bg-gray-200 rounded-2xl h-64 sm:h-80 w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Failed to load products</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">{error?.message || 'There was a problem connecting to the server.'}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-900 text-white font-medium py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

            {noResultsForKeyword && (
                <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-4">
                    <svg className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                    </svg>
                    <div>
                        <p className="font-semibold">No results for &quot;{keyword}&quot;</p>
                        <p className="text-sm mt-0.5 text-amber-700">We couldn&apos;t find anything matching your search. Here are all our products instead.</p>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory === cat
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
                            }`}
                    >
                        {cat}
                    </button>
                ))}

                <span className="ml-auto self-center text-sm text-gray-400">
                    {displayProducts?.length || 0} product{displayProducts?.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    {keyword && !noResultsForKeyword
                        ? `Results for "${keyword}"`
                        : activeCategory === 'All' ? 'All Products' : activeCategory}
                </h2>
            </div>

            {displayProducts?.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-gray-500 text-lg">No products in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
                    {displayProducts?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
