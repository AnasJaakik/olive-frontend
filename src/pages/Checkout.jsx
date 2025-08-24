import React, { useState } from 'react';
import { useCart } from '../cart/CartContext';
import { CheckoutService } from '../services/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { state, clear } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
  });
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'DE',
    phone: '',
  });
  
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: 'DE',
  });
  
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [customerNotes, setCustomerNotes] = useState('');

  const items = Object.entries(state.items);
  const subtotal = items.reduce((sum, [, item]) => sum + (item.price * item.quantity), 0);
  const shippingCost = CheckoutService.calculateShipping(subtotal, shippingAddress.country);
  const taxAmount = CheckoutService.calculateTax(subtotal, shippingAddress.country);
  const total = subtotal + shippingCost + taxAmount;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    setError('');

    try {
      // Validate form data
      const validationErrors = CheckoutService.validateCheckoutData(
        items.map(([, item]) => item),
        customerInfo,
        shippingAddress
      );
      
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        setLoading(false);
        return;
      }

      // Create payment intent
      const checkoutData = {
        items: items.map(([, item]) => ({
          id: item.id,
          variant: item.variant || '750ml',
          quantity: item.quantity,
          price: item.price,
          title: item.title,
        })),
        customerEmail: customerInfo.email,
        shippingAddress,
        billingAddress: useSameAddress ? shippingAddress : billingAddress,
        customerNotes,
      };

      const { clientSecret, orderNumber } = await CheckoutService.createPaymentIntent(checkoutData);

      // Confirm payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: useSameAddress ? shippingAddress.addressLine1 : billingAddress.addressLine1,
              line2: useSameAddress ? shippingAddress.addressLine2 : billingAddress.addressLine2,
              city: useSameAddress ? shippingAddress.city : billingAddress.city,
              state: useSameAddress ? shippingAddress.stateProvince : billingAddress.stateProvince,
              postal_code: useSameAddress ? shippingAddress.postalCode : billingAddress.postalCode,
              country: useSameAddress ? shippingAddress.country : billingAddress.country,
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        // Payment successful
        clear();
        window.location.href = `/order-confirmation?order=${orderNumber}`;
      }
    } catch (err) {
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart before checking out.</p>
        <a href="/products" className="btn-primary">Shop Now</a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <h1>Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <section className="checkout-section">
              <h2>Contact Information</h2>
              <div className="form-row">
                <input
                  type="email"
                  placeholder="Email address"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="checkout-section">
              <h2>Shipping Address</h2>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="First name"
                  value={shippingAddress.firstName}
                  onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={shippingAddress.lastName}
                  onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Company (optional)"
                value={shippingAddress.company}
                onChange={(e) => setShippingAddress({...shippingAddress, company: e.target.value})}
              />
              <input
                type="text"
                placeholder="Address line 1"
                value={shippingAddress.addressLine1}
                onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Address line 2 (optional)"
                value={shippingAddress.addressLine2}
                onChange={(e) => setShippingAddress({...shippingAddress, addressLine2: e.target.value})}
              />
              <div className="form-row">
                <input
                  type="text"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="State/Province"
                  value={shippingAddress.stateProvince}
                  onChange={(e) => setShippingAddress({...shippingAddress, stateProvince: e.target.value})}
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Postal code"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                  required
                />
                <select
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  required
                >
                  <option value="DE">Germany</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                  <option value="FR">France</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                  <option value="LU">Luxembourg</option>
                </select>
              </div>
            </section>

            {/* Billing Address */}
            <section className="checkout-section">
              <div className="checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                  />
                  Use same address for billing
                </label>
              </div>
              
              {!useSameAddress && (
                <>
                  <h2>Billing Address</h2>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="First name"
                      value={billingAddress.firstName}
                      onChange={(e) => setBillingAddress({...billingAddress, firstName: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={billingAddress.lastName}
                      onChange={(e) => setBillingAddress({...billingAddress, lastName: e.target.value})}
                      required
                    />
                  </div>
                  {/* Add other billing address fields similar to shipping */}
                </>
              )}
            </section>

            {/* Payment */}
            <section className="checkout-section">
              <h2>Payment</h2>
              <div className="card-element-container">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }}
                />
              </div>
            </section>

            {/* Order Notes */}
            <section className="checkout-section">
              <h2>Order Notes (Optional)</h2>
              <textarea
                placeholder="Special instructions for your order..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={3}
              />
            </section>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="checkout-submit"
              disabled={!stripe || loading}
            >
              {loading ? 'Processing...' : `Pay €${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {items.map(([key, item]) => (
              <div key={key} className="summary-item">
                <div className="item-info">
                  <div className="item-name">{item.title}</div>
                  <div className="item-variant">{item.variant || '750ml'}</div>
                  <div className="item-quantity">Qty: {item.quantity}</div>
                </div>
                <div className="item-price">€{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>€{taxAmount.toFixed(2)}</span>
            </div>
            <div className="total-row total-final">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}