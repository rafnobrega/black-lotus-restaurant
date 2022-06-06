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

    db.query(`SELECT *
    FROM users;`).then((result => {

      console.log('result.rows: ', result.rows)

      let userArray = result.rows;

      for (let i = 0; i < userArray.length; i++) {
      console.log('emails:', userArray[i].email)
      if (newUserEmail === userArray[i].email || newUserPassword === userArray[i].password || newUserNumber === userArray[i].phone) {
       return res.status(401).send("Error, something's already in use!");
         }
       }

      db.query(`INSERT INTO users
      (name, email, password, phone)
      VALUES ($1, $2, $3, $4);`,
      [newUserName, newUserEmail, newUserPassword, newUserNumber])

    }));

  })

  return router;
};


