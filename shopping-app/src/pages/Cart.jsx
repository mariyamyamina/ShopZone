import { useCart } from "../context/cartContext";
import { useState, useEffect } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.title} style={styles.image} />
              <div style={styles.info}>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <div style={styles.controls}>
                  <label>Qty: </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    style={styles.qty}
                  />
                  <button onClick={() => removeFromCart(item.id)} style={styles.remove}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h3 style={styles.total}>Total: ${getTotal()}</h3>
          <button onClick={handleCheckout} style={styles.checkout}>
            Checkout
          </button>
        </>
      )}

      {showPopup && (
        <div style={styles.popup}>
          Order placed successfully!
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  item: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "1rem 0",
  },
  image: {
    height: "100px",
    width: "100px",
    objectFit: "contain",
  },
  info: {
    flex: 1,
  },
  controls: {
    marginTop: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  qty: {
    width: "60px",
    padding: "0.3rem",
  },
  remove: {
    backgroundColor: "#ff4d4d",
    border: "none",
    padding: "0.5rem 1rem",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
  total: {
    textAlign: "right",
    marginTop: "1.5rem",
  },
  checkout: {
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
  },
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#4BB543",
    color: "#fff",
    padding: "1rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
};

export default Cart;
