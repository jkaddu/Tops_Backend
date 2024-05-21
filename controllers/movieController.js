const Movie = require("../model/Movie");

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  if (!movies) return res.status(204).json({ message: "No movies found" });
  res.json(movies);
};

const createMovie = async (req, res) => {
  if (!req?.body?.name)
    return res.status(400).json({ message: "Moveie name required!" });

  try {
    const result = await Movie.create({
      name: req.body.name,
    });
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateMovie = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required!" });
  const movie = await Movie.findOne({ _id: req.body.id }).exec();
  if (!movie) {
    return res
      .status(400)
      .json({ message: `Movie ID ${req.body.id} not found.` });
  }
  if (req.body.name) movie.name = req.body.name;
  const result = await movie.save();
  res.json(result);
};

const deleteMovie = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Movie ID is required!" });

  const movie = await Movie.findOne({ _id: req.body.id }).exec();
  if (!movie) {
    return res
      .status(400)
      .json({ message: `Movie ID ${req.body.id} is not on record.` });
  }
  const result = await Movie.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = { createMovie, getAllMovies, updateMovie, deleteMovie };
