const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /cart/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    console.log('This is the user id from cart',req.session.userId);
    res.render("cart",templateVars);
  });
  return router;
};


