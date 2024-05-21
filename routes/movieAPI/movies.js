const express = require("express");
const router = express.Router();
const movieController = require("../../controllers/movieController");

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.createMovie)
  .put(movieController.updateMovie)
  .delete(movieController.deleteMovie);

router.route("/:id").get(movieController.getMovie);

module.exports = router;
