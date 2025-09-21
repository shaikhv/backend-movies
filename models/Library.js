const mongoose = require('mongoose');

const libraryScehma = mongoose.Schema({
  refId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true }, // points to Movie._id or Series._id
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  // polymorphic reference
  type: { type: String, enum: ['movie', 'series'], required: true, index: true },

  // optional: also store TMDB id for faster dedupe on ingest
  externalId: { type: Number, index: true },

  // status bucket — this replaces separate "watchlist" vs "wishlist"
  status: { 
    type: String, 
    enum: ['wishlist', 'watching', 'completed', 'dropped'], 
    default: 'wishlist', 
    index: true 
  },

  // user-specific metadata
  rating: { type: Number, min: 0, max: 10 },
  notes: { type: String },

  // progress for series or resume points for movies
  progress: {
    season: Number,
    episode: Number,
    positionSeconds: Number,      // resume time within an episode or movie
    lastWatchedAt: Date
  },
}, { timestamps: true}
);

module.exports = mongoose.model('Library', libraryScehma);