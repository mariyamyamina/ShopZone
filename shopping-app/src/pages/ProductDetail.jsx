import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext"; // Adjust path if needed
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  if (!product) return <p style={styles.loading}>Loading product...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={product.image} alt={product.title} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.title}>{product.title}</h2>
          <p style={styles.description}>{product.description}</p>
          <h3 style={styles.price}>${product.price}</h3>
          <button onClick={handleAddToCart} style={styles.button}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "auto",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    maxWidth: "300px",
    height: "auto",
    objectFit: "contain",
    alignSelf: "center",
  },
  details: {
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  description: {
    color: "#555",
    marginBottom: "1rem",
  },
  price: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.7rem 1.2rem",
    backgroundColor: "#2d87f0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductDetail;
