const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desciption: String,
});

module.exports = mongoose.model("Movie", movieSchema);
