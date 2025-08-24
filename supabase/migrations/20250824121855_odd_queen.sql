/*
  # Initial Schema for Olive Oil E-commerce

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `products` - Product catalog
    - `product_variants` - Different sizes/variants of products
    - `orders` - Customer orders
    - `order_items` - Items within orders
    - `addresses` - Customer shipping addresses
    - `inventory` - Stock management
    - `reviews` - Product reviews
    - `newsletter_subscribers` - Email newsletter
    - `contact_messages` - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Public read access for products
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  long_description text,
  base_price decimal(10,2) NOT NULL,
  image_url text,
  gallery_urls text[],
  is_active boolean DEFAULT true,
  featured boolean DEFAULT false,
  harvest_year integer,
  origin text DEFAULT 'Marrakech, Morocco',
  variety text DEFAULT 'Haouzia',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Product variants (different sizes)
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL, -- e.g., "750ml", "500ml"
  size_ml integer NOT NULL,
  price decimal(10,2) NOT NULL,
  sku text UNIQUE NOT NULL,
  weight_grams integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active variants"
  ON product_variants
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text CHECK (type IN ('shipping', 'billing')) DEFAULT 'shipping',
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text,
  address_line_1 text NOT NULL,
  address_line_2 text,
  city text NOT NULL,
  state_province text,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'Germany',
  phone text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses"
  ON addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  order_number text UNIQUE NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  subtotal decimal(10,2) NOT NULL,
  shipping_cost decimal(10,2) DEFAULT 0,
  tax_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'EUR',
  
  -- Customer info (for guest orders)
  customer_email text NOT NULL,
  customer_phone text,
  
  -- Shipping address
  shipping_first_name text NOT NULL,
  shipping_last_name text NOT NULL,
  shipping_company text,
  shipping_address_line_1 text NOT NULL,
  shipping_address_line_2 text,
  shipping_city text NOT NULL,
  shipping_state_province text,
  shipping_postal_code text NOT NULL,
  shipping_country text NOT NULL,
  
  -- Billing address
  billing_first_name text,
  billing_last_name text,
  billing_company text,
  billing_address_line_1 text,
  billing_address_line_2 text,
  billing_city text,
  billing_state_province text,
  billing_postal_code text,
  billing_country text,
  
  -- Payment
  stripe_payment_intent_id text,
  payment_status text CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  
  -- Tracking
  tracking_number text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  
  -- Notes
  customer_notes text,
  admin_notes text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read orders by email"
  ON orders
  FOR SELECT
  TO anon, authenticated
  USING (true); -- We'll handle email verification in the application

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  variant_id uuid REFERENCES product_variants(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  product_name text NOT NULL, -- snapshot at time of order
  variant_name text NOT NULL, -- snapshot at time of order
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id uuid REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity_available integer NOT NULL DEFAULT 0,
  quantity_reserved integer NOT NULL DEFAULT 0,
  low_stock_threshold integer DEFAULT 10,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read inventory"
  ON inventory
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES orders(id),
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title text,
  comment text,
  is_verified boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);

-- Insert sample product data
INSERT INTO products (name, slug, description, long_description, base_price, harvest_year, variety, origin) VALUES
(
  'Abdeljalil Extra Virgin Olive Oil',
  'abdeljalil-extra-virgin-olive-oil',
  'Crafted from 100% Haouzia olives, native to the historic Haouz region, our extra virgin olive oil delivers a powerful and balanced flavour.',
  'Our oil offers an intense green fruitiness with distinct notes of artichoke, green almond, and fresh tomato, followed by a pleasant, peppery finish. It is a testament to a rich agricultural tradition, bringing a fresh and complex taste to your table. Hand-picked by our family, our Haouzia olives are pressed fresh at their peak harvest once a year.',
  29.00,
  2024,
  'Haouzia',
  'Marrakech, Morocco'
) ON CONFLICT (slug) DO NOTHING;

-- Insert product variants
INSERT INTO product_variants (product_id, name, size_ml, price, sku, weight_grams) 
SELECT 
  p.id,
  '750ml',
  750,
  29.00,
  'ABS-750-2024',
  800
FROM products p 
WHERE p.slug = 'abdeljalil-extra-virgin-olive-oil'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO product_variants (product_id, name, size_ml, price, sku, weight_grams) 
SELECT 
  p.id,
  '500ml',
  500,
  22.00,
  'ABS-500-2024',
  550
FROM products p 
WHERE p.slug = 'abdeljalil-extra-virgin-olive-oil'
ON CONFLICT (sku) DO NOTHING;

-- Insert initial inventory
INSERT INTO inventory (variant_id, quantity_available, low_stock_threshold)
SELECT pv.id, 100, 10
FROM product_variants pv
ON CONFLICT DO NOTHING;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();