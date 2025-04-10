import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setFiltered(res.data);
    };

    const fetchCategories = async () => {
      const res = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(res.data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(result);
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="home" style={styles.container}>
      <h2 style={styles.heading}>Products</h2>

      <div style={styles.controls}>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          style={styles.select}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.grid}>
        {filtered.map((product) => (
          <div key={product.id} style={styles.card}>
            <Link to={`/products/${product.id}`} style={styles.link}>
              <img src={product.image} alt={product.title} style={styles.image} />
              <h4 style={styles.title}>{product.title}</h4>
              <p style={styles.price}>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "1200px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  search: {
    padding: "0.5rem",
    fontSize: "1rem",
    minWidth: "200px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1rem",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "0.2s",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  image: {
    height: "150px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1rem",
    height: "50px",
    overflow: "hidden",
  },
  price: {
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
};

export default Home;
