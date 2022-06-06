const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {


    db.query(`SELECT SUM(dishes.price * dishes_orders.quantity) AS sum,dishes.title, dishes_orders.dish_id,total_price,
    notes,orders.user_id,dishes.price,orders.tip,orders.taxes,users.name,
    dishes_orders.order_id,dishes_orders.quantity,user_id,dishes.price * dishes_orders.quantity as amount


    FROM dishes
    JOIN dishes_orders
    ON dishes_orders.dish_id = dishes.id
    JOIN orders
    ON orders.id = order_id
    JOIN users
    ON users.id = user_id
    WHERE orders.user_id = $1



    GROUP BY dishes.title,dish_id,
    dishes_orders.dish_id,orders.total_price,orders.notes,
    orders.user_id,dishes.price,orders.tip,orders.taxes,
    dishes_orders.order_id,dishes_orders.quantity,users.name;
    `,[1]).then ((response) => {

      let users = response.rows
      let templateVars = {users};

      console.log('users', users)
      res.render('profile',templateVars);
    });
});
return router;
}