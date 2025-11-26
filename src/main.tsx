import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { FlyRequestProvider } from './context/FlyRequestContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FlyRequestProvider>
      <App />
    </FlyRequestProvider>
  </React.StrictMode>,
);
