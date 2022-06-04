const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /login/
  router.get("/", (req, res) => {
    res.render("login");
  });

 router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

 })

return router;
};
