import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import {FlyRequestProvider} from './context/FlyRequestContext.tsx';
import './index.css';

// Регистрация Service Worker
console.log('Регистрация Service Worker...');

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('Требуется обновление приложения');
    if (confirm('Доступно обновление приложения. Обновить сейчас?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Приложение готово к работе в офлайн режиме');
  },
  onRegistered(r) {
    console.log('SW Registered: ' + r);
  },
  onRegisterError(error) {
    console.log('SW registration error', error);
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FlyRequestProvider>
      <App />
    </FlyRequestProvider>
  </React.StrictMode>,
);
