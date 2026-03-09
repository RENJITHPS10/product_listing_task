import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const fetchProducts = async (keyword = '') => {
    const url = keyword ? `/products?keyword=${keyword}` : '/products';
    const response = await api.get(url);
    return response.data;
};

export const fetchProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
};

export default api;
