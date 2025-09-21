const NextMovie = require("../models/Movie");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await NextMovie.find({}).limit(20);
    res.status(200).json({ movies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.createMultiMovie = async (req, res) => {
  try {
    const movies = await NextMovie.insertMany(req.body);
    res.status(200).json({ movies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.createMultiMovie = async (req, res) => {
  try {
    const movies = await NextMovie.insertMany(req.body);
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
    res.status(200).json({ movie });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

exports.filterMovies = async (req, res) => {
  try {
    const filteredMovies = await NextMovie.find({...req.body});
    console.log('Movies fetched:', filteredMovies);
    res.status(200).json({ filteredMovies });
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}