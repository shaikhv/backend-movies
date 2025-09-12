const NextMovie = require("../models/Movie");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await NextMovie.find({}).limit(20);
    console.log('Movies fetched:', movies);
    res.status(200).json({ movies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.createMultiMovie = async (req, res) => {
  try {
    const movies = await NextMovie.insertMany(req.body);
    console.log('Movies fetched:', movies);
    res.status(200).json({ movies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.createMultiMovie = async (req, res) => {
  try {
    const movies = await NextMovie.insertMany(req.body);
    console.log('Movies fetched:', movies);
    res.status(200).json({ movies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.getMovieById = async (req, res) => {
  console.log('Fetching movie with ID:', req.params.id);
  try {
    const movie = await NextMovie.findById(req.params.id);
    console.log('Movie fetched:', movie);
    res.status(200).json({ movie });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}