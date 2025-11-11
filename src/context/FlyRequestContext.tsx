import { createContext, ReactNode, useContext, useState } from 'react';
import { FlyRequestItem, Rumb, RumbParams } from '../types';

interface FlyRequestContextType {
  flyRequest: FlyRequestItem[];
  addToFlyRequest: (rumb: Rumb, params: RumbParams) => void;
  removeFromFlyRequest: (itemId: number) => void;
  clearFlyRequest: () => void;
}

const FlyRequestContext = createContext<FlyRequestContextType | undefined>(undefined);

interface FlyRequestProviderProps {
  children: ReactNode;
}

export function FlyRequestProvider({ children }: FlyRequestProviderProps) {
  const [flyRequest, setFlyRequest] = useState<FlyRequestItem[]>([]);

  const addToFlyRequest = (rumb: Rumb, params: RumbParams) => {
    setFlyRequest([...flyRequest, { ...rumb, params, id: Date.now() }]);
  };

  const removeFromFlyRequest = (itemId: number) => {
    setFlyRequest(flyRequest.filter(item => item.id !== itemId));
  };

  const clearFlyRequest = () => {
    setFlyRequest([]);
  };

  return (
    <FlyRequestContext.Provider
      value={{ flyRequest, addToFlyRequest, removeFromFlyRequest, clearFlyRequest }}>
      {children}
    </FlyRequestContext.Provider>
  );
}

export function useFlyRequest(): FlyRequestContextType {
  const context = useContext(FlyRequestContext);
  if (!context) {
    throw new Error('useFlyRequest must be used within FlyRequestProvider');
  }
  return context;
}
