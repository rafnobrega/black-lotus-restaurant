// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession =require('cookie-session');


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(cookieSession({
  name: 'session',
  keys: ['door', 'wind', 'bird', 'valise' ],
}));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const cartRoutes = require("./routes/cart");
const registerRoutes = require("./routes/register");
const menuRoutes = require("./routes/menu");
const usersRoutes = require("./routes/users");
const contactRoutes = require("./routes/contact");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const widgetsRoutes = require("./routes/widgets");
const homeRoutes = require("./routes/home");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", loginRoutes(db));
app.use("/admin", adminRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/cart", cartRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/contact", contactRoutes(db));
app.use("/home", homeRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/profile", profileRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
