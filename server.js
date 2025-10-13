// Import required packages
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON POST requests

// Sample products data
const products = [
  { id: 1, name: "HP Pavilion Laptop", price: 65999, image: "https://m.media-amazon.com/images/I/71tHNTGasGL._SL1500_.jpg" },
  { id: 2, name: "Samsung Galaxy S24", price: 78499, image: "https://m.media-amazon.com/images/I/71TawV8YsvL._SL1500_.jpg" },
  { id: 3, name: "Apple Watch Series 9", price: 44999, image: "https://m.media-amazon.com/images/I/61kWB+uzR2L._SL1500_.jpg" },
  { id: 4, name: "Sony WH-1000XM5 Headphones", price: 29999, image: "https://m.media-amazon.com/images/I/61TnX0PmqES._SL1500_.jpg" }
];

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Buy product route
app.post('/api/buy', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json({ message: `Purchase confirmed for ${product.name}` });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



