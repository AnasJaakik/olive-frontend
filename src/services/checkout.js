import { supabase } from '../lib/supabase';

export class CheckoutService {
  static async createPaymentIntent(checkoutData) {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: checkoutData
    });

    if (error) throw error;
    return data;
  }

  static async confirmOrder(orderNumber, customerEmail) {
    // This can be used to verify order status
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .eq('customer_email', customerEmail)
      .single();

    if (error) throw error;
    return data;
  }

  static validateCheckoutData(items, customerInfo, shippingAddress) {
    const errors = [];

    // Validate items
    if (!items || items.length === 0) {
      errors.push('Cart is empty');
    }

    // Validate customer info
    if (!customerInfo.email) {
      errors.push('Email is required');
    }

    // Validate shipping address
    const requiredFields = ['firstName', 'lastName', 'addressLine1', 'city', 'postalCode', 'country'];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        errors.push(`${field} is required`);
      }
    }

    return errors;
  }

  static calculateShipping(subtotal, country) {
    // Free shipping over €50 in Germany
    if (country === 'DE' && subtotal >= 50) return 0;
    
    // Shipping rates
    const rates = {
      'DE': 4.99,
      'AT': 6.99,
      'CH': 8.99,
      'FR': 7.99,
      'NL': 6.99,
      'BE': 6.99,
      'LU': 6.99,
    };
    
    return rates[country] || 12.99; // Default international rate
  }

  static calculateTax(subtotal, country) {
    // VAT rates by country
    const vatRates = {
      'DE': 0.19, // 19%
      'AT': 0.20, // 20%
      'FR': 0.20, // 20%
      'NL': 0.21, // 21%
      'BE': 0.21, // 21%
      'LU': 0.17, // 17%
    };
    
    const rate = vatRates[country] || 0;
    return subtotal * rate;
  }
}