const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
    {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and 40-hour battery life.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        category: "Electronics"
    },
    {
        name: "Minimalist Leather Watch",
        description: "Elegant and simple leather watch perfect for any occasion.",
        price: 129.50,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        category: "Accessories"
    },
    {
        name: "Mechanical Keyboard",
        description: "Tactile feedback and RGB backlighting for a superior typing experience.",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
        category: "Electronics"
    },
    {
        name: "Ergonomic Office Chair",
        description: "Comfortable office chair with lumbar support and adjustable height.",
        price: 249.00,
        image: "https://images.unsplash.com/photo-1505797149-43b0ad766a61?w=800&q=80",
        category: "Furniture"
    },
    {
        name: "Smart Speaker",
        description: "Voice-controlled smart speaker with high-fidelity sound and smart home integration.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
        category: "Electronics"
    },
    {
        name: "Minimalist Backpack",
        description: "Durable and stylish backpack with multiple compartments for your gear.",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        category: "Accessories"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log('Database Seeded!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
