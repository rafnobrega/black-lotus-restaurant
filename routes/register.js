const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // GET /register/
  router.get("/", (req, res) => {
    let templateVars = { userId: req.session.userId };
    res.render("register", templateVars);
  });

  router.post("/", (req, res) => {
    const newUserEmail = req.body.email;
    const newUserPassword = req.body.password;
    const newUserName = req.body.name;
    const newUserNumber = req.body.phoneNumber;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(newUserPassword, salt);

    if (
      newUserEmail === "" ||
      newUserPassword === "" ||
      newUserName === "" ||
      newUserNumber === ""
    ) {
      return res.status(400).send("Please fill in all items.");
    }

    db.query(
      `SELECT *
    FROM users;`
    ).then((result) => {
      let userArray = result.rows;

      for (let i = 0; i < userArray.length; i++) {
        // const result = bcrypt.compareSync(newUserPassword, userArray[i].password)
        // result = bcrypt.compareSync(password, hashedPassword);

        if (
          newUserEmail === userArray[i].email ||
          hash === userArray[i].password ||
          newUserNumber === userArray[i].phone
        ) {
          return res.status(401).send("Error, something's already in use!");
        }
      }

      db.query(
        `INSERT INTO users
      (name, email, password, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING users.id;`,
        [newUserName, newUserEmail, hash, newUserNumber]
      ).then((result) => {
        let loginId = result.rows[0].id;
        req.session.userId = loginId;

        res.redirect("/home");
      });
    });
  });

  return router;
};
