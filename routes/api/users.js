const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    test users route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "users OK" }));

// @route   POST api/users/create
// @desc    create new user
// @access  public
router.post("/create", (req, res) => {
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return req.status(400).json({ name: "user already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        permission: req.body.permission
      });
      // create salt and hash plaintext password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
