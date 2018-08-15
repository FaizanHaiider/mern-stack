const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const key = require("../../config/keys").secret_key;
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

// @route   GET api/users/login
// @desc    log user in
// @access  public
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name }).then(user => {
    // if user does not exist
    if (!user) {
      return res.status(404).json({ name: "user not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const userPayload = { id: user._id };

        // sign token using jwt
        jwt.sign(userPayload, key, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: "true", token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});

module.exports = router;
