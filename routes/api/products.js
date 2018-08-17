const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();
const Product = require("../../models/Product");

// @route   GET api/products
// @desc    get all products
// @access  public
router.get("/", (req, res) => {
  Product.find()
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

// @route   POST api/products/:id/travelPath
// @desc    add travelPath to product
// @access  private
router.post(
  "/:id/travelPath",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findOne({ id: req.params.id })
      .then(product => {
        // create travelPath array object
        const newTravelPath = {
          datetime: req.body.datetime,
          longitude: req.body.longitude,
          latitude: req.body.latitude
        };

        // save to product
        product.travelPath.unshift(newTravelPath);
        product.save().then(product => res.json(product));
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// @route   POST api/products/:id/delete/:travelPath_id
// @desc    delete product's travelPath
// @access  private
router.delete(
  "/:id/delete/:travelPath_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findOne({ id: req.params.id })
      .then(product => {
        // find desired travelPath
        const indexToRemove = product.travelPath
          .map(path => path.id)
          .indexOf(req.params.travelPath_id);

        // remove travelPath
        product.travelPath.splice(indexToRemove, 1);

        // save product
        product.save().then(product => res.json(product));
      })
      .catch(err => res.json({ id: "product not found" }));
  }
);

// @route   POST api/products/:id
// @desc    delete product
// @access  private
router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findOneAndRemove({ id: req.params.id }).then(() => {
      res.json({ success: "deleted" });
    });
  }
);

module.exports = router;
