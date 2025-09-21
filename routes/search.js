// server.js (or routes/search.js)
const express = require('express');
const NextMovie = require("../models/Movie");
const NextSeries = require("../models/Series");

const router = express.Router();

// GET /search?q=world
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ results: [] });

    // Search both collections
    const [movies, series] = await Promise.all([
      NextMovie
        .find({ title: { $regex: query, $options: "i" } })
        .limit(5).lean(),
      NextSeries
        .find({ name: { $regex: query, $options: "i" } })
        .limit(5).lean(),
    ]);

    // Add type so frontend knows
    const results = [
      ...movies.map((m) => ({ ...m, type: "movie" })),
      ...series.map((s) => ({ ...s, type: "series" })),
    ];

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
