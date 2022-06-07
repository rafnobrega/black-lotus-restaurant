const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM dishes;`)
      .then(data => {
        let menu = data.rows;
<<<<<<< HEAD
        let templateVars = { menu }
=======
        // console.log('menu:' ,menu)
        let templateVars = { menu,userId : req.session.userId}
>>>>>>> nav-style
        res.render('menu', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

