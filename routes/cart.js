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

      const retrievedUserId = req.session.userId;
      const order = req.body;
      const orderPrice = order.price * 100;
      const taxPrice = (orderPrice * 0.13);
      const orderNotes = order.notes;

      db.query(`INSERT INTO orders (status, total_price, taxes, notes, approx_time, payment_method, user_id)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      ;`, ['open', orderPrice, taxPrice, orderNotes, 25, 1, retrievedUserId]).then(() => {

        client.messages.create({
          to: process.env.MY_PHONE_NUMBER,
          from: '(864) 387-4042',
          body: 'Your order is confirmed'
        })
        .then((message) => {
          console.log(message.sid);
        })
      })

      let templateVars = { userId: req.session.userId };
      res.render("cart", templateVars);
  })

  return router;
};
