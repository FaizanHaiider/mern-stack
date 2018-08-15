const express = require("express");
const router = express.Router();

// @route   GET api/products/test
// @desc    test products route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "products OK" }));

module.exports = router;
