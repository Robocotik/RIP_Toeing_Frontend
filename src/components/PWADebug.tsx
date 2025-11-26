import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

function PWADebug() {
  const [pwaInfo, setPwaInfo] = useState<string[]>([]);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const info: string[] = [];
    
    // Проверяем Service Worker
    if ('serviceWorker' in navigator) {
      info.push('✅ Service Worker поддерживается');
      
      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length > 0) {
          info.push(`✅ Service Worker зарегистрирован (${registrations.length})`);
        } else {
          info.push('❌ Service Worker не зарегистрирован');
        }
        setPwaInfo([...info]);
      });
    } else {
      info.push('❌ Service Worker не поддерживается');
    }

    // Проверяем manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      info.push('✅ Manifest найден в HTML');
    } else {
      info.push('❌ Manifest не найден в HTML');
    }

    // Проверяем standalone режим
    if (window.matchMedia('(display-mode: standalone)').matches) {
      info.push('✅ Приложение запущено в standalone режиме');
      setIsInstalled(true);
    } else {
      info.push('ℹ️ Приложение запущено в браузере');
    }

    // Проверяем HTTPS
    if (location.protocol === 'https:' || location.hostname === 'localhost') {
      info.push('✅ HTTPS/localhost - PWA может работать');
    } else {
      info.push('❌ HTTP - PWA не будет работать');
    }

    setPwaInfo(info);
  }, []);

  // В production не показываем отладочную информацию
  if (import.meta.env.PROD && !new URLSearchParams(location.search).has('debug')) {
    return null;
  }

  return (
    <Alert variant={isInstalled ? 'success' : 'info'} className="mx-3 mt-2">
      <strong>PWA Status:</strong>
      <ul className="mb-0 mt-2" style={{ fontSize: '12px' }}>
        {pwaInfo.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
      {!isInstalled && (
        <small className="d-block mt-2">
          💡 Добавьте ?debug=1 к URL для отладки в production
        </small>
      )}
    </Alert>
  );
}

export default PWADebug;
