const mongoose = require('mongoose');

const movieScehma = new mongoose.Schema({
    adult: {
      type: Boolean,
      required: true,
    },
    backdrop_path: {
      type: String,
    },
    genre_ids: [
      {
        type: Number,
      },
    ],
    id: {
      type: Number,
      required: true,
      unique: true, // TMDB movie id should be unique
    },
    original_language: {
      type: String,
    },
    original_title: {
      type: String,
    },
    overview: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    poster_path: {
      type: String,
    },
    release_date: {
      type: Date, // storing as Date for querying (year/month)
    },
    title: {
      type: String,
    },
    video: {
      type: Boolean,
    },
    vote_average: {
      type: Number,
    },
    vote_count: {
      type: Number,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('NextMovie', movieScehma);