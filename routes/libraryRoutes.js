const express = require('express');
const { getLibraryByType, addToWishlist, markWatching, updateProgress } = require('../controllers/libraryController');

const router = express.Router();

// two separate endpoints → same controller
router.get('/library/movies', (req, res) => {
  req.params.type = 'movie';
  getLibraryByType(req, res);
});

router.get('/library/series', (req, res) => {
  req.params.type = 'series';
  getLibraryByType(req, res);
});

router.post('/wishlist', addToWishlist);
router.patch('/watching', markWatching);
router.patch('/progress', updateProgress);


module.exports = router;