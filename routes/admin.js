const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for admin page
  router.get("/", (req, res) => {
    db.query(`SELECT *, users.name
    FROM orders
    JOIN users
    ON orders.user_id = users.id
    ORDER BY orders.timestamp;`).then((response) => {
      let orders = response.rows
      let templateVars = {userId : req.session.userId}
    // console.log('This is the user id from admin',req.session.userId);
      // console.log('orders:', orders)
      if (req.query.json) {
        res.json(orders)
      }

        res.render('admin',templateVars)

    });


    router.post("/", (req, res) => {
      console.log('req body:', req.body);
      console.log('cookies!:', req.session.userId)
      const retrievedUserId = req.session.userId
      const order = req.body;
      orderPrice = order.price * 100;
      taxPrice = orderPrice * 0.125;

      db.query(`INSERT INTO orders (timestamp, status, total_price, taxes, tip, notes, approx_time, payment_method, user_id)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ;`, ['2022-06-01 00:00:00', 'open', orderPrice, taxPrice, 0, 'TEST', 25, 1, retrievedUserId])

      let templateVars = { userId: req.session.userId };
      res.render("cart", templateVars);
    })
  });

return router;
}
