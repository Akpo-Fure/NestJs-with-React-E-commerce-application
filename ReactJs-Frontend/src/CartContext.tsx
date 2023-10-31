/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer, ReactNode } from "react";

const CartContext = createContext<any>(null);

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.product];
    case "REMOVE_FROM_CART":
      return state.filter((item: any) => item.id !== action.productId);
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
