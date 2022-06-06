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

  db.query(`SELECT *
  FROM users;`)
  .then(data => {
    let loginData = data.rows
    console.log('data.rows: ', data.rows)


    for (let i = 0; i < loginData.length; i++) {
      if (email === loginData[i].email && password === loginData[i].password) {
        let loginId = loginData[i].id
        console.log('loginID: ', loginId)
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
