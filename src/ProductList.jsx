import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from './ThemeContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch(() => setError("Failed to load products"));
  }, []);

  if (error) return <p>{error}</p>;

  const themeStyles = {
    '--background-color': theme === 'light' ? '#fff' : '#333',
    '--text-color': theme === 'light' ? '#000' : '#fff',
    '--button-background': theme === 'light' ? '#333' : '#fff',
    '--button-text': theme === 'light' ? '#fff' : '#333',
    '--card-background': theme === 'light' ? '#f9f9f9' : '#444',
    '--card-border': theme === 'light' ? '#ddd' : '#555',
    '--secondary-text': theme === 'light' ? '#555' : '#ccc'
  };

  return (
    <div className="product-list-container" style={themeStyles}>
      <h2 className="product-list-title">Product List</h2>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.title} className="product-image"/>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
