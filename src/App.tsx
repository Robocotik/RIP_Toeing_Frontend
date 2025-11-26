import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import LandingPage from './pages/LandingPage';
import RumbDetailPage from './pages/RumbDetailPage';
import RumbsPage from './pages/RumbsPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/rumbs' element={<RumbsPage />} />
        <Route path='/rumb/:id' element={<RumbDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
