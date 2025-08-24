import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CartItem {
  id: string
  variant: string
  quantity: number
  price: number
  title: string
}

interface PaymentRequest {
  items: CartItem[]
  customerEmail: string
  shippingAddress: {
    firstName: string
    lastName: string
    company?: string
    addressLine1: string
    addressLine2?: string
    city: string
    stateProvince?: string
    postalCode: string
    country: string
    phone?: string
  }
  billingAddress?: {
    firstName: string
    lastName: string
    company?: string
    addressLine1: string
    addressLine2?: string
    city: string
    stateProvince?: string
    postalCode: string
    country: string
  }
  customerNotes?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { items, customerEmail, shippingAddress, billingAddress, customerNotes }: PaymentRequest = await req.json()

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = calculateShipping(subtotal, shippingAddress.country)
    const taxAmount = calculateTax(subtotal, shippingAddress.country)
    const totalAmount = subtotal + shippingCost + taxAmount

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        orderNumber,
        customerEmail,
      },
      receipt_email: customerEmail,
      shipping: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        address: {
          line1: shippingAddress.addressLine1,
          line2: shippingAddress.addressLine2 || undefined,
          city: shippingAddress.city,
          state: shippingAddress.stateProvince || undefined,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
      },
    })

    // Create order in database
    const orderData = {
      order_number: orderNumber,
      customer_email: customerEmail,
      subtotal,
      shipping_cost: shippingCost,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      currency: 'EUR',
      
      // Shipping address
      shipping_first_name: shippingAddress.firstName,
      shipping_last_name: shippingAddress.lastName,
      shipping_company: shippingAddress.company,
      shipping_address_line_1: shippingAddress.addressLine1,
      shipping_address_line_2: shippingAddress.addressLine2,
      shipping_city: shippingAddress.city,
      shipping_state_province: shippingAddress.stateProvince,
      shipping_postal_code: shippingAddress.postalCode,
      shipping_country: shippingAddress.country,
      
      // Billing address (use shipping if not provided)
      billing_first_name: billingAddress?.firstName || shippingAddress.firstName,
      billing_last_name: billingAddress?.lastName || shippingAddress.lastName,
      billing_company: billingAddress?.company || shippingAddress.company,
      billing_address_line_1: billingAddress?.addressLine1 || shippingAddress.addressLine1,
      billing_address_line_2: billingAddress?.addressLine2 || shippingAddress.addressLine2,
      billing_city: billingAddress?.city || shippingAddress.city,
      billing_state_province: billingAddress?.stateProvince || shippingAddress.stateProvince,
      billing_postal_code: billingAddress?.postalCode || shippingAddress.postalCode,
      billing_country: billingAddress?.country || shippingAddress.country,
      
      stripe_payment_intent_id: paymentIntent.id,
      customer_notes: customerNotes,
      status: 'pending',
      payment_status: 'pending',
    }

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id.split(':')[0], // Extract product ID from cart key
      variant_id: item.id, // This should be the actual variant ID
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      product_name: item.title,
      variant_name: item.variant,
    }))

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        orderNumber,
        orderId: order.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

function calculateShipping(subtotal: number, country: string): number {
  // Free shipping over €50 in Germany
  if (country === 'DE' && subtotal >= 50) return 0
  
  // Shipping rates
  const rates = {
    'DE': 4.99,
    'AT': 6.99,
    'CH': 8.99,
    'FR': 7.99,
    'NL': 6.99,
    'BE': 6.99,
    'LU': 6.99,
  }
  
  return rates[country] || 12.99 // Default international rate
}

function calculateTax(subtotal: number, country: string): number {
  // VAT rates by country
  const vatRates = {
    'DE': 0.19, // 19%
    'AT': 0.20, // 20%
    'FR': 0.20, // 20%
    'NL': 0.21, // 21%
    'BE': 0.21, // 21%
    'LU': 0.17, // 17%
  }
  
  const rate = vatRates[country] || 0
  return subtotal * rate
}