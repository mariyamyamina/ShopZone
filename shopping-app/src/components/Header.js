import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#f8f8f8",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>🛍️ ShopZone</div>

      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Home
        </Link>
        <Link to="/cart" style={{ textDecoration: "none", color: "#333" }}>
          Cart ({cartItems.length})
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "red",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
