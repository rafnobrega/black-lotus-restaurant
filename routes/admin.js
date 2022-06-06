const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for admin page
  router.get("/", (req, res) => {
    db.query(`SELECT *, users.name, dishes.title
    FROM orders
    JOIN users
    ON orders.user_id = users.id
    JOIN dishes_orders
    ON orders.id = dishes_orders.order_id
    JOIN dishes
    ON dishes_orders.dish_id = dishes.id
    ORDER BY orders.timestamp;`).then((response) => {
      let orders = response.rows
      console.log('orders:', orders)
      let templateVars = { orders };
      res.render('admin', templateVars);
    });
  });

return router;
}
