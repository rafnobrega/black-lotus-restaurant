const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');







module.exports = (db) => {
  // GET /login/
  router.get("/", (req, res) => {
    res.render("login");
  });

 // POST /login/
 router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT email, password, users.id
  FROM users
  WHERE email = $1
  AND password = $2;`, [email, password])
  .then(data => {

    let loginData = data.rows
    let loginEmail = loginData[0].email
    let loginPassword = loginData[0].password
    let loginId = loginData[0].id


    if (loginEmail === email && loginPassword === password) {
        req.session.userId = loginId;
        return res.redirect('/home')
    }
    res.send({error: "error"});
          return;
   })
 })
return router;
};
