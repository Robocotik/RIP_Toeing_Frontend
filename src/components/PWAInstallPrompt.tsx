import {useEffect, useState} from 'react';
import {Alert} from 'react-bootstrap';

interface PWAInstallPromptProps {
  className?: string;
}

function PWAInstallPrompt({className = ''}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Предотвращаем автоматический показ браузерного промпта
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA было установлено');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Показываем промпт установки
    deferredPrompt.prompt();

    // Ждем ответа пользователя
    const {outcome} = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('Пользователь согласился установить PWA');
    } else {
      console.log('Пользователь отклонил установку PWA');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <Alert
      variant='info'
      className={`d-flex justify-content-between align-items-center ${className}`}>
      <div>
        <strong>Установить приложение</strong>
        <br />
        <small>Добавьте Toeing на главный экран для быстрого доступа</small>
      </div>
      <div>
        <button className='btn btn-primary btn-sm me-2' onClick={handleInstallClick}>
          Установить
        </button>
        <button
          className='btn btn-outline-secondary btn-sm'
          onClick={() => setShowInstallPrompt(false)}>
          Позже
        </button>
      </div>
    </Alert>
  );
}

export default PWAInstallPrompt;
