import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import NetworkStatus from './components/NetworkStatus';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import FlyRequestPage from './pages/FlyRequestPage';
import LandingPage from './pages/LandingPage';
import RumbDetailPage from './pages/RumbDetailPage';
import RumbsPage from './pages/RumbsPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <NetworkStatus />
      <PWAUpdatePrompt />
      <PWAInstallPrompt className='mx-3 mt-3' />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/rumbs' element={<RumbsPage />} />
        <Route path='/rumb/:id' element={<RumbDetailPage />} />
        <Route path='/flyRequest' element={<FlyRequestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
