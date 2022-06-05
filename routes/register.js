const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET /register/
  router.get("/", (req, res) => {
    res.render("register");
  });



  router.post("/", (req, res) => {

    const newUserEmail = req.body.email;
    const newUserPassword = req.body.password;
    const newUserName = req.body.name;
    const newUserNumber = req.body.phoneNumber;


  if (newUserEmail === "" || newUserPassword === "" || newUserName === "" || newUserNumber === "") {
    return res.status(400).send("Please fill in all items.");
    }

  db.query(`SELECT email, password, phone
  FROM users
  WHERE email = $1
  AND password = $2
  AND phone = $3
  ;`, [newUserEmail, newUserPassword, newUserNumber]).then((result) => {
    if (result.rows.length == 0) {
    db.query(`INSERT INTO users
    (name, email, password, phone)
    VALUES ($1, $2, $3, $4)
    ;`, [newUserName, newUserEmail, newUserPassword, newUserNumber])
    }
  })






        res.send('Error!');
        return;

  })

  return router;
};


