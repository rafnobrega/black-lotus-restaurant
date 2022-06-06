/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /contact/
  router.get("/", (req, res) => {
    db.query("SELECT * FROM orders;").then((response) => {
      let orders = response.rows
      // console.log('orders:', orders)
      let templateVars = { orders };
      res.render('orders', templateVars);
    });
  });

  // GET /contact:id
  router.get("/:id", (req, res) => {
    db.query("SELECT * FROM orders WHERE id = $1;", [req.params.id]).then(
      (response) => {
        let templateVars = {
          showOrder: res.json(response.rows[0])
        };
        res.render('orders_show', templateVars);
      }
    );
  });
  return router;
};
