import React, { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: "HP Pavilion Laptop",
      price: 65999,
      image:
        "https://m.media-amazon.com/images/I/71tHNTGasGL._SL1500_.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 78499,
      image:
        "https://m.media-amazon.com/images/I/71TawV8YsvL._SL1500_.jpg",
    },
    {
      id: 3,
      name: "Apple Watch Series 9",
      price: 44999,
      image:
        "https://m.media-amazon.com/images/I/61kWB+uzR2L._SL1500_.jpg",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Headphones",
      price: 29999,
      image:
        "https://m.media-amazon.com/images/I/61TnX0PmqES._SL1500_.jpg",
    },
    {
      id: 5,
      name: "iPad Air 5th Gen",
      price: 59999,
      image:
        "https://m.media-amazon.com/images/I/61XZQXFQeVL._SL1500_.jpg",
    },
  ];

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Buy Now (single product)
  const buyNow = (product) => {
    setPopup({
      title: "✅ Order Successful!",
      message: `${product.name} has been ordered successfully!`,
      product,
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Buy all items in cart
  const buyAll = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setPopup({
      title: "🎉 Purchase Completed!",
      message: `You have purchased ${cart.length} item(s) worth ₹${totalPrice}`,
      product: null,
    });
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 Electronic Device Store</h1>
        <button className="cart-btn" onClick={() => setShowCart(true)}>
          View Cart ({cart.length})
        </button>
      </header>

      {/* Product Grid */}
      <div className="product-container">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <div className="btn-group">
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
              <button className="buy-btn" onClick={() => buyNow(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup for Order Confirmation */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>{popup.title}</h2>
            <p>{popup.message}</p>
            {popup.product && (
              <>
                <img
                  src={popup.product.image}
                  alt={popup.product.name}
                  className="popup-img"
                />
                <p>
                  <strong>{popup.product.name}</strong> - ₹{popup.product.price}
                </p>
              </>
            )}
            <button className="close-btn" onClick={() => setPopup(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cart Popup */}
      {showCart && (
        <div className="popup-overlay" onClick={() => setShowCart(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>🧺 Your Cart</h2>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
                <hr />
                <h3>Total: ₹{totalPrice}</h3>
                <button className="buyall-btn" onClick={buyAll}>
                  Buy All
                </button>
              </>
            ) : (
              <p>Your cart is empty!</p>
            )}
            <button className="close-btn" onClick={() => setShowCart(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
