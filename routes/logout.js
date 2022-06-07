
const express = require('express')
const router = express.Router()
const cookieSession = require('cookie-session');



module.exports = (db) => {
  router.get("/", (req, res) => {
      db.query(`SELECT *
      FROM users;`).then((result => {
        console.log('hello!')
        req.session = null;
        res.redirect("/home");
      }))

    });
  return router;
}
