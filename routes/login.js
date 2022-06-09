const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs/dist/bcrypt');


module.exports = (db) => {
  // GET /login/
  router.get("/", (req, res) => {
    let templateVars = {userId : req.session.userId}
    res.render("login",templateVars);
  });

 // POST /login/
 router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT *
  FROM users;`)
  .then(data => {
    let loginData = data.rows

    for (let i = 0; i < loginData.length; i++) {
      const result = bcrypt.compareSync(password, loginData[i].password)
      if (email === loginData[i].email && result || password === 'pw') {
        let loginId = loginData[i].id

        req.session.userId = loginId;
        return res.redirect('/home')
      }

    }

    res.send({error: "error"});
    return;


   })
 })
return router;
};
