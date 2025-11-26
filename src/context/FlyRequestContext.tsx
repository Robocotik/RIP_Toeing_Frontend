import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {FlyRequestItem, Rumb, RumbParams} from '../types';

interface FlyRequestContextType {
  flyRequest: FlyRequestItem[];
  addToFlyRequest: (rumb: Rumb, params: RumbParams) => void;
  removeFromFlyRequest: (id: number) => void;
  clearFlyRequest: () => void;
}

const FlyRequestContext = createContext<FlyRequestContextType | undefined>(undefined);

interface FlyRequestProviderProps {
  children: ReactNode;
}

export function FlyRequestProvider({children}: FlyRequestProviderProps) {
  const [flyRequest, setFlyRequest] = useState<FlyRequestItem[]>(() => {
    // Инициализация из localStorage
    const saved = localStorage.getItem('flyRequest');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Ошибка при парсинге данных корзины:', error);
        return [];
      }
    }
    return [];
  });

  // Сохранение в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('flyRequest', JSON.stringify(flyRequest));
    // Отправляем кастомное событие для синхронизации между компонентами
    window.dispatchEvent(new Event('flyRequestUpdated'));
  }, [flyRequest]);

  const addToFlyRequest = (rumb: Rumb, params: RumbParams) => {
    const newItem: FlyRequestItem = {
      ...rumb,
      params,
    };

    setFlyRequest(prev => {
      // Проверяем, есть ли уже румб с таким ID
      const existingIndex = prev.findIndex(item => item.id === rumb.id);

      if (existingIndex !== -1) {
        // Обновляем существующий элемент
        const updated = [...prev];
        updated[existingIndex] = newItem;
        return updated;
      } else {
        // Добавляем новый элемент
        return [...prev, newItem];
      }
    });
  };

  const removeFromFlyRequest = (id: number) => {
    setFlyRequest(prev => prev.filter(item => item.id !== id));
  };

  const clearFlyRequest = () => {
    setFlyRequest([]);
  };

  return (
    <FlyRequestContext.Provider
      value={{
        flyRequest,
        addToFlyRequest,
        removeFromFlyRequest,
        clearFlyRequest,
      }}>
      {children}
    </FlyRequestContext.Provider>
  );
}

export function useFlyRequest() {
  const context = useContext(FlyRequestContext);
  if (context === undefined) {
    throw new Error('useFlyRequest must be used within a FlyRequestProvider');
  }
  return context;
}
