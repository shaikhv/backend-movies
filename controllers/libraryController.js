const mongoose = require('mongoose');
const Library = require('../models/Library');
const Movie = require('../models/Movie');
const Series = require('../models/Series');

exports.addToWishlist = async (req, res) => {
  const { id } = req.user;
  const { type, externalId } = req.body || {};
  if (!type || !externalId) throw new Error('type and externalId are required');
  if (!['movie', 'series'].includes(type)) throw new Error('Invalid type');

  const Model = type === 'movie' ? Movie : Series;
  console.log('Model selected:',externalId);
  const doc = await Model.findOne({ id: externalId });
  console.log('Document found:', doc);
  if (!doc) throw new Error('Title not found in catalog');

const item = await Library.findOneAndUpdate(
    { user: id, type, refId: doc._id },
    { $setOnInsert: { status: 'wishlist', externalId } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
);

return res.json({ success:true, item });
};

exports.markWatching = async (req, res) => {
  const { id } = req.user;
  const { type, externalId } = req.body || {};
  if (!type || !externalId) throw new Error('type and externalId are required');
  if (!['movie', 'series'].includes(type)) throw new Error('Invalid type');

  const item = await Library.findOneAndUpdate(
    { user: id, type, externalId },
    { $set: { status: 'watching' } },
    { upsert: true, new: true }
  );
  return res.json({ success:true, item });
};

exports.updateProgress = async (req, { LibraryItem }) => {
  const { id } = req.user; // <-- fix
  const { type, refId, progress = {} } = req.body || {};
  if (!type || !refId) throw new Error('type and refId are required');
  if (!['movie', 'series'].includes(type)) throw new Error('Invalid type');
  if (!Types.ObjectId.isValid(refId)) throw new Error('Invalid refId');

  return LibraryItem.findOneAndUpdate(
    { user: id, type, refId },
    {
      $set: {
        status: 'watching',
        'progress.season': progress.season ?? null,
        'progress.episode': progress.episode ?? null,
        'progress.positionSeconds': progress.positionSeconds ?? 0,
        'progress.lastWatchedAt': new Date(),
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

exports.getLibraryByType = async (req, res) => {
  try {
    console.log('Get library by type called with params:', req.params, 'and query:', req.query);
    const userId = req.user.id;
    const status = req.query.status || 'wishlist'; // wishlist|watching|completed
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);

    // type comes from the route: /api/library/movies OR /api/library/series
    const type = req.params.type; // 'movie' or 'series'

    const fromCollection = type === 'movie' ? Movie.collection.name : Series.collection.name;

    const pipeline = [
      { $match: { user: new mongoose.Types.ObjectId(userId), status, type } },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: fromCollection,
          localField: 'refId',
          foreignField: '_id',
          as: type
        }
      },
      { $unwind: `$${type}` },
      {
        $project: {
          _id: 1,
          type: 1,
          status: 1,
          createdAt: 1,
          progress: 1,
          [type]: 1
        }
      }
    ];

    const [items, total] = await Promise.all([
      Library.aggregate(pipeline),
      Library.countDocuments({ user: userId, status, type })
    ]);

    console.log('Aggregated items:', items);
    console.log('Total count:', total);

    res.json({ success: true, page, limit, total, items });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};
