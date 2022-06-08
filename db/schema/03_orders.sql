DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  STATUS VARCHAR(255) NOT NULL DEFAULT 'open',
  total_price INTEGER NOT NULL,
  taxes INTEGER NOT NULL,
  notes TEXT,
  approx_time INTEGER NOT NULL,
  payment_method INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
