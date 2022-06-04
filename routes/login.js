const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /login/
  router.get("/", (req, res) => {
    res.render("login");
  });

  return router;
};
