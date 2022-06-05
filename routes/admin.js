const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for admin page
  router.get('/' ,(req,res) => {
    db.query('SELECT * FROM orders;').then ((response) => {
      let templateVars = {
        data: response.rows
      };
      res.render('admin',templateVars);
    });
});
return router;
}