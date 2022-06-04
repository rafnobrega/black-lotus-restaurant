DROP TABLE IF EXISTS dishes_orders CASCADE;

CREATE TABLE dishes_orders (
  dish_id INTEGER REFERENCES dishes(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER
);
