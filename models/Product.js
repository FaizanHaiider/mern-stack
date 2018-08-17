const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

// create Product scheme
const ProductScheme = new Scheme({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  travelPath: [
    {
      datetime: String,
      longitude: String,
      latitude: String
    }
  ]
});

module.exports = Product = mongoose.model("products", ProductScheme);
