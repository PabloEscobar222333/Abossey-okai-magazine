-- =============================================
-- ABBOSSEY OKAI MARKETPLACE — DATABASE SCHEMA
-- Neon PostgreSQL
-- =============================================

-- 1. Users table (all roles: customer, merchant, admin)
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE,
  phone         VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name     VARCHAR(255),
  role          VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'merchant', 'admin')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Merchants table (shop profiles linked to user accounts)
CREATE TABLE IF NOT EXISTS merchants (
  id                 SERIAL PRIMARY KEY,
  user_id            INT REFERENCES users(id) ON DELETE CASCADE,
  shop_name          VARCHAR(255) NOT NULL,
  phone              VARCHAR(20),
  email              VARCHAR(255),
  location           TEXT,
  coordinates        VARCHAR(50),
  description        TEXT,
  specialty          VARCHAR(50),
  avatar_url         TEXT,
  verified           BOOLEAN DEFAULT FALSE,
  verification_notes TEXT,
  status             VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Inactive')),
  since              VARCHAR(20),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products table (parts + accessories listings)
CREATE TABLE IF NOT EXISTS products (
  id                 SERIAL PRIMARY KEY,
  merchant_id        INT REFERENCES merchants(id) ON DELETE CASCADE,
  main_type          VARCHAR(20) NOT NULL CHECK (main_type IN ('parts', 'accessories')),
  name               VARCHAR(255) NOT NULL,
  brand              VARCHAR(100),
  category           VARCHAR(100),
  condition          VARCHAR(20) CHECK (condition IN ('New', 'Used', 'Refurbished')),
  price              DECIMAL(10,2) NOT NULL,
  stock              VARCHAR(20) DEFAULT 'In Stock',
  status             VARCHAR(20) DEFAULT 'Live' CHECK (status IN ('Live', 'Hidden', 'Pending Review')),
  views              INT DEFAULT 0,
  images             TEXT[] DEFAULT '{}',
  description        TEXT,
  compatibility_text VARCHAR(50),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Product compatibility (vehicle fitment data)
CREATE TABLE IF NOT EXISTS product_compatibility (
  id         SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  make       VARCHAR(100) NOT NULL,
  model      VARCHAR(100) NOT NULL,
  years      VARCHAR(20)
);

-- 5. Categories (spare parts + accessories categories)
CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('parts', 'accessories'))
);

-- 6. Brands directory
CREATE TABLE IF NOT EXISTS brands (
  id       SERIAL PRIMARY KEY,
  slug     VARCHAR(100) UNIQUE,
  name     VARCHAR(100) UNIQUE NOT NULL,
  logo     VARCHAR(255),
  type     VARCHAR(20) DEFAULT 'vehicle' CHECK (type IN ('vehicle', 'aftermarket')),
  category VARCHAR(50) DEFAULT 'other'
);

-- 7. Admin settings (key-value store for platform config)
CREATE TABLE IF NOT EXISTS admin_settings (
  key        VARCHAR(100) PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Audit logs (admin action history)
CREATE TABLE IF NOT EXISTS audit_logs (
  id        SERIAL PRIMARY KEY,
  admin_id  INT REFERENCES users(id) ON DELETE SET NULL,
  action    VARCHAR(100),
  target    VARCHAR(255),
  details   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Reported listings
CREATE TABLE IF NOT EXISTS reported_listings (
  id         SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  reason     VARCHAR(255),
  details    TEXT,
  reporter_phone VARCHAR(20),
  status     VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Lead tracking
CREATE TABLE IF NOT EXISTS lead_tracking (
  id         SERIAL PRIMARY KEY,
  type       VARCHAR(20) NOT NULL CHECK (type IN ('whatsapp', 'maps')),
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_merchant_id ON products(merchant_id);
CREATE INDEX IF NOT EXISTS idx_products_main_type ON products(main_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_product_compat_product_id ON product_compatibility(product_id);
CREATE INDEX IF NOT EXISTS idx_product_compat_make_model ON product_compatibility(make, model);
CREATE INDEX IF NOT EXISTS idx_merchants_user_id ON merchants(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_reported_product_id ON reported_listings(product_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
