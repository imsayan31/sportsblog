const mongoose = require('mongoose');

const sportsNewsSchema = mongoose.Schema({
  blog_title: { type: String, required: true},
  blog_description: { type: String },
  blog_image: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdDtm: { type: Date, default: Date.now },
  updatedDtm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sports Blog', sportsNewsSchema);
