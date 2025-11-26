import {useEffect, useState} from 'react';
import {Alert, Button} from 'react-bootstrap';

function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [showOfflineReady, setShowOfflineReady] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setShowUpdatePrompt(true);
    };

    const handleOfflineReady = () => {
      setShowOfflineReady(true);
      // Автоматически скрыть через 5 секунд
      setTimeout(() => setShowOfflineReady(false), 5000);
    };

    window.addEventListener('sw-update-available', handleUpdateAvailable);
    window.addEventListener('sw-offline-ready', handleOfflineReady);

    return () => {
      window.removeEventListener('sw-update-available', handleUpdateAvailable);
      window.removeEventListener('sw-offline-ready', handleOfflineReady);
    };
  }, []);

  const handleUpdate = async () => {
    if (window.updateSW) {
      await window.updateSW(true);
    }
    setShowUpdatePrompt(false);
  };

  return (
    <>
      {showUpdatePrompt && (
        <Alert
          variant='info'
          className='position-fixed top-0 start-50 translate-middle-x mt-3'
          style={{zIndex: 9999, maxWidth: '400px'}}>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <strong>Обновление доступно</strong>
              <br />
              <small>Новая версия приложения готова к установке</small>
            </div>
            <div>
              <Button variant='primary' size='sm' className='me-2' onClick={handleUpdate}>
                Обновить
              </Button>
              <Button
                variant='outline-secondary'
                size='sm'
                onClick={() => setShowUpdatePrompt(false)}>
                Позже
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {showOfflineReady && (
        <Alert
          variant='success'
          className='position-fixed bottom-0 end-0 m-3'
          style={{zIndex: 9999, maxWidth: '300px'}}>
          <strong>✅ Готово к работе офлайн</strong>
          <br />
          <small>Приложение теперь работает без интернета</small>
        </Alert>
      )}
    </>
  );
}

export default PWAUpdatePrompt;
