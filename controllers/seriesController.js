const NextSeries = require("../models/Series");

exports.getAllSeries = async (req, res) => {
  try {
    const series = await NextSeries.find({}).limit(20);
    console.log('Series fetched:', series);
    res.status(200).json({ series });
  } catch (error) {
    console.log('Error fetching series:', error);
    res.status(500).json({ error: 'Error fetching series' });
  }
}

exports.createMultiSeries = async (req, res) => {
  try {
    const series = await NextSeries.insertMany(req.body);
    console.log('Series fetched:', series);
    res.status(200).json({ series });
  } catch (error) {
    console.log('Error fetching series:', error);
    res.status(500).json({ error: 'Error fetching series' });
  }
}

exports.createMultiSeries = async (req, res) => {
  try {
    const series = await NextSeries.insertMany(req.body);
    console.log('Series fetched:', series);
    res.status(200).json({ series });
  } catch (error) {
    console.log('Error fetching series:', error);
    res.status(500).json({ error: 'Error fetching series' });
  }
}

exports.getSeriesById = async (req, res) => {
  console.log('Fetching series with ID:', req.params.id);
  try {
    const series = await NextSeries.findById(req.params.id);
    console.log('Series fetched ID:', series);
    res.status(200).json({ series });
  } catch (error) {
    console.log('Error fetching series:', error);
    res.status(500).json({ error: 'Error fetching series' });
  }
}

exports.filterSeries = async (req, res) => {
  try {
    const filteredseries = await NextSeries.find({...req.body});
    console.log('Series fetched:', filteredseries);
    res.status(200).json({ filteredseries });
  } catch (error) {
    console.log('Error fetching series:', error);
    res.status(500).json({ error: 'Error fetching series' });
  }
}