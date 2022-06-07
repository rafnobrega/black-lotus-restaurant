const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    res.render("cart");
  });
  return router;
};


