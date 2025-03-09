import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
