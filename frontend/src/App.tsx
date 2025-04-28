import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to="/product" replace />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductForm />} />
    </Routes>
  </Router>
);

export default App;
