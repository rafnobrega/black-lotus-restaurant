/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /home/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    //console.log('This is the user id ',req.session.userId);
    res.render("home",templateVars);
  });

  return router;
};



