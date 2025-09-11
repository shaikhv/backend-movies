const express = require('express');
const router = express.Router();
const { getAllMovies, createMultiMovie } = require('../controllers/movieController');

router.get('/movies', getAllMovies);
router.post('/createMultiMovies', createMultiMovie);

module.exports = router;
