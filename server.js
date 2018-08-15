// requirements
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

// initial root route
app.get("/", (req, res) => res.send("HelloWorld"));
app.listen(port, () => console.log(`Server running on port ${port}`));
