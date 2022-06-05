
const express = require('express')
const router = express.Router()
const cookieSession = require('cookie-session');
module.exports = (db) => {
  // GET /logout/
  router.get("/", (req, res) => {
    req.session = null;
    res.redirect('/home')
  });
  return router;
}