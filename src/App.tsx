import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import {FlyRequestProvider} from './context/FlyRequestContext';
import FlyRequestPage from './pages/FlyRequestPage';
import HomePage from './pages/HomePage';
import RumbDetailPage from './pages/RumbDetailPage';

function App() {
  return (
    <FlyRequestProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/rumb/:id' element={<RumbDetailPage />} />
          <Route path='/flyRequest' element={<FlyRequestPage />} />
        </Routes>
      </Router>
    </FlyRequestProvider>
  );
}

export default App;
