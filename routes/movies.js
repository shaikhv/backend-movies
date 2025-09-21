const express = require('express');
const router = express.Router();
const { getAllMovies, createMultiMovie, getMovieById, filterMovies } = require('../controllers/movieController');

router.get('/movies', getAllMovies);
router.post('/createMultiMovies', createMultiMovie);
router.get('/movie/:id', getMovieById);
router.post('/filterMovie', filterMovies);

module.exports = router;