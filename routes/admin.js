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
      if (req.query.json) {
        res.json(orders)
      }

        res.render('admin')

    });
  });

return router;
}
