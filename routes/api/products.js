const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();
const Product = require("../../models/Product");

// @route   GET api/products/
// @desc    get all products
// @access  public
router.get("/", (req, res) => {
  Product.find()
    .populate("product", ["id", "name"])
    .then(profiles => {
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ id: "no products found" });
    });
});

// @route   GET api/products/:id
// @desc    get product by id
// @access  public
router.get("/:id", (req, res) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res.json({ id: "product not found" });
      }
    })
    .catch(err => {
      return res.status(404).json({ id: "no id found" });
    });
});

// @route   POST api/products/create
// @desc    create new product
// @access  private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findOne({ id: req.body.id })
      .then(product => {
        if (product) {
          return res.status(400).json({ id: "product aleady exists" });
        }
        const newProduct = new Product({
          id: req.body.id,
          name: req.body.name,
          travelPath: req.body.travelPath
        });
        newProduct
          .save()
          .then(product => res.json(product))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
