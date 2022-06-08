const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {
    // const sqlquery = `SELECT 
    //   users.* ,
    //   dishes.title,
    //   dishes_orders.dish_id,
    //   total_price,
    //   notes,
    //   orders.user_id,
    //   dishes.price,
    //   orders.taxes,
    //   users.name,
    //   dishes_orders.order_id,
    //   dishes_orders.quantity,
    //   user_id,
    //   dishes.price * dishes_orders.quantity as amount,
    //   orders.status
    // FROM users
    // LEFT JOIN orders
    //   ON users.id = user_id
    // LEFT JOIN dishes_orders
    //   ON orders.id = order_id
    // LEFT JOIN dishes
    //   ON dishes_orders.dish_id = dishes.id
   
    
    // WHERE users.id = $1;
    // ;
    // `
    const queryForLatestOrder = 
    ` SELECT
        orders.id
      FROM orders
      WHERE orders.user_id = $1
      ORDER BY orders.id DESC 
      LIMIT 1        
      ;
    `
    const userId = [req.session.userId]
    console.log("login----------",userId[0])
    db.query(queryForLatestOrder,userId).then ((sqlresult) => {
      const latestOrder = sqlresult.rows[0]
      console.log('This is the latest order id',latestOrder.id)
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
      ;
      `
      db.query(queryForOrderDetails,[latestOrder.id]).then ((orderresults) => {
        console.log('this is the result of order details',orderresults.rows);
        const orderDetails = orderresults.rows
        let sum = 0;
        orderDetails.forEach(element => {
          // console.log("element",element.amount);
          sum = sum + element.total_price;  
        });
        let countTax = sum * (13/100);
        let templateVars = {orderDetails,sum,countTax,userId};
        res.render('profile',templateVars);
      });
    });
    // db.query(sqlquery,userId).then ((response) => {
    //   let users = response.rows // rename to order
    //   //console.log(users);
      
      
    //   // if(!users[0]){
    //   //   res.render('profile',templateVars);
    //   // }
      
    //   //console.log(templateVars)
    //   res.render('profile',templateVars);
    // });
});
return router;
}
