// requirements
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("db connected..."))
  .catch(err => console.log(err));

// initial root route
app.get("/", (req, res) => res.send("HelloWorld"));
app.listen(port, () => console.log(`Server running on port ${port}`));
