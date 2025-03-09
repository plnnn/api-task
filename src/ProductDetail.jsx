import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from './ThemeContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch(() => setError("Product not found"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const themeStyles = {
    '--background-color': theme === 'light' ? '#fff' : '#333',
    '--text-color': theme === 'light' ? '#000' : '#fff',
    '--button-background': theme === 'light' ? '#333' : '#fff',
    '--button-text': theme === 'light' ? '#fff' : '#333',
    '--button-border': theme === 'light' ? '#000' : '#fff'
  };

  return (
    <div className="product-detail-container" style={themeStyles}>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <h2 className="product-detail-title">{product.title}</h2>
      <img src={product.image} alt={product.title} className="product-detail-image"/>
      <p className="product-detail-description">{product.description}</p>
      <p className="product-detail-price">Price: ${product.price}</p>
      <button className="back-to-products-button" onClick={() => navigate("/")}>
        Back to Products
      </button>
    </div>
  );
};

export default ProductDetail;
