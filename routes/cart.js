const express = require('express');
const request = require('request');
const router  = express.Router();

module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    console.log('This is the user id from cart',req.session.userId);
    res.render("cart",templateVars);
  });

  router.post("/", (req, res) => {
    let templateVars = { userId: req.session.userId };
    console.log("BODY: ", req.body);
    res.render("cart", templateVars);
  });

  return router;
};


