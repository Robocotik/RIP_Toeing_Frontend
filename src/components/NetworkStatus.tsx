import {useEffect, useState} from 'react';
import {Alert} from 'react-bootstrap';

function NetworkStatus() {
  const [showOfflineMessage, setShowOfflineMessage] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <Alert
      variant='warning'
      className='mx-3 mb-0'
      style={{position: 'sticky', top: 0, zIndex: 1020}}>
      <div className='d-flex align-items-center'>
        <i className='bi bi-wifi-off me-2'></i>
        <div>
          <strong>Нет подключения к интернету</strong>
          <br />
          <small>
            Приложение работает в офлайн режиме. Некоторые функции могут быть недоступны.
          </small>
        </div>
      </div>
    </Alert>
  );
}

export default NetworkStatus;
