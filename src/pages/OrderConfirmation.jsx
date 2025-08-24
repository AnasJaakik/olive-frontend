import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckoutService } from '../services/checkout';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const orderNumber = searchParams.get('order');

  useEffect(() => {
    if (orderNumber) {
      loadOrder();
    } else {
      setError('No order number provided');
      setLoading(false);
    }
  }, [orderNumber]);

  const loadOrder = async () => {
    try {
      // For now, we'll just show a success message
      // In a real app, you'd fetch the order details
      setOrder({ orderNumber });
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="order-confirmation">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <a href="/" className="btn-primary">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <div className="success-icon">✓</div>
        
        <h1>Order Confirmed!</h1>
        
        <p className="confirmation-message">
          Thank you for your order! We've received your payment and will begin processing your order shortly.
        </p>
        
        <div className="order-details">
          <h2>Order Details</h2>
          <div className="detail-row">
            <span>Order Number:</span>
            <strong>{orderNumber}</strong>
          </div>
        </div>
        
        <div className="next-steps">
          <h2>What's Next?</h2>
          <ul>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll send you tracking information once your order ships</li>
            <li>Your olive oil will be carefully packaged and shipped within 2-3 business days</li>
          </ul>
        </div>
        
        <div className="confirmation-actions">
          <a href="/" className="btn-primary">Continue Shopping</a>
          <a href="/contact" className="btn-secondary">Contact Us</a>
        </div>
      </div>
    </div>
  );
}