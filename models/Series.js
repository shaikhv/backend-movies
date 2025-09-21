const mongoose = require('mongoose');

const seriesScehma = new mongoose.Schema({
    adult: { type: Boolean, default: false },
    backdrop_path: { type: String },
    genre_ids: [{ type: Number, index: true }],
    origin_country: [{ type: String, index: true }],
    original_language: { type: String },
    original_name: { type: String },
    overview: { type: String, default: "" },
    popularity: { type: Number, index: true },
    poster_path: { type: String },
    id: {
      type: Number,
      required: true,
      unique: true, // TMDB movie id should be unique
    },
    first_air_date: { type: Date, index: true },
    last_air_date: { type: Date },

    name: { type: String, required: true, index: true },
    vote_average: { type: Number, min: 0, max: 10, index: true },
    vote_count: { type: Number, min: 0 },

    number_of_seasons: { type: Number, default: 0 },
    number_of_episodes: { type: Number, default: 0 },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('NextSeries', seriesScehma);