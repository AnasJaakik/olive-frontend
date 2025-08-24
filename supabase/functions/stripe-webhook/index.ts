import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )

    console.log(`Received event: ${event.type}`)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(`Webhook error: ${error.message}`, { status: 400 })
  }
})

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const orderNumber = paymentIntent.metadata.orderNumber
  
  if (!orderNumber) {
    console.error('No order number in payment intent metadata')
    return
  }

  try {
    // Update order status
    const { error: orderError } = await supabaseClient
      .from('orders')
      .update({
        status: 'confirmed',
        payment_status: 'paid',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', orderNumber)

    if (orderError) {
      console.error('Error updating order:', orderError)
      return
    }

    // Get order details for inventory update
    const { data: order, error: fetchError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('order_number', orderNumber)
      .single()

    if (fetchError || !order) {
      console.error('Error fetching order:', fetchError)
      return
    }

    // Update inventory
    for (const item of order.items) {
      const { error: inventoryError } = await supabaseClient.rpc(
        'update_inventory_on_purchase',
        {
          variant_id: item.variant_id,
          quantity_sold: item.quantity
        }
      )

      if (inventoryError) {
        console.error('Error updating inventory:', inventoryError)
      }
    }

    // Send confirmation email (you can implement this)
    console.log(`Order ${orderNumber} confirmed and inventory updated`)
    
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderNumber = paymentIntent.metadata.orderNumber
  
  if (!orderNumber) {
    console.error('No order number in payment intent metadata')
    return
  }

  try {
    const { error } = await supabaseClient
      .from('orders')
      .update({
        payment_status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', orderNumber)

    if (error) {
      console.error('Error updating failed payment:', error)
    } else {
      console.log(`Payment failed for order ${orderNumber}`)
    }
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}