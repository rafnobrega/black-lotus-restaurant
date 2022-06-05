
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get request for profile page
  router.get('/' ,(req,res) => {
    db.query('SELECT * FROM users;').then ((response) => {
      console.log(response.rows);
      let templateVars = {
        users: response.rows
      };
      console.log(templateVars.users)
      res.render('profile',templateVars);
    });
});
return router;
}