const express = require('express');
const request = require('request');
const router  = express.Router();

module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    res.render("cart");
  });

  router.post("/", (req, res) => {
    console.log("BODY: ", req.body);
    res.render("cart");
  });

  return router;
};


