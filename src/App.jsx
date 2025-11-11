import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import {CartProvider} from './context/CartContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/service/:id' element={<ServiceDetailPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
