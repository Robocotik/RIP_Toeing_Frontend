import {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
  const [cart, setCart] = useState([]);

  const addToCart = (service, params) => {
    setCart([...cart, {...service, params, id: Date.now()}]);
  };

  const removeFromCart = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
