const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {
    const sqlquery = `SELECT users.* ,dishes.title, dishes_orders.dish_id,total_price,
    notes,orders.user_id,dishes.price,orders.taxes,users.name,
    dishes_orders.order_id,dishes_orders.quantity,user_id,dishes.price * dishes_orders.quantity as amount,orders.status


    FROM users
    LEFT JOIN orders
    ON users.id = user_id
    LEFT JOIN dishes_orders
    ON orders.id = order_id
    LEFT JOIN dishes
    ON dishes_orders.dish_id = dishes.id
   
    
    WHERE users.id = $1;
    ;
    `
    const userId = [req.session.userId]
    console.log("login----------",userId[0])
    db.query(sqlquery,userId
    
    ).then ((response) => {
      let users = response.rows // rename to order
      console.log(users);
      let sum = 0;
      users.forEach(element => {
        // console.log("element",element.amount);
        sum = sum + element.amount;
      });
      // if(!users[0]){
      //   res.render('profile',templateVars);
      // }
      let countTax = sum * (13/100);
      let totalAmount = countTax + sum ;
      let templateVars = {users,sum,countTax,totalAmount,userId};
      console.log(templateVars)
      res.render('profile',templateVars);
    });
});
return router;
}
