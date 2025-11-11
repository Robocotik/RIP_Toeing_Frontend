import {createContext, useContext, useState} from 'react';

const FlyRequestContext = createContext();

export function FlyRequestProvider({children}) {
  const [flyRequest, setFlyRequest] = useState([]);

  const addToFlyRequest = (rumb, params) => {
    setFlyRequest([...flyRequest, {...rumb, params, id: Date.now()}]);
  };

  const removeFromFlyRequest = itemId => {
    setFlyRequest(flyRequest.filter(item => item.id !== itemId));
  };

  const clearFlyRequest = () => {
    setFlyRequest([]);
  };

  return (
    <FlyRequestContext.Provider
      value={{flyRequest, addToFlyRequest, removeFromFlyRequest, clearFlyRequest}}>
      {children}
    </FlyRequestContext.Provider>
  );
}

export function useFlyRequest() {
  const context = useContext(FlyRequestContext);
  if (!context) {
    throw new Error('useFlyRequest must be used within FlyRequestProvider');
  }
  return context;
}
