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
    // Показываем уведомление пользователю
    const event = new CustomEvent('sw-update-available');
    window.dispatchEvent(event);
  },
  onOfflineReady() {
    console.log('Приложение готово к работе в офлайн режиме');
    // Показываем уведомление о готовности к офлайн работе
    const event = new CustomEvent('sw-offline-ready');
    window.dispatchEvent(event);
  },
  onRegistered(r) {
    console.log('SW Registered: ', r);
  },
  onRegisterError(error) {
    console.log('SW registration error: ', error);
  },
  immediate: true,
});

// Экспортируем функцию обновления для использования в компонентах
window.updateSW = updateSW;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FlyRequestProvider>
      <App />
    </FlyRequestProvider>
  </React.StrictMode>,
);
