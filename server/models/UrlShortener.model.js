const mongoose = require('mongoose');
const shortid = require('shortid');

const UrlShortenerSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: shortid.generate()},
  originalLink: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('UrlShortener', UrlShortenerSchema);
