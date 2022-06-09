const express = require('express');
// const request = require('request');
const router  = express.Router();
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);






module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    res.render("cart",templateVars);
  });

  router.post("/", (req, res) => {
    let templateVars = { userId: req.session.userId };
    res.render("cart", templateVars);
  });


  router.post("/new", (req, res) => {
    // console.log(' poop req body: ', req.body)
      const retrievedUserId = req.session.userId;
      const order = req.body;
      // console.log('will this work?', req.body.order)
      let orderArray = req.body.order;
      const orderPrice = order.price * 100;
      const taxPrice = (orderPrice * 0.13);
      const orderNotes = order.notes;
      console.log("orderNotes::::::", orderNotes);
      console.log('orderNotes = ', orderNotes)

      db.query(`INSERT INTO orders (status, total_price, taxes, notes, approx_time, payment_method, user_id)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      ;`, ['open', orderPrice, taxPrice, orderNotes, 25, 1, retrievedUserId]).then((result) => {
        client.messages.create({

          to: process.env.MY_PHONE_NUMBER,
          from: '(864) 387-4042',
          body: `Your order is confirmed. It will be ready for pickup in ${result.rows[0].approx_time} minutes.`
        })
        .then((message) => {
          console.log(message.sid);
        })
        const orderId = result.rows[0].id

        for (let index of orderArray) {
          // console.log('id', index.dishId )
          // console.log('quantity:', index.quantity)
          // console.log('title: ', index.dishTitle)
          // console.log('price', index.price);

        db.query(`INSERT INTO dishes_orders (dish_id, order_id, quantity)
        VALUES ($1, $2 , $3)
        ;`, [index.dishId, orderId ,index.quantity])
        }
      })

      let templateVars = { userId: req.session.userId };
      res.render("cart", templateVars);
  })

  return router;
};
