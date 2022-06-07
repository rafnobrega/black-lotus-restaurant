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
    console.log('This is the user id from admin',req.session.userId);
      console.log('orders:', orders)
      if (req.query.json) {
        res.json(orders)
      }

        res.render('admin',templateVars)

    });
  });

return router;
}
