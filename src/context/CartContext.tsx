import { createContext, useReducer, ReactNode } from "react";

interface CartItem {
  productId: string;
  name: string;
  selling: string;
  quantity: number | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

type Action =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; productId: string };

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: { items: CartItem[] }, action: Action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex: number = state.items.findIndex(
      (item) => item.productId === action.item.productId
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem.quantity) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        updatedItems[existingCartItemIndex] = updatedItem;
      }
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.productId === action.productId
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1 || existingItem.quantity === null) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item: CartItem) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(productId: string) {
    dispatchCartAction({ type: "REMOVE_ITEM", productId });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
