const express = require('express');
const router = express.Router();
const { getAllSeries, createMultiSeries, getSeriesById, filterSeries } = require('../controllers/seriesController');

router.get('/series', getAllSeries);
router.post('/createMultiSeries', createMultiSeries);
router.get('/series/:id', getSeriesById);
router.post('/filterSeries', filterSeries);

module.exports = router;