const movieDB = {
  movies: require("../model/movies.json"),
  setMovies: function (data) {
    this.movies = data;
  },
};

const getAllMovies = (req, res) => {
  res.json(movieDB.movies);
};

const createMovie = (req, res) => {
  const newMovie = {
    id: movieDB.movies?.length
      ? movieDB.movies[movieDB.movies.length - 1].id + 1
      : 1,
    name: req.body.name,
  };

  if (!newMovie.name) {
    return res.status(400).json({ message: "Movie name is required!" });
  }

  movieDB.setMovies([...movieDB.movies, newMovie]);
  res.status(201).json(movieDB.movies);
};

const updateMovie = (req, res) => {
  const movie = movieDB.movies.find((mov) => mov.id === parseInt(req.body.id));
  if (!movie) {
    return res
      .status(400)
      .json({ message: `Movie ID ${req.body.id} not found.` });
  }
  if (req.body.name) movie.name = req.body.name;
  const filteredArray = movieDB.movies.filter(
    (mov) => mov.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, movie];

  movieDB.setMovies(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(movieDB.movies);
};

const deleteMovie = (req, res) => {
  const movie = movieDB.movies.find((mov) => mov.id === parseInt(req.body.id));
  if (!movie) {
    return res
      .status(400)
      .json({ message: `Movie ID ${req.body.id} not found.` });
  }
  const filteredArray = movieDB.movies.filter(
    (mov) => mov.id !== parseInt(req.body.id)
  );
  movieDB.setMovies([...filteredArray]);
  res.json(movieDB.movies);
};

module.exports = { createMovie, getAllMovies, updateMovie, deleteMovie };
