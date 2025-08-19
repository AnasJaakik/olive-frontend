import React from "react";
import "./CartDrawer.css";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { state, close, remove, setQty, subtotal, count, clear } = useCart();
  const items = Object.entries(state.items); // [key, item]

  return (
    <aside className={`cart-drawer ${state.open ? "open" : ""}`} aria-hidden={!state.open}>
      <div className="cart-header">
        <h3>Cart ({count})</h3>
        <button className="cart-close" onClick={close} aria-label="Close cart">×</button>
      </div>

      <div className="cart-body">
        {items.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          items.map(([key, it]) => (
            <div className="cart-line" key={key}>
              <div className="cart-line-info">
                <div className="cart-line-title">{it.title}</div>
                <div className="cart-line-sub">{it.variant || "750ml"}</div>
              </div>

              <div className="cart-line-qty">
                <button onClick={() => setQty(key, Math.max(1, it.quantity - 1))} aria-label="Decrease">–</button>
                <input
                  aria-label="Quantity"
                  value={it.quantity}
                  onChange={(e) => setQty(key, Math.max(1, Number(e.target.value) || 1))}
                  type="number"               // <-- add this
                  inputMode="numeric"
                />
                <button onClick={() => setQty(key, it.quantity + 1)} aria-label="Increase">+</button>
              </div>

              <div className="cart-line-price">€{(it.price * it.quantity).toFixed(2)}</div>
              <button className="cart-remove" onClick={() => remove(key)}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-sub">
          <span>Subtotal</span>
          <strong>€{subtotal.toFixed(2)}</strong>
        </div>

        {/* Placeholder checkout (no Stripe/PayPal yet) */}
        <button
          className="cart-checkout"
          onClick={() => alert("Checkout coming soon!")}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>

        <div className="cart-note">Shipping & taxes calculated at checkout.</div>
        {items.length > 0 && (
          <button className="cart-clear" onClick={clear}>Clear cart</button>
        )}
      </div>
    </aside>
  );
}
