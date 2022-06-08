const express = require('express');
// const request = require('request');
const router  = express.Router();

module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    // console.log('This is the user id from cart',req.session.userId);
    res.render("cart",templateVars);
  });

  router.post("/", (req, res) => {
    //////////contain order info, and get user id req.session.
    let templateVars = { userId: req.session.userId };
    res.render("cart", templateVars);
  });


  router.post("/new", (req, res) => {
      console.log('req body:', req.body);
      console.log('cookies!:', req.session.userId)
      const retrievedUserId = req.session.userId
      const order = req.body;
      orderPrice = order.price * 100;
      taxPrice = (orderPrice * 0.13);

      db.query(`INSERT INTO orders (timestamp, status, total_price, taxes, notes, approx_time, payment_method, user_id)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
      ;`, ['2022-06-01 00:00:00', 'open', orderPrice, taxPrice, 'TEST', 25, 1, retrievedUserId])

      let templateVars = { userId: req.session.userId };
      res.render("cart", templateVars);
  })

  return router;
};


