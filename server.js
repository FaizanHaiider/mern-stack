// requirements
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;

// get routes
const products = require("./routes/api/products");
const users = require("./routes/api/users");

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("db connected..."))
  .catch(err => console.log(err));

//  manage routes
app.use("/api/products", products);
app.use("/api/users", users);

app.listen(port, () => console.log(`Server running on port ${port}`));
