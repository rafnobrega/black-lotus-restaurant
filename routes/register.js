const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /register/
  router.get("/", (req, res) => {
    res.render("register");
  });

  return router;
};

