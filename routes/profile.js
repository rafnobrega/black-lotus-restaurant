const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get("/", (req, res) => {
    const queryForLatestOrder = ` SELECT
        orders.id
      FROM orders
      WHERE orders.user_id = $1
      ORDER BY orders.id DESC
      LIMIT 1
      ;
    `;
    const userId = [req.session.userId];
    db.query(queryForLatestOrder, userId).then((sqlresult) => {
      const latestOrder = sqlresult.rows[0];
      const queryForOrderDetails = `
      SELECT
        dishes.title,
        dishes.price,
        dishes_orders.dish_id,
        dishes_orders.order_id,
        dishes_orders.quantity,
        orders.id as latest_order_id,
        orders.total_price,
        orders.notes,
        orders.user_id,
        orders.taxes,
        orders.status,
        users.name
      FROM orders
      INNER JOIN users
        ON users.id = orders.user_id
      LEFT JOIN dishes_orders
        ON orders.id = dishes_orders.order_id
      LEFT JOIN dishes
        ON dishes_orders.dish_id = dishes.id

      WHERE orders.id = $1;
      `;
      db.query(queryForOrderDetails, [latestOrder.id]).then((orderresults) => {
        const orderDetails = orderresults.rows;
        console.log(orderDetails);
        let sum = 0;
        orderDetails.forEach((element) => {
          sum = sum + element.price;
        });
        let totalAmount = orderDetails[0].taxes + orderDetails[0].total_price;
        let templateVars = { orderDetails, sum, userId, totalAmount };
        res.render("profile", templateVars);
      });
    });
  });
  return router;
};
