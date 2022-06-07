const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {
    const sqlquery = `SELECT dishes.title, dishes_orders.dish_id,total_price,
    notes,orders.user_id,dishes.price,orders.tip,orders.taxes,users.name,
    dishes_orders.order_id,dishes_orders.quantity,user_id,dishes.price * dishes_orders.quantity as amount,orders.status

    FROM dishes
    JOIN dishes_orders
    ON dishes_orders.dish_id = dishes.id
    JOIN orders
    ON orders.id = order_id
    JOIN users
    ON users.id = user_id
    WHERE orders.user_id = $1
    ;
    `
    const userId = [req.session.userId]
    db.query(sqlquery,userId).then ((response) => {
      let users = response.rows // rename to order
      // console.log(users);
      let sum = 0;
      users.forEach(element => {
        // console.log("element",element.amount);
        sum = sum + element.amount;
      });
      // if(!users[0]){
      //   res.render('profile',templateVars);
      // }
      let countTax = sum * (13/100);
      console.log('this is my tip',users[0].tip)
      let totalAmount = countTax + sum + users[0].tip;
      let templateVars = {users,sum,countTax,totalAmount,userId};

      res.render('profile',templateVars);
    });
});
return router;
}
