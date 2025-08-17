import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "OPEN": return { ...state, open: true };
    case "CLOSE": return { ...state, open: false };
    case "ADD": {
      const key = `${action.item.id}:${action.item.variant || "default"}`;
      const cur = state.items[key];
      const qty = (cur?.quantity || 0) + (action.item.quantity || 1);
      return {
        ...state,
        items: { ...state.items, [key]: { ...action.item, quantity: qty } },
      };
    }
    case "REMOVE": {
      const copy = { ...state.items };
      delete copy[action.key];
      return { ...state, items: copy };
    }
    case "SET_QTY": {
      const cur = state.items[action.key];
      if (!cur) return state;
      return {
        ...state,
        items: { ...state.items, [action.key]: { ...cur, quantity: action.quantity } },
      };
    }
    case "CLEAR": return { open: state.open, items: {} };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { open: false, items: {} });

  const subtotal = useMemo(
    () => Object.values(state.items).reduce((s, it) => s + it.price * it.quantity, 0),
    [state.items]
  );
  const count = useMemo(
    () => Object.values(state.items).reduce((s, it) => s + it.quantity, 0),
    [state.items]
  );

  const api = useMemo(() => ({
    state,
    open: () => dispatch({ type: "OPEN" }),
    close: () => dispatch({ type: "CLOSE" }),
    add: (item) => dispatch({ type: "ADD", item }),
    remove: (key) => dispatch({ type: "REMOVE", key }),
    setQty: (key, quantity) => dispatch({ type: "SET_QTY", quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
    subtotal,
    count
  }), [state, subtotal, count]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
