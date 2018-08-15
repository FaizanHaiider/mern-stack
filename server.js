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

// get routes
const products = require("./routes/api/products");
const users = require("./routes/api/users");

//  manage routes
app.get("/", (req, res) => res.send("HelloWorld"));
app.use("/api/products", products);
app.use("/api/users", users);

app.listen(port, () => console.log(`Server running on port ${port}`));
